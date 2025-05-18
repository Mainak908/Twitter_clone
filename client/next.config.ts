import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "twitterr.s3.ap-south-1.amazonaws.com",
        pathname: "/uploads/**", // ✅ Fix: Add leading '/'
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
