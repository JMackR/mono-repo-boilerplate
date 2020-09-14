/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge")
const commonConfig = require("./webpack.common")
const ip = require("ip")

module.exports = merge(commonConfig, {
  devServer: {
    contentBase: "public",
    overlay: true,
    host: ip.address(),
  },
})
