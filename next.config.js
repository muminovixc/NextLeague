/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    unoptimized: true,
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
