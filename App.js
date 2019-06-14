/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Application from './build/apps';

export default class App extends Component {
  render() {
    return (
      <Application initialRoute='SplashPage' />
    );
  }
}
