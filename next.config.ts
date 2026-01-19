import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ["127.0.0.1:3000", "localhost:3000"],
    images: {
        remotePatterns: [
            new URL("https://**.scdn.co/**"),
            new URL("https://**.spotifycdn.com/**"),
        ],
    },
};

export default nextConfig;
