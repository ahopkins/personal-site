import { hopeTheme } from "vuepress-theme-hope";
import { enNavbar } from "./navbar/index.js";
import { enSidebar } from "./sidebar/index.js";
export default hopeTheme({
  hostname: "https://amhopkins.com",
  author: {
    name: "Adam Hopkins",
    url: "https://amhopkins.com",
  },
  iconAssets: "iconfont",
  logo: "/adam.svg",
  repo: "ahopkins/personal-site",
  docsDir: "docs",
  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],
  blog: {
    avatar: "https://avatars.githubusercontent.com/u/166269",
    roundAvatar: true,
    medias: {
      Discord: "https://example.com",
      Email: "https://example.com",
      GitHub: "https://example.com",
      Linkedin: "https://example.com",
      Twitter: "https://example.com",
      Youtube: "https://example.com",
    },
  },
  darkmode: "enable",
  editLink: false,
  contributors: false,
  lastUpdated: true,
  locales: {
    "/": {
      navbar: enNavbar,
      sidebar: enSidebar,
      footer: 'The source code is licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>',
      copyright: "The website content is &copy; 2022 by Adam Hopkins.",
      displayFooter: true,
      blog: {
        description: "A FrontEnd programmer",
        intro: "/intro.html",
      },
    },
  },
  plugins: {
    blog: {
      autoExcerpt: true,
    },
    comment: {
      provider: "Giscus",
      repo: "ahopkins/personal-site",
      repoId: "MDEwOlJlcG9zaXRvcnkxMDcxODQzMDY=",
      category: "Comments",
      categoryId: "DIC_kwDOBmOAss4CR1uV"
    },
    mdEnhance: {
      // align: true,
      // attrs: true,
      // chart: true,
      codetabs: true,
      // container: true,
      // demo: true,
      // echarts: true,
      flowchart: true,
      // gfm: true,
      // imageSize: true,
      // include: true,
      // katex: true,
      // lazyLoad: true,
      // mark: true,
      mermaid: true,
      // playground: {
      //   presets: ["ts", "vue"],
      // },
      // presentation: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },
      stylize: [
        {
          matcher: "Recommanded",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommanded",
              };
          },
        },
      ],
      // sub: true,
      // sup: true,
      // tabs: true,
      // vpre: true,
      // vuePlayground: true,
    },
    pwa: {
      favicon: "/assets/icon/favicon.ico",
      cacheHTML: true,
      cachePic: true,
      appendBase: true,
      apple: {
        icon: "/assets/icon/apple-touch-icon.png",
        statusBarColor: "black",
      },
      manifest: {
        name: "",
        short_name: "",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone"
      },
    },
  },
});
