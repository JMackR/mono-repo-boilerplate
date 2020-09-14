/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const blacklist = require("metro-config/src/defaults/blacklist")
const { getDefaultConfig } = require("metro-config")
const path = require("path")
module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig()
  return {
    watchFolders: [path.resolve(__dirname, "../")],
    transformer: {
      blacklistRE: blacklist([/\/android\/.*/, /\/ios\/.*/]),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"],
      blacklistRE: blacklist([/\/android\/.*/, /\/ios\/.*/]),
    },
  }
})()
