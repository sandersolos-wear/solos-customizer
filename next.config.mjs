/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    const csp = "frame-ancestors https://admin.shopify.com https://*.myshopify.com;";
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          // Belangrijk: GEEN X-Frame-Options: DENY/SAMEORIGIN zetten
        ],
      },
    ];
  },
};
export default nextConfig;
