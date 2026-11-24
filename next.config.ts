import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      // Temporarily disabled for testing on https://sunilfernando.vercel.app
      // Re-enable before final GoDaddy launch:
      // {
      //   source: "/:path*",
      //   has: [{ type: "host", value: "sunilfernando.vercel.app" }],
      //   destination: "https://www.sunilfernando.com/:path*",
      //   statusCode: 301,
      // },
      {
        source: "/studio",
        destination: "/admin",
        permanent: false,
      },
      {
        source: "/studio/:path*",
        destination: "/admin/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
