module.exports = {
  publicRuntimeConfig: {
    responsiveBreakpoint: 768,
    movieApiBaseUrl: "http://localhost:3001",
  },
  serverRuntimeConfig: {
    movieSiteBaseUrl: "http://localhost:3000",
    movieApiBaseUrl: "http://localhost:3001",
  },
  reactStrictMode: true,
  experimental: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
};
