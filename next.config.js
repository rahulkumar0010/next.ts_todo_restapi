/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    MONGO_URI: "",
  },
};

module.exports = nextConfig;
