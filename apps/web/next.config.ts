import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  compress: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
  env: {
    NEXT_PUBLIC_ARTIFACT_PATH: process.env.NEXT_PUBLIC_ARTIFACT_PATH ?? './out',
  },
};

export default nextConfig;
