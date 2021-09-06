const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/scripts/app.js",
  output: {
    filename: 'main.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new HtmlWebpackPlugin({
    template : "./src/template.html"
  })],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use : ['style-loader', 'css-loader']
      }
    ]
  }
};