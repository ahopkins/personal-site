import { c as create_ssr_component, f as add_attribute, v as validate_component } from "./index.js";
const Mermaid_svelte_svelte_type_style_lang = "";
const css = {
  code: "pre.svelte-dw01c0{background-color:#242424}.mermaid .label{font-size:0.95rem;font-family:Rubik, sans-serif;color:#a0a0a0}",
  map: null
};
const Mermaid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let chart = null;
  $$result.css.add(css);
  return `<div class="${"mermaid"}"><pre class="${"svelte-dw01c0"}"${add_attribute("this", chart, 0)}>        
    </pre>
</div>`;
});
const metadata = {
  "date": "2022-10-09T00:00:00.000Z",
  "tag": ["Sanic", "tutorial"],
  "title": "Pushing work to the background of your Sanic app",
  "description": "Get up and running with a background job worker entirely in Sanic"
};
const Background_job_worker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h2 class="${"is-size-2"}" id="${"table-of-contents"}">Table of contents<a aria-hidden="${"true"}" tabindex="${"-1"}" href="${"#table-of-contents"}"><i class="${"las la-link"}" aria-hidden="${"true"}"></i></a></h2>
<ul><li><p><a href="${"#overview-of-the-concept"}">Overview of the concept</a></p>
<ul><li><a href="${"#background-on-saje"}">Background on SAJE</a></li>
<li><a href="${"#solving-for-this-with-v229-workers"}">Solving for this with v22.9 workers</a></li></ul></li>
<li><p><a href="${"#adding-a-managed-process"}">Adding a managed process</a></p></li>
<li><p><a href="${"#sharing-the-queue-to-sanic-workers"}">Sharing the queue to Sanic workers</a></p></li>
<li><p><a href="${"#pushing-work-from-an-endpoint"}">Pushing work from an endpoint</a></p></li>
<li><p><a href="${"#wrap-up-and-next-steps"}">Wrap-up and next steps</a></p></li></ul>
<h2 class="${"is-size-2"}" id="${"overview-of-the-concept"}">Overview of the concept<a aria-hidden="${"true"}" tabindex="${"-1"}" href="${"#overview-of-the-concept"}"><i class="${"las la-link"}" aria-hidden="${"true"}"></i></a></h2>
<h3 class="${"is-size-3"}" id="${"background-on-saje"}">Background on SAJE<a aria-hidden="${"true"}" tabindex="${"-1"}" href="${"#background-on-saje"}"><i class="${"las la-link"}" aria-hidden="${"true"}"></i></a></h3>
<p>In my 2021 talk I proposed a solution that I called: <strong>SAJE</strong> (Sanic asynchronous job executor). The idea was to launch a background process that exposed a <a href="${"https://docs.python.org/3/library/multiprocessing.html#multiprocessing.Queue"}" rel="${"nofollow"}"><code>multiprocessing.Queue</code></a>. From inside of an endpoint we would push data to the queue and let the SAJE process pick it up and assign the work. The endpoint would have return some sort of an identifier. With the results and state of the execution stored <em>somewhere</em>, we could then fetch information about that job using the identifier.</p>
<p>You can view the original source code of SAJE on <a href="${"https://github.com/ahopkins/pyconil2021-liberate-your-api/tree/main/saje_project/breakpoints/bp3/saje_project/src"}" rel="${"nofollow"}">GitHub</a>.</p>
<p>The problem is that the solution proposed there has only limited capabilities. We are inherently limited to using only a single Sanic worker process because it attaches the SAJE runner in <code>@app.main_process_start</code>. This means that only the application instance in the main process has access to that queue. In pre-22.9 this is okay <strong>if</strong> you are not using <code>auto_reload</code> or more than one (1) worker. This is simply an inherent limitation in how <code>multiprocessing</code> was implemented in Sanic.</p>
<h3 class="${"is-size-3"}" id="${"solving-for-this-with-v229-workers"}">Solving for this with v22.9 workers<a aria-hidden="${"true"}" tabindex="${"-1"}" href="${"#solving-for-this-with-v229-workers"}"><i class="${"las la-link"}" aria-hidden="${"true"}"></i></a></h3>
<p>The v22.9 update to Sanic overhauled how workers operate. One of the explicit goals was to more easily allow for passing synchronization objects between workers. Another goal was to provide a framework to allow Sanic to manage arbitrary processes. Both of these concepts are what we will rely upon to create a new and improved version of SAJE.</p>
<p>In this article, I want to show a pattern for creating a managed process and for interacting with it from inside a Sanic application. To keep things simple, I will largely leverage the existing SAJE code base linked above. Our requirements will be as follows:</p>
<ul><li>Sanic must fully manage the startup and graceful shutdown of SAJE</li>
<li>an endpoint must be able to submit a set of details to execute a job</li>
<li>that endpoint must return an identifier to a specific job</li>
<li>the job must be fully executed in a seperate worker process to not interfere with the Sanic request lifecycle</li>
<li>details about the task execution must be persisted somewhere (for now, we will use a flat file backend)</li>
<li>another endpoint must be able to retrieve details while the job is in progress and after its completion</li></ul>
<p>Essentially, we will be creating a miniature celery-like application inside of Sanic.</p>
<h2 class="${"is-size-2"}" id="${"adding-a-managed-process"}">Adding a managed process<a aria-hidden="${"true"}" tabindex="${"-1"}" href="${"#adding-a-managed-process"}"><i class="${"las la-link"}" aria-hidden="${"true"}"></i></a></h2>
<p>To begin, we will create a <code>Queue</code> that will be shared across the Sanic workers and the SAJE workers. This <code>Queue</code> will be the tool by which Sanic and SAJE communicate with one another. Sanic allows us to share objects meant to be used in multiple processes (like a <code>Queue</code>) by attaching them to <code>app.shared_ctx</code>. The catch is that this <em>MUST</em> happen in the <code>@app.main_process_start</code> listener. This is the only time you should ever attach anything to <code>app.shared_ctx</code>.</p>
<pre class="${"language-python"}"><!-- HTML_TAG_START -->${`<code class="language-python"><span class="token keyword">from</span> multiprocessing <span class="token keyword">import</span> Manager

<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>main_process_start</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">start</span><span class="token punctuation">(</span>app<span class="token punctuation">:</span> Sanic<span class="token punctuation">)</span><span class="token punctuation">:</span>
    manager <span class="token operator">=</span> Manager<span class="token punctuation">(</span><span class="token punctuation">)</span>
    app<span class="token punctuation">.</span>shared_ctx<span class="token punctuation">.</span>saje_queue <span class="token operator">=</span> manager<span class="token punctuation">.</span>Queue<span class="token punctuation">(</span><span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>::: info
You should beware that only objects that are safe for sharing with <code>multiprocessing.Process</code> should be attached to <code>app.shared_ctx</code>. For example, if you attached a regular <code>dict</code> object, it\u2019s state <strong>will not</strong> be shared across application workers.
:::</p>
<p>Once the <code>Queue</code> is setup, we can tell Sanic to <a href="${"https://sanic.dev/en/guide/deployment/manager.html#running-custom-processes"}" rel="${"nofollow"}">manage a custom process</a>. This also must be done at a very specific time: the <code>@app.main_process_ready</code> listener.</p>
<pre class="${"language-python"}"><!-- HTML_TAG_START -->${`<code class="language-python"><span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>main_process_ready</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">ready</span><span class="token punctuation">(</span>app<span class="token punctuation">:</span> Sanic<span class="token punctuation">)</span><span class="token punctuation">:</span>
    app<span class="token punctuation">.</span>manager<span class="token punctuation">.</span>manage<span class="token punctuation">(</span>
        <span class="token string">"SajeWorker"</span><span class="token punctuation">,</span> worker<span class="token punctuation">,</span> <span class="token punctuation">&#123;</span><span class="token string">"saje_queue"</span><span class="token punctuation">:</span> app<span class="token punctuation">.</span>shared_ctx<span class="token punctuation">.</span>saje_queue<span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>As you can see, we are working with <code>app.manager</code>. This is a special object that is only available in the main process, and only <em>after</em> <code>main_process_start</code> has happened. That is why we can only attach a managed process in <code>main_process_ready</code>. The arguments are fairly simple:</p>
<ul><li>a name for the process,</li>
<li>a callable that will be the target function of the subprocess, and</li>
<li>keyword arguments for the subprocess.</li></ul>
<p>In our instance, the keyword arguments with be the shared <code>Queue</code> that we just setup.</p>
<p>Let\u2019s see it all together:</p>
<pre class="${"language-python"}"><!-- HTML_TAG_START -->${`<code class="language-python"><span class="token keyword">from</span> multiprocessing <span class="token keyword">import</span> Manager
<span class="token keyword">from</span> sanic <span class="token keyword">import</span> Sanic
<span class="token keyword">from</span> saje<span class="token punctuation">.</span>worker <span class="token keyword">import</span> worker


<span class="token keyword">def</span> <span class="token function">create_saje</span><span class="token punctuation">(</span>app<span class="token punctuation">:</span> Sanic<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    <span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>main_process_start</span>
    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">start</span><span class="token punctuation">(</span>app<span class="token punctuation">:</span> Sanic<span class="token punctuation">)</span><span class="token punctuation">:</span>
        manager <span class="token operator">=</span> Manager<span class="token punctuation">(</span><span class="token punctuation">)</span>
        app<span class="token punctuation">.</span>shared_ctx<span class="token punctuation">.</span>saje_queue <span class="token operator">=</span> manager<span class="token punctuation">.</span>Queue<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>main_process_ready</span>
    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">ready</span><span class="token punctuation">(</span>app<span class="token punctuation">:</span> Sanic<span class="token punctuation">)</span><span class="token punctuation">:</span>
        app<span class="token punctuation">.</span>manager<span class="token punctuation">.</span>manage<span class="token punctuation">(</span>
            <span class="token string">"SajeWorker"</span><span class="token punctuation">,</span> worker<span class="token punctuation">,</span> <span class="token punctuation">&#123;</span><span class="token string">"saje_queue"</span><span class="token punctuation">:</span> app<span class="token punctuation">.</span>shared_ctx<span class="token punctuation">.</span>saje_queue<span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>For now, don\u2019t worry too much about what <code>worker</code> is. All you need to care about right now is that it is a function that roughly lookes like this:</p>
<pre class="${"language-python"}"><!-- HTML_TAG_START -->${`<code class="language-python"><span class="token keyword">def</span> <span class="token function">worker</span><span class="token punctuation">(</span>saje_queue<span class="token punctuation">:</span> Queue<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></code>`}<!-- HTML_TAG_END --></pre>
<p>_Feel free to jump to the <a href="${"https://github.com/ahopkins/personal-site/tree/main/src/background-job-worker"}" rel="${"nofollow"}">source code</a> to see it in full_</p>
<h2 class="${"is-size-2"}" id="${"sharing-the-queue-to-sanic-workers"}">Sharing the queue to Sanic workers<a aria-hidden="${"true"}" tabindex="${"-1"}" href="${"#sharing-the-queue-to-sanic-workers"}"><i class="${"las la-link"}" aria-hidden="${"true"}"></i></a></h2>
<p>Since the <code>Queue</code> will be the main conduit for triggering work, we need some sort of client that will be available to the Sanic workers.</p>
<pre class="${"language-python"}"><!-- HTML_TAG_START -->${`<code class="language-python"><span class="token keyword">from</span> multiprocessing <span class="token keyword">import</span> Queue
<span class="token keyword">from</span> typing <span class="token keyword">import</span> Any
<span class="token keyword">import</span> ujson


<span class="token keyword">class</span> <span class="token class-name">SajeClient</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> queue<span class="token punctuation">:</span> Queue<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>queue <span class="token operator">=</span> queue

    <span class="token keyword">def</span> <span class="token function">send</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> job_definition<span class="token punctuation">:</span> <span class="token builtin">dict</span><span class="token punctuation">[</span><span class="token builtin">str</span><span class="token punctuation">,</span> Any<span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token builtin">str</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>job_definition<span class="token punctuation">,</span> <span class="token builtin">str</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            message <span class="token operator">=</span> ujson<span class="token punctuation">.</span>dumps<span class="token punctuation">(</span>job_definition<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>queue<span class="token punctuation">.</span>put_nowait<span class="token punctuation">(</span>message<span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>The client has one job: pushing a request to execute a job to the <code>Queue</code>. Now all we need to do is instantiate it.</p>
<pre class="${"language-python"}"><!-- HTML_TAG_START -->${`<code class="language-python"><span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>after_server_start</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">setup_saje</span><span class="token punctuation">(</span>app<span class="token punctuation">:</span> Sanic<span class="token punctuation">)</span><span class="token punctuation">:</span>
    app<span class="token punctuation">.</span>ctx<span class="token punctuation">.</span>saje <span class="token operator">=</span> SajeClient<span class="token punctuation">(</span>app<span class="token punctuation">.</span>shared_ctx<span class="token punctuation">.</span>saje_queue<span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>We could leave it like that of course, but let\u2019s use some <a href="${"https://sanic.dev/en/plugins/sanic-ext/injection.html#injecting-services"}" rel="${"nofollow"}">dependency injection</a> to make the experience smoother down the road.</p>
<pre class="${"language-python"}"><!-- HTML_TAG_START -->${`<code class="language-python"><span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>after_server_start</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">setup_saje</span><span class="token punctuation">(</span>app<span class="token punctuation">:</span> Sanic<span class="token punctuation">)</span><span class="token punctuation">:</span>
    app<span class="token punctuation">.</span>ext<span class="token punctuation">.</span>dependency<span class="token punctuation">(</span>SajeClient<span class="token punctuation">(</span>app<span class="token punctuation">.</span>shared_ctx<span class="token punctuation">.</span>saje_queue<span class="token punctuation">)</span><span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<h2 class="${"is-size-2"}" id="${"pushing-work-from-an-endpoint"}">Pushing work from an endpoint<a aria-hidden="${"true"}" tabindex="${"-1"}" href="${"#pushing-work-from-an-endpoint"}"><i class="${"las la-link"}" aria-hidden="${"true"}"></i></a></h2>
<p>We should be ready now to start an actual job from an endpoint. Because we used dependency injection in the previous step, our endpoint can request for the client as seen here:</p>
<pre class="${"language-python"}"><!-- HTML_TAG_START -->${`<code class="language-python"><span class="token decorator annotation punctuation">@bp<span class="token punctuation">.</span>post</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">start_job</span><span class="token punctuation">(</span>request<span class="token punctuation">:</span> Request<span class="token punctuation">,</span> saje<span class="token punctuation">:</span> SajeClient<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> HTTPResponse<span class="token punctuation">:</span>
    uid <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>uuid4<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    saje<span class="token punctuation">.</span>send<span class="token punctuation">(</span>
        <span class="token punctuation">&#123;</span>
            <span class="token string">"task"</span><span class="token punctuation">:</span> <span class="token string">"hello"</span><span class="token punctuation">,</span>
            <span class="token string">"uid"</span><span class="token punctuation">:</span> uid<span class="token punctuation">,</span>
            <span class="token string">"kwargs"</span><span class="token punctuation">:</span> <span class="token punctuation">&#123;</span><span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"Adam"</span><span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">)</span>
    <span class="token keyword">return</span> text<span class="token punctuation">(</span>uid<span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>That\u2019s it. Now when we hit that endpoint and the flow will look something like this:</p>
${validate_component(Mermaid, "Mermaid").$$render($$result, {}, {}, {
    default: () => {
      return `graph LR
endpoint(Endpoint)--&gt;client[SajeClient]
client--&gt;queue[Queue]
queue--&gt;worker[[Worker]]
worker--&gt;results(Results)
`;
    }
  })}
<h2 class="${"is-size-2"}" id="${"wrap-up-and-next-steps"}">Wrap-up and next steps<a aria-hidden="${"true"}" tabindex="${"-1"}" href="${"#wrap-up-and-next-steps"}"><i class="${"las la-link"}" aria-hidden="${"true"}"></i></a></h2>
<p>There obviously are a lot of steps here that I glossed over. The <code>worker</code> function mentioned above for example. I suggest you take a look at the content in the <a href="${"https://github.com/ahopkins/personal-site/tree/main/src/background-job-worker"}" rel="${"nofollow"}">source code</a> to see how that works.</p>
<p>Our goal here was to examine how to use the new worker manager feature in Sanic to coordinate the sharing of data from worker processes to a custom background process. Obviously, a secondary hope was to show how you could build out a robust platform to handle your own background processing needs entirely within Sanic.</p>
<p>If I were to try to make this production ready, the things you would want to focus upon are:</p>
<ul><li>ensuring a more robust data store</li>
<li>scaling out the job workers (a new API for this is coming in v22.12, but you can do it in v22.9)</li>
<li>fault tolerance</li>
<li>abstracting tools for making single and multi-stage task operations</li></ul>
<p>Armed with this information, I hope you are now excited for what could be possible.</p>`;
});
export {
  Background_job_worker as default,
  metadata
};
