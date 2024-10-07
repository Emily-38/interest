/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains:['localhost'],
        remotePatterns: [
          {
            protocol: 'https',
           hostname:'*.*',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
