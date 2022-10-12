import asyncio
from asyncio import Task as AsyncTask
from queue import Empty
from typing import List

from sanic.log import logger

from .job import Job


class Scheduler:
    STOP = "__STOP__"

    def __init__(self, queue, loop, backend) -> None:
        self.queue = queue
        self.tasks: List[AsyncTask] = []
        self._loop = loop
        self.backend = backend

    async def run(self):
        logger.info("> Starting job manager")
        while True:
            self.consumer()
            await asyncio.sleep(1)

    def consumer(self):
        try:
            job = self.queue.get_nowait()
        except Empty:
            return

        if job == self.STOP:
            logger.info("> Stopping consumer")
            self.queue.put_nowait(job)
        else:
            logger.info(f"> Job requested: {job=}")
            self.execute(job)

    def execute(self, job: str):
        task = self._loop.create_task(Job.create(job, self.backend))
        self.tasks.append(task)
