const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const Dotenv = require('dotenv-webpack');

let pathsToClean = ["build"];

module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  target: "node",
  devtool: "eval-source-map",
  // devtool: "#inline-source-map",
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "server.js",
    publicPath: "build/"
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean),
    new Dotenv(),
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false
        }
      }
    }),
  ],
  module: {
    rules: [
      {
        use: "babel-loader",
        exclude: /(node_modules)/,
        test: /\.js$/
      }
    ]
  }
};
