const withPWA = require('next-pwa')

module.exports = withPWA({
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  pwa: {
    dest: 'public',
  },
})
