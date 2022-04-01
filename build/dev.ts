const HtmlWebpackPlugin = require('html-webpack-plugin')
const base = require('./base')

module.exports = Object.assign({}, base, {
  mode: 'development',

  entry: '/test/index.ts',

  devServer: {
    hot: true,
    compress: true,
    port: 3003,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    })
  ],
})

export {}
