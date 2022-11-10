module.exports = {
  locales: ['en', 'ru'],
  sourceLocale: 'en',
  catalogs: [
    {
      path: 'locales/{locale}/messages',
      include: ['components', 'pages'],
      exclude: ['**/node_modules/**'],
    },
  ],
  format: 'po',
}
