/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Re-enabled Next.js Image Optimization.
    // The placeholder domain is for the default images.
    // If you add images from other domains, add them here.
    domains: ['placeholder.svg'],
  },
  experimental: {
    appDir: true,
  },
}

export default nextConfig
