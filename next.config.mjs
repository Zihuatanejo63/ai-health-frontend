/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: process.env.HEALTHMATCH_LOCAL_API ? undefined : "export",
  experimental: { externalDir: true },
  ...(process.env.HEALTHMATCH_LOCAL_API
    ? {
        async rewrites() {
          return [
            {
              source: "/api/:path*",
              destination: `${process.env.HEALTHMATCH_LOCAL_API}/api/:path*`,
            },
          ];
        },
      }
    : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
