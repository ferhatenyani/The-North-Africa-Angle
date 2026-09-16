import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Contact now lives at the bottom of the home page (/en#contact, /fr#contact).
      { source: "/:lang(en|fr)/contact", destination: "/:lang#contact", permanent: true },
    ];
  },
};

export default nextConfig;
