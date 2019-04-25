const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(
  commonConfig,
  {
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    devServer: {
      contentBase: './dist/app',
      hot: true,
      host: '0.0.0.0',
      port: 8001,
      historyApiFallback: true,
      proxy: {
        '/api': 'http://localhost:8002',
      },
    },
    module: {
      rules: [
        // Handle scss files and automatically reload
        {
          test: /\.(sc|c)ss$/,
          use: [
            'style-loader', // creates style nodes from JS strings
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
      new WriteFilePlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackExternalsPlugin({
        externals: [{
          module: 'bootstrap',
          entry: {
            path: 'dist/css/bootstrap.css',
            attributes: {
              crossorigin: 'anonymous',
            },
          },
        }],
      }),
    ],
  },
);
