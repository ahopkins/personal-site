import { defineUserConfig } from "vuepress";
import theme from "./theme/theme.js";
import { getDirname, path } from '@vuepress/utils'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { searchPlugin } from "@vuepress/plugin-search";

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "Adam Hopkins",
      description: "A blog demo for vuepress-theme-hope",
    },
  },
  head: [
    ["link", { rel: "stylesheet", href: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css" }],
  ],

  theme,

  plugins: [
    registerComponentsPlugin({
      components: {
        Content: path.resolve(__dirname, './custom/elements/Content.vue'),
        Hero: path.resolve(__dirname, './custom/elements/Hero.vue'),
        Articles: path.resolve(__dirname, './custom/elements/Articles.vue'),
      },
    }),
    searchPlugin(),
  ],
  alias: {
    // Here you can redirect aliases to your own components
    // For example, here we change the theme’s home page component to HomePage.vue under user .vuepress/components
    "@theme-hope/modules/sidebar/components/Sidebar.js": path.resolve(
      __dirname,
      "./custom/sidebar/Sidebar.js"
    ),
  },
  shouldPrefetch: true,
});
