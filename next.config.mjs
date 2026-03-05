import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */

const r2PublicUrl = process.env.R2_PUBLIC_URL
const r2Hostname = r2PublicUrl ? new URL(r2PublicUrl).hostname : null

const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wiatour.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/media/**',
      },
      ...(r2Hostname
        ? [{ protocol: 'https', hostname: r2Hostname, pathname: '/**' }]
        : []),
    ],
  },
  // Your Next.js config here
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
