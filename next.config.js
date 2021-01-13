const withPlugins = require('next-compose-plugins')
const dotenv = require('dotenv-webpack')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new dotenv({ silent: true }))

    return config
  },
}

module.exports = withPlugins([[withBundleAnalyzer]], nextConfig)
