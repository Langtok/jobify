/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://jobify-gj12.onrender.com/api/:path*", // Proxy to backend
      },
    ];
  },
};

module.exports = nextConfig; // ✅ Correct way to export in CommonJS
