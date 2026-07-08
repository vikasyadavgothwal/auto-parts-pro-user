import path from "node:path";
import type { NextConfig } from "next";

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const fleetAppUrl = process.env.FLEET_APP_URL?.trim()
  ? trimTrailingSlash(process.env.FLEET_APP_URL.trim())
  : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
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
    if (!fleetAppUrl) {
      return [];
    }

    return [
      {
        source: "/fleet",
        destination: `${fleetAppUrl}/fleet`,
      },
      {
        source: "/fleet/:path*",
        destination: `${fleetAppUrl}/fleet/:path*`,
      },
    ];
  },
};

export default nextConfig;
