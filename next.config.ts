import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "colorvaults.ams3.cdn.digitaloceanspaces.com",
      },
    ],
  },
};

export default nextConfig;
