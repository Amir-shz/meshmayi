import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "زرسازان بهرو",
    short_name: "زرسازان بهرو",
    description: "زرسازان بهرو",
    lang: "fa",
    start_url: "/",
    display: "standalone",
    background_color: "#f1e8e8",
    theme_color: "#f1e8e8",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
