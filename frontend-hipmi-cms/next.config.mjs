/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev3-p3.palindo.id",
        port: "", // Specify the port if it's non-standard (80 for http, 443 for https)
        pathname: "/storage/**", // Optional: be more specific about the path
      },
    ],
  },
};

export default nextConfig;
