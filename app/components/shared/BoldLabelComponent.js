import React from 'react';
import { Text } from 'react-native';

import {FontFamily} from '../../themes/font';
import color from '../../themes/color';
import {FontSetting} from '../../assets/style_sheets/font_setting'

// This component apply the fontFamily to Khmer language only because Koulen-Regular font will render
// the English text in uppercase only
const BoldLabelComponent = (props) => {
  return (
    <Text {...props} style={[{ color: color.lightBlackColor, fontSize: FontSetting.text, fontFamily: FontFamily.bold }, props.style]}>
      {props.label}
    </Text>
  )
}

export default BoldLabelComponent;
