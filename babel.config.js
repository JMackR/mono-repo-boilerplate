module.exports = api => {
  api.cache(true)
  return {
    presets: ["@babel/typescript", "@babel/preset-react", "@babel/preset-env"],
    plugins: [
      "transform-es2015-arrow-functions",
      [
        "@babel/plugin-transform-runtime",
        {
          regenerator: true,
        },
      ],
      [
        "module-resolver",
        {
          alias: {
            "@web-components": "./web/src/components",
            "@web-pages": "./web/src/pages",
            "@web-src": "./web/src",
            "@web-app": "./web/src/app",
            "@web-features": "./web/src/features",
          },
          extensions: [".js", ".ts", ".tsx", ".scss"],
        },
      ],
    ],
  }
}
