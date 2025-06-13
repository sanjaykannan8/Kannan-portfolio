import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/Kannan-portfolio',
  assetPrefix: `/Kannan-portfolio/`
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
