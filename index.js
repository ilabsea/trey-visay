import React, { Component } from 'react';
import { Platform, AppRegistry, Text } from 'react-native';

import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import { FontSetting } from './app/assets/style_sheets/font_setting';
import App from './app';

import { StyleProvider } from 'native-base';
import { Provider as PaperProvider, configureFonts, MD2LightTheme } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import store from './app/redux/store';

import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';
import { fontConfig } from './react-native-paper/fontConfig';
import Color from './app/themes/color';

const theme = {
  ...MD2LightTheme,
  fonts: configureFonts({config: fontConfig, isV3: false}),
  colors: {
    ...MD2LightTheme.colors,
    primary: Color.primaryColor
  }
};

export default class TreyVisay extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <StoreProvider store={store}>
          <PaperProvider theme={theme}>
            <GestureHandlerRootView style={{flex: 1}}>
              <BottomSheetModalProvider>
                <App />
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </PaperProvider>
        </StoreProvider>
      </StyleProvider>
    );
  }
}

AppRegistry.registerComponent('TreyVisay', () => TreyVisay);
