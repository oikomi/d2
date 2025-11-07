/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  // Configure allowed development origins to prevent cross-origin warnings
  allowedDevOrigins: ['http://146.56.251.98', '146.56.251.98']
};

export default config;
