/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["txvvzlryxqhzxjcsncqo.supabase.co"],
    remotePatterns: [
      {
        hostname: "raw.githubusercontent.com",
      },
      {
        hostname: "search.pstatic.net",
      },
    ],
  },
};

export default nextConfig;
