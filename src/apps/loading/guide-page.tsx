import React, { Component } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, ImageStyle } from 'react-native';
import { Kit } from 'UIKit';
import { msg } from 'plume2';

export default class GuidePage extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        bounces={false}
        pagingEnabled={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <ImageBackground source={require('img/guide1.png')} style={styles.backgroundImage} />
        <ImageBackground source={require('img/guide1.png')} style={styles.backgroundImage} />
        <ImageBackground source={require('img/guide1.png')} style={[styles.backgroundImage, styles.btnOut]}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              msg.emit('route:replaceRoute', {
                sceneName: 'Main',
              });
            }}
          >
            <Text style={styles.btnText}>启动应用</Text>
          </TouchableOpacity>
        </ImageBackground>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    width: Kit.Width * 3,
    height: Kit.Height,
  },
  backgroundImage: {
    width: Kit.Width,
    height: '100%',
    flexDirection: 'column-reverse',
  } as ImageStyle,
  btnOut: {
    alignItems: 'center',
  } as ImageStyle,
  btn: {
    width: 150,
    height: 35,
    backgroundColor: '#90ee90',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Kit.isAndroid() ? 45 : 25,
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
  },
});
