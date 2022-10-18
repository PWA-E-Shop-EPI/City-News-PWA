const runtimeCaching = require('next-pwa/cache')

const withPWA = require('next-pwa')({
  dest: 'public',
  scope: '/',
  runtimeCaching,
})

module.exports = withPWA()