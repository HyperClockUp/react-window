const path = require('path');
const { ROOT_PATH } = require('../config/constant');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: ['web'],
  entry: {
    main: path.join(ROOT_PATH, './index.tsx'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  devtool: "eval-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, '../public'),
    },
    compress: true,
    port: 9000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/i,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
          plugins: [
            "@babel/proposal-class-properties",
            "@babel/proposal-object-rest-spread"
          ]
        }
      },
      {
        test: /\.css?$/i,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.s[ac]ss?$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)?$/i,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "window 10",
      template: 'public/index.html'
    })
  ]
}