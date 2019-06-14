module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        "alias": {
          "AJIcon": "./src/icon",
          "AJKit": "./src/uikit",
          "img": "./build/img"
        }
      }
    ]
  ]
};
