import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    {
      text: "Home",
      icon: "home",
      link: "/",
    },
    {
      text: "Blog",
      icon: "blog",
      link: "/blog/",
    },
    {
      text: "Articles",
      icon: "note",
      prefix: "posts/",
      children: "structure",
    },
    {
      text: "My book",
      children: [
        {
          text: "Sanic Book",
          icon: "book",
          link: "https://sanicbook.com",
        }
      ]
    },
  ],
});
