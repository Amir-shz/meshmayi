import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "zarsazan.storage.c2.liara.space",
      },
    ],
  },
};

export default nextConfig;
