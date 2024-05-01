module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@redux": "./src/redux",
            "@screens": "./src/screens",
            "@utils": "./src/utils",
            "@components": "./src/components",
            "@assets": "./assets",
          },
        },
      ],
    ],
  };
};
