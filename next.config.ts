import type { NextConfig } from "next";
import withPWA from "next-pwa";
const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
      // YouTube thumbnails for video gallery
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  turbopack: {},
  reactStrictMode: true,
  async rewrites() {
    return [
      // Movies
      { source: "/movies", destination: "/Movies" },
      { source: "/movies/:movieId", destination: "/MovieDetails/:movieId" },
      // TV
      { source: "/tv", destination: "/TvShows" },
      { source: "/tv/:tvId", destination: "/TvShowDetails/:tvId" },
      { source: "/tv/:tvId/seasons/:seasonNumber", destination: "/SeasonDetails/:tvId/:seasonNumber" },
      // People (Actor/Crew)
      { source: "/people/actor/:personId", destination: "/ActorDetails/:personId" },
      { source: "/people/crew/:personId", destination: "/CrewDetails/:personId" },
      // Auth
      { source: "/auth/login", destination: "/Login" },
      { source: "/auth/register", destination: "/Register" },
      { source: "/auth/forgot-password", destination: "/ForgotPassword" },
      // Collections and utility
      { source: "/new-and-popular", destination: "/NewPopular" },
      { source: "/kids", destination: "/Kids" },
      { source: "/watchlist", destination: "/my-list" },
      // Keep existing paths for search, account, offline
    ];
  },
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
