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
    API_URL: "https://13.236.60.107/api/1.0",
  },
};
module.exports = withPWA(nextConfig);

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
});
