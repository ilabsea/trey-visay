import React, { Component } from 'react';
import { Platform, AppRegistry } from 'react-native';

import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';
import RF from 'react-native-responsive-fontsize';

import App from './app';

const customTextProps = {
  style: {
    ...Platform.select({
      android: {
        fontFamily: 'Kantumruy',
        lineHeight: 38,
        fontSize: 16,
      },
      ios: {
        fontFamily: 'HelveticaNeue',
        lineHeight: 0,
        fontSize: RF(2.5)
      }
    })

  }
};

const customTextInputProps = {
  style: {
    height: 48,
    ...Platform.select({
      android: {
        fontFamily: 'Kantumruy',
        lineHeight: 48,
        fontSize: 16
      },
      ios: {
        fontFamily: 'HelveticaNeue',
        lineHeight: 28,
        fontSize: RF(2.5)
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
