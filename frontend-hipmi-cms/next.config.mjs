/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000", // Specify the port if it's non-standard (80 for http, 443 for https)
        pathname: "/storage/**", // Optional: be more specific about the path
      },
    ],
  },
};

export default nextConfig;
