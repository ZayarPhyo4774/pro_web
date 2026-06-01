/** @type {import('next').NextConfig} */

function mediaPatternsFromApiUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return [];

  try {
    const { protocol, hostname, port } = new URL(apiUrl);
    const pattern = {
      protocol: protocol.replace(':', ''),
      hostname,
      pathname: '/media/**',
    };
    if (port) {
      return [{ ...pattern, port }];
    }
    return [pattern];
  } catch {
    return [];
  }
}

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'http', hostname: 'localhost', port: '8000', pathname: '/media/**' },
      { protocol: 'http', hostname: '127.0.0.1', port: '8000', pathname: '/media/**' },
      ...mediaPatternsFromApiUrl(),
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
