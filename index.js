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
        lineHeight: 38,
      },
      ios: {
        fontFamily: 'HelveticaNeue',
        lineHeight: 0,
      }
    })

  }
};

const customTextInputProps = {
  style: {
    height: 48,
    fontSize: 16,
    ...Platform.select({
      android: {
        fontFamily: 'Kantumruy',
        lineHeight: 48,
      },
      ios: {
        fontFamily: 'HelveticaNeue',
        lineHeight: 28,
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
