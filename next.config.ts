import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stage-backend.nubyira.com",
        // pathname: "/**" // optional, allows all paths
      },
      {
        protocol: 'https',
        hostname: 'stage-backend.nubyira.com',
       // pathname: '/media/**', // Optional: limit to media paths
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000", 
        // pathname: "/media/**", // optional: restrict to media folder
      },
    ],
  },
};

export default nextConfig;
