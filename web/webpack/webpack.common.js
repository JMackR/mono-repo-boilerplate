/* eslint-disable @typescript-eslint/no-var-requires */
// const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    main: ["./web/src/index.tsx"],
  },
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../public"),
    publicPath: "/",
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              rootMode: "upward",
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.jpg|jpeg|gif|png|svg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    // alias: {
    //   shared: commonFolderPath
    // },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".scss", ".css"],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve("web/src/", "index.html"),
      inject: "body",
    }),
  ],
}
