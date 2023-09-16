/* eslint-disable no-undef */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: "https://13.237.154.187/api/1.0",
  },
  images: {
    domains: ["13.237.154.187"],
  },
};
module.exports = withPWA(nextConfig);
