const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack') 
const HtmlWebpackPlugin = require('html-webpack-plugin') 

const mode = process.env.NODE_ENV || 'development'

module.exports = {
  mode,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(css)$/,
        loaders: [
          { loader: mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader' },
          { loader: 'css-loader' },
        ]
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  devServer: {
    open: true,
    hot: true,
    port: 8000,
    contentBase: './dist'
  },
};
