---
# icon: tool
date: 2022-10-09
category:
  - Sanic
tag:
  - tutorial
# star: true
# sticky: true
author: false
title: Pushing work to the background of your Sanic app
description: Get up and running with a background job worker entirely in Sanic
---

::: info Source code
Check out the [source code](https://github.com/ahopkins/personal-site/tree/main/src/background-job-worker) that accompanies this post
:::

In the course of answering support questions for Sanic developers one of the most common questions I am asked relates to processing actions "in the background." In the course of developing a full-featured application it is highly likely that you will run into this problem at some point.

> **Problem**: Some endpoint accepts input and needs to do some work on it. But, that work is slow and should not block the return of the response. What to do?

It has become rather axiomatic that I answer the question in one of three ways:

1. link to the [Background tasks](https://sanic.dev/en/guide/basics/tasks.html) section of the Sanic User Guide;
1. link to a [presentation I gave](https://github.com/ahopkins/pyconil2021-liberate-your-api) at PyConIL in 2021; and/or
1. if the person [owns a copy of my book](https://sanicbook.com/), refer them to `Background task processing` on page 229.

When writing the Sanic User Guide, I intentially included `Background tasks` under the `Basics` category because, well, I believe it is a fundamental and important piece of knowledge when building with Sanic. It is a powerful tool for async applications and the concept is precisely what async frameworks like Sanic are built upon.

However, an [`asyncio.Task`](https://docs.python.org/3/library/asyncio-task.html#asyncio.Task) is not always the most appropriate solution. Indeed this is precisely what both the above linked presentation and section in my book discuss. Both attempt to find solutions to answer the question: *what do I do when I need something more powerful?*

In this article, I want to propose another solution using an exciting new feature of [Sanic v22.9](https://sanic.dev/en/guide/release-notes/v22.9.html): managed processes.

## Overview of the concept

### Background on SAJE

In my 2021 talk I proposed a solution that I called: **SAJE** (Sanic asynchronous job executor). The idea was to launch a background process that exposed a [`multiprocessing.Queue`](https://docs.python.org/3/library/multiprocessing.html#multiprocessing.Queue). From inside of an endpoint we would push data to the queue and let the SAJE process pick it up and assign the work. The endpoint would have return some sort of an identifier. With the results and state of the execution stored *somewhere*, we could then fetch information about that job using the identifier.

You can view the original source code of SAJE on [GitHub](https://github.com/ahopkins/pyconil2021-liberate-your-api/tree/main/saje_project/breakpoints/bp3/saje_project/src).

The problem is that the solution proposed there has only limited capabilities. We are inherently limited to using only a single Sanic worker process because it attaches the SAJE runner in `@app.main_process_start`. This means that only the application instance in the main process has access to that queue. In pre-22.9 this is okay **if** you are not using `auto_reload` or more than one (1) worker. This is simply an inherent limitation in how `multiprocessing` was implemented in Sanic.

### Solving for this with v22.9 workers

The v22.9 update to Sanic overhauled how workers operate. One of the explicit goals was to more easily allow for passing synchronization objects between workers. Another goal was to provide a framework to allow Sanic to manage arbitrary processes. Both of these concepts are what we will rely upon to create a new and improved version of SAJE.

In this article, I want to show a pattern for creating a managed process and for interacting with it from inside a Sanic application. To keep things simple, I will largely leverage the existing SAJE code base linked above. Our requirements will be as follows:

- Sanic must fully manage the startup and graceful shutdown of SAJE
- an endpoint must be able to submit a set of details to execute a job
- that endpoint must return an identifier to a specific job
- the job must be fully executed in a seperate worker process to not interfere with the Sanic request lifecycle
- details about the task execution must be persisted somewhere (for now, we will use a flat file backend)
- another endpoint must be able to retrieve details while the job is in progress and after its completion

Essentially, we will be creating a miniature celery-like application inside of Sanic.

## Adding a managed process

To begin, we will create a  `Queue` that will be shared across the Sanic workers and the SAJE workers. This `Queue` will be the tool by which Sanic and SAJE communicate with one another. Sanic allows us to share objects meant to be used in multiple processes (like a `Queue`) by attaching them to `app.shared_ctx`. The catch is that this *MUST* happen in the `@app.main_process_start` listener. This is the only time you should ever attach anything to `app.shared_ctx`.

```python
from multiprocessing import Manager

@app.main_process_start
async def start(app: Sanic):
    manager = Manager()
    app.shared_ctx.saje_queue = manager.Queue()
```

::: info
You should beware that only objects that are safe for sharing with `multiprocessing.Process` should be attached to `app.shared_ctx`. For example, if you attached a regular `dict` object, it's state **will not** be shared across application workers.
:::

Once the `Queue` is setup, we can tell Sanic to [manage a custom process](https://sanic.dev/en/guide/deployment/manager.html#running-custom-processes). This also must be done at a very specific time: the `@app.main_process_ready` listener. 

```python
@app.main_process_ready
async def ready(app: Sanic):
    app.manager.manage(
        "SajeWorker", worker, {"saje_queue": app.shared_ctx.saje_queue},
    )
```

As you can see, we are working with `app.manager`. This is a special object that is only available in the main process, and only *after* `main_process_start` has happened. That is why we can only attach a managed process in `main_process_ready`. The arguments are fairly simple:

- a name for the process,
- a callable that will be the target function of the subprocess, and
- keyword arguments for the subprocess.

In our instance, the keyword arguments with be the shared `Queue` that we just setup.

Let's see it all together:


```python
from multiprocessing import Manager
from sanic import Sanic
from saje.worker import worker


def create_saje(app: Sanic) -> None:
    @app.main_process_start
    async def start(app: Sanic):
        manager = Manager()
        app.shared_ctx.saje_queue = manager.Queue()

    @app.main_process_ready
    async def ready(app: Sanic):
        app.manager.manage(
            "SajeWorker", worker, {"saje_queue": app.shared_ctx.saje_queue},
        )
```

For now, don't worry too much about what `worker` is. All you need to care about right now is that it is a function that roughly lookes like this:

```python
def worker(saje_queue: Queue) -> None:
    ...
```

_Feel free to jump to the [source code](https://github.com/ahopkins/personal-site/tree/main/src/background-job-worker) to see it in full_

## Sharing the queue to Sanic workers

Since the `Queue` will be the main conduit for triggering work, we need some sort of client that will be available to the Sanic workers.

```python
from multiprocessing import Queue
from typing import Any
import ujson


class SajeClient:
    def __init__(self, queue: Queue) -> None:
        self.queue = queue

    def send(self, job_definition: dict[str, Any] | str) -> None:
        if not isinstance(job_definition, str):
            message = ujson.dumps(job_definition)
        self.queue.put_nowait(message)
```

The client has one job: pushing a request to execute a job to the `Queue`. Now all we need to do is instantiate it.

```python
@app.after_server_start
async def setup_saje(app: Sanic):
    app.ctx.saje = SajeClient(app.shared_ctx.saje_queue)
```

We could leave it like that of course, but let's use some [dependency injection](https://sanic.dev/en/plugins/sanic-ext/injection.html#injecting-services) to make the experience smoother down the road.

```python
@app.after_server_start
async def setup_saje(app: Sanic):
    app.ext.dependency(SajeClient(app.shared_ctx.saje_queue))
```

## Pushing work from an endpoint

We should be ready now to start an actual job from an endpoint. Because we used dependency injection in the previous step, our endpoint can request for the client as seen here:

```python
@bp.post("/")
async def start_job(request: Request, saje: SajeClient) -> HTTPResponse:
    uid = str(uuid4())
    saje.send(
        {
            "task": "hello",
            "uid": uid,
            "kwargs": {"name": "Adam"},
        }
    )
    return text(uid)
```

That's it. Now when we hit that endpoint and the flow will look something like this:

```flow
endpoint=>start: Endpoint
client=>operation: SajeClient
queue=>inputoutput: Queue
worker=>subroutine: Worker
results=>end: Results

endpoint->client
client->queue
queue->worker
worker->results
```

## Wrap-up and next steps

There obviously are a lot of steps here that I glossed over. The `worker` function mentioned above for example. I suggest you take a look at the content in the [source code](https://github.com/ahopkins/personal-site/tree/main/src/background-job-worker) to see how that works.

Our goal here was to examine how to use the new worker manager feature in Sanic to coordinate the sharing of data from worker processes to a custom background process. Obviously, a secondary hope was to show how you could build out a robust platform to handle your own background processing needs entirely within Sanic.

If I were to try to make this production ready, the things you would want to focus upon are:

- ensuring a more robust data store
- scaling out the job workers (a new API for this is coming in v22.12, but you can do it in v22.9)
- fault tolerance
- abstracting tools for making single and multi-stage task operations

Armed with this information, I hope you are now excited for what could be possible.
