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
    ...Platform.select({
      android: {
        fontFamily: 'Kantumruy',
        lineHeight: 28,
        fontSize: 18,
      },
      ios: {
        fontFamily: 'HelveticaNeue',
        lineHeight: 0,
        fontSize: 16,
      }
    })

  }
};

const customTextInputProps = {
  style: {
    height: 48,
    lineHeight: 28,
    ...Platform.select({
      android: {
        fontFamily: 'Kantumruy',
        fontSize: 18,
      },
      ios: {
        fontFamily: 'HelveticaNeue',
        fontSize: 16
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
