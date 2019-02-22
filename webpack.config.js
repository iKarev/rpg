const webpack = require('webpack')
const path = require('path')
const HtmlWepbpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  devtool: 'eval',
  devServer: {
    port: 4200
  },

  resolve: {
    alias: {
      'core': path.join(__dirname, 'src/base')
    }
  },

  plugins: [
    new HtmlWepbpackPlugin({
      title: 'RPG',
      template: './index.html'
    }),
    new ExtractTextPlugin('style.css')
  ],
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  }
}