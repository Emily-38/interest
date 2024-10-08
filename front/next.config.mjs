/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
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
