/**
 * @file next.config.mjs
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Next.js application configuration options.
 *
 * @description
 * Defines Next.js build options, framework settings, and environment properties.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
const nextConfig = {
  transpilePackages: ['@bleckwolf25/react', '@bleckwolf25/core', '@bleckwolf25/styles'],
  outputFileTracing: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
