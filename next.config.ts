import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ["127.0.0.1:3000", "localhost:3000"],
    images: {
        remotePatterns: [
            new URL("https://**.scdn.co/**"),
            new URL("https://**.spotifycdn.com/**"),
            {
                protocol: "https",
                hostname: "scontent-bom2-2.xx.fbcdn.net",
                port: "",
                pathname: "/v/**",
            },
        ],
    },
};

export default nextConfig;
