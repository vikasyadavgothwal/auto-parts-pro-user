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

const securityHeaders = [
  ...(process.env.NODE_ENV === "production"
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains",
        },
      ]
    : []),
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), payment=(self)",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
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
  async redirects() {
    return [
      {
        source: "/services-page",
        destination: "/services",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
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
