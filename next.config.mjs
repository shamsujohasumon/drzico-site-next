/** Static export: `npm run build` writes plain HTML/CSS/JS to out/, which runs on any web host
 *  (Hostinger shared hosting, no Node.js server needed). Clean URLs and security headers come from out/.htaccess (scripts/postbuild.mjs). */
const nextConfig = {
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { globalNotFound: true },
};
export default nextConfig;
