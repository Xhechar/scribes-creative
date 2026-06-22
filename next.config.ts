import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google review author photos
      },
      {
        protocol: "https",
        hostname: "picsum.photos", // TODO: remove once real portfolio photography replaces hero placeholders
      },
      {
        protocol: "https",
        hostname: "www.pinterest.com", // TODO: remove once real portfolio photography replaces hero placeholders
      },
    ],
    // formats: ["image/avif", "image/webp", "image/jpeg", "image/jpg", "image/png"],
  },
  compress: true,
};

export default nextConfig;
