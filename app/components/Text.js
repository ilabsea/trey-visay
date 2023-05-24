import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { FontSetting } from '../assets/style_sheets/font_setting';
import {FontFamily} from '../themes/font';
import {getStyleOfDevice} from '../utils/responsive_util';

const MyText = (props) => {
  return (
    <Text {...props} style={[styles.textStyle, props.style]} >{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: FontSetting.text,
    ...Platform.select({
      android: {
        fontFamily: 'KantumruyRegular',
        lineHeight: 38,
      },
      ios: {
        fontFamily: FontFamily.regular,
        fontSize: FontSetting.text,
        lineHeight: getStyleOfDevice(42, 32),
      }
    })
  }
})

export default MyText;


