import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import TextHighlight from 'react-native-text-highlighter';
import { FontSetting } from '../assets/style_sheets/font_setting';
import {FontFamily} from '../themes/font';
import {getStyleOfDevice} from '../utils/responsive_util';

const MyText = (props) => {
  if (!!props.allowTextHighlight)
    return <TextHighlight textToHighlight={props.label} searchWords={[props.searchText]} textStyle={[styles.textStyle, props.style]}/>

  return (
    <Text {...props} style={[styles.textStyle, props.style]} >{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: 'black',
    fontSize: FontSetting.text,
    ...Platform.select({
      android: {
        fontFamily: FontFamily.regular,
        lineHeight: 34,
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


