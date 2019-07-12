import React, { Component } from 'react';
import { Platform, AppRegistry} from 'react-native';

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

import { Container, Content, Button, Text, StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';

const customTextProps = {
  style: {
    fontSize: FontSetting.text,
    color: 'black',
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
    return(
      <StyleProvider style={getTheme(commonColor)}>
        <App/>
      </StyleProvider>
    )
  }
}

let MyHeadlessTask = async (event) => {
  Task.syncToServer();
  BackgroundFetch.finish();
}

BackgroundFetch.registerHeadlessTask(MyHeadlessTask);

AppRegistry.registerComponent('TreyVisay', () => TreyVisay);
