// /** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        // hostname: ["lh3.googleusercontent.com", "googleusercontent.com"],
        // pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        // hostname: [
        //   "avatars.githubusercontent.com",
        //   "raw.githubusercontent.com",
        // ],
      },
      { protocol: "https", hostname: "utfs.io" },
    ],
  },
};

export default nextConfig;
