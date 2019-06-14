import React, { Component } from "react";
import { View, StyleSheet, ViewStyle, ImageBackground } from "react-native";
import { Carousel } from "UIKit";

export default class Index extends Component<any, any> {
  render() {
    return (
      <View style={styles.content}>
        <Carousel
          style={styles.wrapper}
          autoplay
          infinite
          afterChange={() => {}}
        >
          <ImageBackground
            source={require("../../../img/banner1.jpg")}
            style={{ width: "100%", height: 150 }}
          />
          <ImageBackground
            source={require("../../../img/banner2.jpg")}
            style={{ width: "100%", height: 150 }}
          />
        </Carousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    marginLeft: 10,
    marginRight: 10,
    height: 150
  } as ViewStyle,
  wrapper: {
    borderRadius: 8,
    backgroundColor: "#fff"
  } as ViewStyle
});
