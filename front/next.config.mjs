/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains:['interest-48022f6f5975.herokuapp.com'],
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
