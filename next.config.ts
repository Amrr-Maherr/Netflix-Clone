import type { NextConfig } from "next";
import withPWA from "next-pwa";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = withPWA({
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
    ],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  experimental: {
    appDir: true,
  },
});

export default nextConfig;
