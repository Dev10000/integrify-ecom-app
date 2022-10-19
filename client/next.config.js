/** @type {import('next').NextConfig} */
module.exports = {
  // webpack(config) {
  //   config.infrastructureLogging = { debug: /PackFileCache/ };
  //   return config;
  // },
  reactStrictMode: true,
  images: {
    domains: ['mdb-store.com', 'via.placeholder.com', 'res.cloudinary.com'],
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
};
