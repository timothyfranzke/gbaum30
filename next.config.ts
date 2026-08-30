import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project. The parent `development/` folder
  // holds another project's package-lock.json, which otherwise makes Turbopack
  // infer the wrong root and mis-resolve next/font CSS in dev mode.
  turbopack: {
    root: import.meta.dirname,
  },
  async rewrites() {
    // Clean shareable URL for the roster-app concept demo in public/demo.
    return [{ source: '/demo/roster', destination: '/demo/roster.dc.html' }];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ],
  },
};

export default nextConfig;
