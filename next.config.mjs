/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "raw.githubusercontent.com",
      },
      {
        hostname: "search.pstatic.net",
      },
      {
        hostname: "txvvzlryxqhzxjcsncqo.supabase.co",
      },
    ],
  },
};

export default nextConfig;
