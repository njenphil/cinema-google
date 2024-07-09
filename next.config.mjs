/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  async headers() {
    return [
      {
        source: "/api/fetch-show-single-user",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0"
          }
        ],
        source: "/api/category/*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0"
          }
        ]
      }
    ]
  },
  images: {
    domains: ["lh3.googleusercontent.com"]
  }
}

export default nextConfig
