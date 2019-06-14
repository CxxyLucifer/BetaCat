module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        "alias": {
          "UIcon": "./src/icon",
          "UIKit": "./src/uikit",
          "img": "./build/img"
        }
      }
    ]
  ]
};
