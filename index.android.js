import React, { Component } from 'react';
import {
  View,
  AppRegistry,
  Text,
} from 'react-native';

import App from './app';

export default class TreyVisay extends Component {
  render() {
    return(<App />)
  }
}

AppRegistry.registerComponent('TreyVisay', () => TreyVisay);
