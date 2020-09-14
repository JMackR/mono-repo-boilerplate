module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }], "module:metro-react-native-babel-preset"],
  plugins: ["@babel/plugin-proposal-class-properties", "inline-json-import"],
  sourceType: "unambiguous",
}
