import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.100.207", "localhost", "127.0.0.1"],
  outputFileTracingRoot: __dirname,
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "hrdcmalawi.org" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "chrrmw.org" },
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/practice", destination: "/practice-areas", permanent: true },
      { source: "/services", destination: "/practice-areas", permanent: true },
      { source: "/attorneys", destination: "/our-team", permanent: true },
      { source: "/team", destination: "/our-team", permanent: true },
      { source: "/lawyers", destination: "/our-team", permanent: true },
      { source: "/clients", destination: "/experience", permanent: true },
      { source: "/our-experience", destination: "/experience", permanent: true },
      { source: "/our-practice", destination: "/practice-areas", permanent: true },
      { source: "/insights", destination: "/blog", permanent: true },
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/contacts", destination: "/contact", permanent: true },
    ];
  },
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      react$: path.resolve(__dirname, "react-shim.js"),
    };
    return config;
  },
};

export default nextConfig;
