import React, { Component } from 'react';
import { Platform, AppRegistry } from 'react-native';

import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';
import { FontSetting } from './app/assets/style_sheets/font_setting';
import BackgroundFetch from "react-native-background-fetch";

import App from './app';
import Task from './app/utils/task';

const customTextProps = {
  style: {
    fontSize: FontSetting.text,
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
    fontSize: FontSetting.text,
    ...Platform.select({
      android: {
        fontFamily: 'Kantumruy',
        lineHeight: 48,
      },
      ios: {
        fontFamily: 'HelveticaNeue',
        lineHeight: 28
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

let MyHeadlessTask = async (event) => {
  Task.syncToServer();
  BackgroundFetch.finish();
}

BackgroundFetch.registerHeadlessTask(MyHeadlessTask);

AppRegistry.registerComponent('TreyVisay', () => TreyVisay);
