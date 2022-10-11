import { defineMDSveXConfig as defineConfig } from "mdsvex"
import addClasses from "rehype-add-classes"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import admonition from "./src/lib/styles/md/admonition.js"
import { h } from "hastscript"
import remarkToc from "remark-toc"

const config = defineConfig({
    extensions: [".svelte.md", ".md", ".svx"],

    smartypants: {
        quotes: true,
        ellipses: true,
        dashes: "inverted",
    },

    remarkPlugins: [admonition, remarkToc],
    rehypePlugins: [
        [
            addClasses,
            {
                h1: "is-size-1",
                h2: "is-size-2",
                h3: "is-size-3",
                h4: "is-size-4",
            },
        ],
        rehypeSlug,
        [
            rehypeAutolinkHeadings,
            {
                behavior: "append",
                content(node) {
                    return [h("i.las.la-link", { ariaHidden: "true" })]
                },
            },
        ],
    ],
})

export default config
