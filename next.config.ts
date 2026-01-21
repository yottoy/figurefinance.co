import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.figurefinance.co',
          },
        ],
        destination: 'https://figurefinance.co/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
