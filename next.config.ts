// Next.js config for the openbean-website bundle.
// Mirrors apps/marketing/next.config.ts.
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  reactStrictMode: true,
  images: { unoptimized: true },
};

export default nextConfig;
