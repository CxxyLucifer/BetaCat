import React, { Component } from 'react';
import { StyleSheet, ViewStyle, ImageBackground } from 'react-native';
import { Carousel } from 'UIKit';

export default class Index extends Component<any, any> {
  render() {
    return (
      <Carousel style={styles.wrapper} autoplay infinite afterChange={() => {}}>
        <ImageBackground source={require('../../../img/banner1.jpg')} style={{ width: '100%', height: 150 }} />
        <ImageBackground source={require('../../../img/banner2.jpg')} style={{ width: '100%', height: 150 }} />
      </Carousel>
    );
  }
}

const styles = StyleSheet.create<{
  wrapper: ViewStyle;
}>({
  wrapper: {
    backgroundColor: '#fff',
  },
});
