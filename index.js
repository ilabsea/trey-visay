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
    ...Platform.select({
      android: {
        fontFamily: 'Kantumruy',
        lineHeight: 28
      },
      ios: {
        fontFamily: 'HelveticaNeue',
        lineHeight: 0
      }
    })

  }
};

const customTextInputProps = {
  style: {
    fontSize: 16,
    height: 48,
    lineHeight: 28,
    ...Platform.select({
      android: {
        fontFamily: 'Kantumruy'
      },
      ios: {
        fontFamily: 'HelveticaNeue',
      }
    })
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
