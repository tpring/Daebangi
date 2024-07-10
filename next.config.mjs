/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["txvvzlryxqhzxjcsncqo.supabase.co"],
    remotePatterns: [
      {
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
