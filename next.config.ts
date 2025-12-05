import type { NextConfig } from "next";
import withPWA from "next-pwa";
const nextConfig: NextConfig = {
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
  turbopack: {},
  reactStrictMode: true,
};

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false,
  fallback: {
    '/': '/offline',
  },
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.themoviedb\.org\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'tmdb-api-cache',
        networkTimeoutSeconds: 10,
        cacheKeyWillBeUsedBy: 'url',
      },
    },
  ],
});

export default pwaConfig(nextConfig);
