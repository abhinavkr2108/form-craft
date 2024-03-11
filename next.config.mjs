/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLISHABLE_KEY: process.env.NEXT_PUBLISHABLE_KEY,
    // Add other environment variables here
  },
};

export default nextConfig;
