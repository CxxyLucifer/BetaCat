import React, { Component } from 'react';
import { View,Text} from 'react-native';
import {Toast, Scene } from 'UIKit';

import styles from './styles';

export default class Example extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Scene header={'通讯录'} hasBack={false} style={styles.container}>
        <Text>11111</Text>
      </Scene>
    );
  }
}
