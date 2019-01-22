import React, { Component } from 'react';
import { Platform, AppRegistry } from 'react-native';

import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';

import App from './app';

const customTextProps = {
  style: {
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Kantumruy',
    lineHeight: Platform.OS === 'ios' ? 0 : 28
  }
};

const customTextInputProps = {
  style: {
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Kantumruy',
    fontSize: 16,
    height: 48,
    lineHeight: 28
  }
};

setCustomText(customTextProps);
setCustomTextInput(customTextInputProps);

export default class TreyVisay extends Component {
  render() {
    return(<App/>)
  }
}

AppRegistry.registerComponent('TreyVisay', () => TreyVisay);
