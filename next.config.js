/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [

      {
        // matching all auth API routes
        source: "/api/auth/:path*",
         // if the origin has '.my-domain.com'...
        has: [
          { type: 'header', key: 'origin', value: '(?<origin>^https:\/\/.*\.gstreet\.test$)' }, //CHANGE TO HTTPS
        ],
        // these headers will be applied
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: ':origin' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS, PATCH, DELETE, POST, PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
  reactStrictMode: true,
}

module.exports = nextConfig

      // https://vercel.com/support/articles/how-to-enable-cors#enabling-cors-in-a-next.js-app
      // https://nextjs.org/docs/api-reference/next.config.js/headers#header-cookie-and-query-matching
