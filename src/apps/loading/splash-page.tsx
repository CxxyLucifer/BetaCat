import React, { Component } from "react";
import { Animated } from "react-native";
import { AsyncStorageUtil, Kit } from "UIKit";
import { msg } from "plume2";

const splashImg = require("img/loading.png");

export default class SplashPage extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(1)
    };
  }

  timer;
  componentDidMount() {
    Animated.timing(this.state.bounceValue, {
      toValue: 1.2,
      duration: 1000
    }).start();
    this.timer = setTimeout(() => {
      AsyncStorageUtil.getItem("isFrist")
        .then(result => {
          if (result == null || result == "") {
            AsyncStorageUtil.setItem("isFrist", "true");
            msg.emit("route:replaceRoute", {
              sceneName: "GuidePage"
            });
          } else {
            msg.emit("route:replaceRoute", {
              sceneName: "Main"
            });
          }
        })
        .catch(error => {
          console.log("系统异常" + error);
        });
    }, 1000);
  }

  componentWillUpdate = () => {
    clearTimeout(this.timer);
  };

  render() {
    return (
      <Animated.Image
        style={{
          width: Kit.Width,
          height: Kit.Height,
          transform: [{ scale: this.state.bounceValue }]
        }}
        source={splashImg}
      />
    );
  }
}
