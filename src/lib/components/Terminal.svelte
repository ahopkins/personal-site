<script>
    import { onMount } from "svelte";

    export let title = "adam.py";

    const output = [
        { text: ">>> adam = Adam()", prompt: true },
        { text: ">>> await adam.run(Coffee())", prompt: true },
        { text: "[stackyak] shipping inference stacks…" },
        { text: "[sanic] reviewing pull requests…" },
        { text: ">>> adam.sleep()", prompt: true },
        { text: "Traceback (most recent call last):", error: true },
        { text: "NotImplementedError", error: true },
    ];

    let frame;
    let lines = 1;
    let armed = false;
    let running = false;

    onMount(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const code = frame.querySelector("pre")?.textContent ?? "";
        lines = Math.max(1, code.trimEnd().split("\n").length);
        armed = true;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                running = true;
                observer.disconnect();
            },
            { threshold: 0.4 },
        );
        observer.observe(frame);
        return () => observer.disconnect();
    });
</script>

<div
    class="terminal"
    class:armed
    class:running
    bind:this={frame}
    style:--lines={lines}
>
    <div class="bar">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="title">{title}</span>
    </div>
    <div class="code">
        <slot />
    </div>
    <div class="output">
        {#each output as line, i}
            <div
                class="line"
                class:prompt={line.prompt}
                class:error={line.error}
                style:--i={i}
            >
                {line.text}
            </div>
        {/each}
        <div class="line prompt" style:--i={output.length}>
            &gt;&gt;&gt; <span class="caret"></span>
        </div>
    </div>
</div>

<style>
    .terminal {
        --step: 90ms;
        --code-time: calc(var(--lines) * var(--step));
        background: #141414;
        border: 1px solid #2a2a2a;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
    }
    .bar {
        display: flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0.65rem 0.9rem;
        background: #1c1c1c;
        border-bottom: 1px solid #2a2a2a;
    }
    .dot {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 50%;
    }
    .red {
        background: #ff5f57;
    }
    .yellow {
        background: #febc2e;
    }
    .green {
        background: #28c840;
    }
    .title {
        margin-left: 0.6rem;
        color: #666666;
        font-family: monospace;
        font-size: 0.85rem;
    }
    .code :global(pre) {
        margin: 0;
    }
    .output {
        padding: 0 1.25rem 1.25rem;
        font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
        font-size: 0.875em;
        line-height: 1.5;
        color: #a0a0a0;
    }
    .prompt {
        color: #eeeeee;
    }
    .error {
        color: #ff0d68;
    }
    .caret {
        display: inline-block;
        width: 0.55em;
        height: 1.1em;
        vertical-align: -0.2em;
        background: #ff0d68;
        animation: blink 1.1s steps(1) infinite;
    }

    .armed .code {
        clip-path: inset(0 0 100% 0);
    }
    .armed .line {
        opacity: 0;
    }
    .running .code {
        animation: reveal var(--code-time) steps(var(--lines)) forwards;
    }
    .running .line {
        animation: appear 0.01s forwards;
        animation-delay: calc(var(--code-time) + 250ms + var(--i) * 380ms);
    }

    @keyframes reveal {
        to {
            clip-path: inset(0 0 0 0);
        }
    }
    @keyframes appear {
        to {
            opacity: 1;
        }
    }
    @keyframes blink {
        50% {
            opacity: 0;
        }
    }
    @media (prefers-reduced-motion: reduce) {
        .caret {
            animation: none;
        }
    }
</style>
