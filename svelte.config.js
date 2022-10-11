import { mdsvex } from "mdsvex"
import mdsvexConfig from "./mdsvex.config.js"
import adapter from "@sveltejs/adapter-static"

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: [".svelte", ...mdsvexConfig.extensions],

    kit: {
        adapter: adapter(),
    },

    trailingSlash: "always",
    preprocess: [mdsvex(mdsvexConfig)],
    prerender: {
        crawl: true,
        entries: ["/"],
    },
}

export default config
