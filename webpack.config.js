var path = require('path');
var StringReplacePlugin = require("string-replace-webpack-plugin");
var webpack = require('webpack');

module.exports = {
  entry: './src/browser-extensions/pdfMake.js',
  output: {
    path: path.join(__dirname, './build'),
    filename: 'pdfmake.js'
  },
  resolve: {
    alias: {
      fs: path.join(__dirname, './src/browser-extensions/virtual-fs.js')
    }
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      { test: /browser-extensions\/pdfMake.js$/, loader: 'expose?pdfMake' },
      { test: /pdfkit\/js\/mixins\/fonts.js$/, loader: StringReplacePlugin.replace({
        replacements: [
          {
            pattern: 'return this.font(\'Helvetica\');',
            replacement: ''
          }
        ]})
      }
    ]
  },
  plugins: [
    new StringReplacePlugin(),
    new webpack.IgnorePlugin(/lodash/)
  ],
  externals: {
    'lodash': '_'
  }
};
