module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      module-resolver,
      {
        alias: {
          "AJKit": "./src/uikit",
          "img": "./build/img"
        }
      }
    ]
  ]
};
