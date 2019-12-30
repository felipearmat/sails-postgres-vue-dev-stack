var webpackConfig = require('./webpack.config.js')
var path = require('path')

function resolve (...dir) {
    return path.join(__dirname, ...dir)
}

module.exports = {
  configureWebpack: webpackConfig,
  filenameHashing: false,
  outputDir: resolve('..', 'sails', 'assets', 'vue'),
  publicPath: '/static/',
  css: {
    extract: {
      filename: '[name].css',
      chunkFilename: '[name].css'
    }
  }
}
