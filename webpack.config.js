const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  const activeMode = argv.mode;

  return {
    mode: activeMode,
    devServer: {
      static: path.resolve(__dirname, './dist'),
      open: true,
      hot: false
    },
    entry: {
      main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Thevit Test Task',
        template: path.resolve(__dirname, './src/index.html'),
        filename: 'index.html',
      }),
      new CleanWebpackPlugin(),
      new MinCssExtractPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(scss|css)$/,
          use: [MinCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
        },
      ],
    }
  }
}