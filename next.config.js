/** @type {import('next').NextConfig} */
const { locales, sourceLocale } = require('./lingui.config.js')

const nextConfig = {
  i18n: {
    locales,
    defaultLocale: sourceLocale,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.po/,
      use: ['@lingui/loader'],
    })

    return config
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
