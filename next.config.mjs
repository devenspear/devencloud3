/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    disableStaticImages: false
  },
  trailingSlash: true,
  basePath: '',
  assetPrefix: '',
  transpilePackages: ['next-image'],
  webpack(config) {
    // Enable importing images and other static assets
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/media',
            outputPath: 'static/media',
            name: '[name].[hash].[ext]',
          },
        },
      ],
    });
    
    return config;
  }
}

export default nextConfig
