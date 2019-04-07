const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = merge(
  commonConfig,
  {
    mode: 'production',
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name].[contenthash].bundle.js',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    module: {
      rules: [
        {
          test: /\.(sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader', // translates CSS into CommonJS
            'sass-loader', // compiles Sass to CSS
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/app/index.ejs',
        filename: './index.html',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
      new HtmlWebpackExternalsPlugin({
        // Use NPM module in dev, CDN in production
        externals: [
          {
            module: 'react',
            entry: {
              path: 'https://unpkg.com/react@16.8.6/umd/react.production.min.js',
              attributes: {
                crossorigin: 'anonymous',
              },
            },
            global: 'React',
          },
          {
            module: 'react-dom',
            entry: {
              path: 'https://unpkg.com/react-dom@16.8.6/umd/react-dom.production.min.js',
              attributes: {
                crossorigin: 'anonymous',
              },
            },
            global: 'ReactDOM',
          },
          {
            module: 'bootstrap',
            entry: {
              path: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
              attributes: {
                crossorigin: 'anonymous',
                integrity: 'sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T',
              },
            },
          },
        ],
      }),
    ],
  },
);
