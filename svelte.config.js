import { mdsvex } from "mdsvex"
import mdsvexConfig from "./mdsvex.config.js"
import adapter from "@sveltejs/adapter-static"

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: [".svelte", ...mdsvexConfig.extensions],

    kit: {
        adapter: adapter({
            pages: "docs",
            assets: "docs"
        }),
        paths: {
            base: "",
        },
        trailingSlash: "always",
        prerender: {
            crawl: true,
            entries: ["*", "/background-job-worker"],
        },
    },

    preprocess: [mdsvex(mdsvexConfig)],
}

export default config
