import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ["127.0.0.1:3000", "localhost:3000"],
    images: {
        remotePatterns: [
            new URL("https://**.scdn.co/**"),
            new URL("https://**.spotifycdn.com/**"),
            {
                protocol: "https",
                hostname: "**.xx.fbcdn.net",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "**.fbsbx.com",
                port: "",
                pathname: "/**",
            },
        ],
        qualities: [25, 50, 75, 100],
    },
};

export default nextConfig;
