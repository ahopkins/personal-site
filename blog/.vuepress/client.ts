// .vuepress/theme/config.js
import { defineClientConfig } from "@vuepress/client";
import Landing from "./custom/layouts/Landing.vue";

export default defineClientConfig({
    layouts: {
        Landing
    },
});
