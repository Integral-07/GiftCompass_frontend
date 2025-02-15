import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
export default nextConfig;

module.exports = {
  experimental: {
    authInterrupts: true,
  },
};


module.exports = {

  async rewrites(){
    return [
      {
        source: "/api/:path*",
        destination: "http://host.docker.internal:8000/api/:path*/",
      }
    ]
  },
};
