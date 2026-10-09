import type { NextConfig } from 'next';

// STATIC_EXPORT=1 (npm run export) writes plain HTML to out/ for hosts without Node, e.g. cPanel.
const staticExport = process.env.STATIC_EXPORT === '1';

const nextConfig: NextConfig = {
  trailingSlash: true,
  ...(staticExport ? { output: 'export' as const } : {}),
  images: { unoptimized: staticExport },
};

export default nextConfig;
