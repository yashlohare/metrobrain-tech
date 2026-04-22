import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // This can help if Turbopack is misidentifying the root
    // turbopackRoot: __dirname, 
  },
  // Silence the Turbopack/Webpack conflict error
  turbopack: {},
  // Ensure we don't have issues with three-stdlib in the build
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: "canvas" }];
    return config;
  },
};

export default nextConfig;
