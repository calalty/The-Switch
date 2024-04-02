/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "robohash.org" },
      { hostname: "loremflickr.com" },
    ],
  },
};

export default nextConfig;
