import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/fleet",
        destination: "http://localhost:3001/fleet",
      },
      {
        source: "/fleet/:path*",
        destination: "http://localhost:3001/fleet/:path*",
      },
    ];
  },
};

export default nextConfig;
