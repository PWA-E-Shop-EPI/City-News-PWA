const runtimeCaching = require('next-pwa/cache');

const withPWA = require('next-pwa')({
  dest: 'public',
  scope: '/',
  runtimeCaching,
  fallbacks: {
    image: '/logo.png'
  },
});

module.exports = withPWA({
  swcMinify: true,
  compiler: {
    styledComponents: true
  }
});
