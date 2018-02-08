const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const glob = require("glob");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: "./todo/my-todo/my-todo.tsx",
  output: {
    filename: "./dist/main.bundle.js"
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          "to-string-loader",
          {
            loader: "css-loader",
            options: { sourceMap: false }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"], {
      root: process.cwd()
    }),
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        ecma: 8,
        compress: true
      }
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};
