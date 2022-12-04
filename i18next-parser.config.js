module.exports = {
  locales: ['en', 'ru'],
  output: 'public/locales/$LOCALE/$NAMESPACE.json',
  defaultValue: (locale, namespace, key, value) => key,
}
