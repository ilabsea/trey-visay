/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Root from './app/root';

export default class TreyVisay extends Component {
  render() {
    return (
      <Root></Root>
    );
  }
}

AppRegistry.registerComponent('TreyVisay', () => TreyVisay);
