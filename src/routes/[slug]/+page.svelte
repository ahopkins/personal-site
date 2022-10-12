<script>
    import { onMount } from "svelte";
    import { readingTime } from "reading-time-estimator";
    import Time from "svelte-time";
    import Giscus from "@giscus/svelte";
    import { addCopy } from "$lib/utilities/copy";
    export let data;

    const { meta, body } = data;
    let timeToRead = "";

    /**
     * @param {Node} node
     */
    const _extract = (node) => {
        const output = {};
        let link = node.firstChild;
        if (link && link.nodeName === "P") {
            link = link.firstChild;
        }
        output.text = link?.textContent;

        // @ts-ignore
        output.href = link?.getAttributeNode("href")?.textContent;
        const nested = [...node.childNodes].filter(
            (item) => item.nodeName === "UL"
        );
        if (nested.length) {
            output.children = extractToc(nested[0]);
        }
        return output;
    };

    /**
     * @param {Node} toc
     */
    const extractToc = (toc) => {
        return [...toc.childNodes]
            .filter((x) => x.nodeName === "LI")
            .map(_extract);
    };

    const inject = (node, item) => {
        const outer = document.createElement("div");
        const newLink = document.createElement("a");
        outer.className = "navbar-item";
        newLink.href = item.href;
        newLink.text = item.text;
        outer.appendChild(newLink);
        if (item.children?.length) {
            const wrapper = document.createElement("div");
            wrapper.className = "navbar-indent";
            item.children.forEach((child) => inject(wrapper, child));
            outer.appendChild(wrapper);
        }
        node.appendChild(outer);
    };

    onMount(() => {
        const content = document.querySelector(".content")?.textContent;
        if (content) {
            timeToRead = readingTime(content).text;
        }
        const toc = document.querySelector("#table-of-contents+ul");
        const articleMenuTitle = document.querySelector("#article-menu-title");
        const articleMenuContent = document.querySelector(
            "#article-menu-content"
        );
        const adam = document.createElement("img");
        adam.setAttribute("alt", "Adam Hopkins");
        adam.setAttribute("src", "/images/adam.svg");
        toc.prepend(adam);

        if (articleMenuTitle) {
            articleMenuTitle.innerHTML = meta.title;
        }
        if (articleMenuContent) {
            articleMenuContent.replaceChildren();
            if (toc) {
                const structured = extractToc(toc);
                structured.forEach((item) => {
                    inject(articleMenuContent, item);
                });
            }
        }
        addCopy();
    });
</script>

<article>
    <div class="article-container container is-max-desktop">
        <h1 class="title is-size-1">{meta.title}</h1>
        <div class="subtitle">{meta.description}</div>

        <div class="article-info">
            <div class="date">
                <i class="las la-calendar" />
                <Time timestamp={meta.date} live relative format="YYYY-MM-DD" />
            </div>
            <div class="tags">
                <i class="las la-tags" />
                {#each meta.tag as tag}
                    <span class="tag is-dark">{tag}</span>
                {/each}
            </div>
            <div class="read-time">
                <i class="las la-hourglass" />
                {timeToRead}
            </div>
        </div>
        <div class="content">
            <svelte:component this={body} />
        </div>

        <Giscus
            repo="ahopkins/personal-site"
            repoId="MDEwOlJlcG9zaXRvcnkxMDcxODQzMDY="
            category="Comments"
            categoryId="DIC_kwDOBmOAss4CR1uV"
            mapping="title"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            lang="en"
            theme="dark"
        />
    </div>
</article>

<svelte:head>
    <title>
        {meta.title}
    </title>
</svelte:head>
