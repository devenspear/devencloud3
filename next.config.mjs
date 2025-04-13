/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: 'dist',
  images: {
    unoptimized: true,
    domains: ['vercel.app']
  },
  basePath: '',
  assetPrefix: ''
}

export default nextConfig
