import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',

  images: {
    remotePatterns: [
      // TODO: example 도메인 및 picsum 도메인 삭제
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/post-image.png',
      },
      {
        protocol: 'https',
        hostname: 'buddys-assets.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'buddys-assets.s3.ap-northeast-2.amazonaws.com',
        pathname: '/profiles/**',
      },
      {
        protocol: 'https',
        hostname: 'buddys-assets.s3.ap-northeast-2.amazonaws.com',
        pathname: '/posts/**',
      },
      {
        protocol: 'https',
        hostname:
          'buddys-assets-332486111134-ap-northeast-2-an.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:
          'buddys-assets-332486111134-ap-northeast-2-an.s3.ap-northeast-2.amazonaws.com',
        pathname: '/profiles/**',
      },
      {
        protocol: 'https',
        hostname:
          'buddys-assets-332486111134-ap-northeast-2-an.s3.ap-northeast-2.amazonaws.com',
        pathname: '/posts/**',
      },
      {
        protocol: 'https',
        hostname: '*.kakaocdn.net',
        pathname: '/**',
      },
    ],
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'buddys-vj',

  project: 'javascript-nextjs',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  webpack: {
    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
