import path from "node:path";
import type { NextConfig } from "next";

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const fleetAppUrl = process.env.FLEET_APP_URL?.trim()
  ? trimTrailingSlash(process.env.FLEET_APP_URL.trim())
  : "";
const userDashboardAppUrl = process.env.USER_DASHBOARD_APP_URL?.trim()
  ? trimTrailingSlash(process.env.USER_DASHBOARD_APP_URL.trim())
  : process.env.NODE_ENV === "production"
    ? "https://user.websitedesignersdubai.ae"
    : "http://localhost:3002";

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
      {
        protocol: "https",
        hostname: "auto-parts-pro.s3.eu-north-1.amazonaws.com",
      },
    ],
  },
  async rewrites() {
    return [
      ...(userDashboardAppUrl
        ? [
            {
              source: "/user_dashboard",
              destination: `${userDashboardAppUrl}/user_dashboard`,
            },
            {
              source: "/user_dashboard/:path*",
              destination: `${userDashboardAppUrl}/user_dashboard/:path*`,
            },
          ]
        : []),
      ...(fleetAppUrl
        ? [
      {
        source: "/fleet",
        destination: `${fleetAppUrl}/fleet`,
      },
      {
        source: "/fleet/:path*",
        destination: `${fleetAppUrl}/fleet/:path*`,
      },
          ]
        : []),
    ];
  },
};

export default nextConfig;
