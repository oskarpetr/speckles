import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
        }]
    },
    reactStrictMode: false,
    experimental: {
        serverComponentsExternalPackages: ['@react-pdf/renderer'],
    },
};

export default withPlaiceholder(nextConfig);