import React, { Component } from 'react';
import { View } from 'react-native';
import { AJListView, Toast, Scene } from 'UIKit';
import FlatListItem from './item';

import styles from './styles';

export default class Example extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Scene header={'消息'} hasBack={false} style={styles.container}>
        <AJListView onFetch={this._onFetch} item={this._renderItem} />
      </Scene>
    );
  }

  _onFetch = async (page = 1, startFetch, abortFetch) => {
    try {
      let pageLimit = 14;
      const skip = (page - 1) * pageLimit;

      let rowData = Array.from({ length: pageLimit }, (value, index) => `item -> ${index + skip}`);

      if (page > 4) {
        rowData = [];
      }

      setTimeout(() => {
        startFetch(rowData, pageLimit);
      }, 100);
    } catch (err) {
      abortFetch();
      console.log(err);
    }
  };

  _onPressItem = (type, index, item) => {
    Toast.info(`${type}, You're pressing on ${item}`, 3);
  };

  _renderItem = (item, index, separator) => {
    return <FlatListItem item={item} index={index} onPress={this._onPressItem} />;
  };
}
