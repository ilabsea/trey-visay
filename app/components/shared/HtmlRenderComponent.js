import React from 'react';
import {Dimensions} from 'react-native';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';

import Color from '../../themes/color';
import {FontFamily} from '../../themes/font';
import {descriptionLineHeight} from '../../constants/component_constant';
import { FontSetting } from '../../assets/style_sheets/font_setting';

const systemFonts = [...defaultSystemFonts, FontFamily.regular, FontFamily.bold];

const HtmlRenderComponent = (props) => {
  const tagsStyles = {
    div: {
      color: Color.blackColor,
      fontFamily: FontFamily.regular,
      fontSize: FontSetting.text,
      lineHeight: descriptionLineHeight,
    },
    p: {
      color: Color.blackColor,
      fontFamily: FontFamily.regular,
      fontSize: FontSetting.text,
      lineHeight: descriptionLineHeight,
    },
    ul: {
      marginTop: 0
    },
    b: {
      color: Color.blackColor,
      fontFamily: FontFamily.bold,
      fontSize: FontSetting.text,
    },
    strong: {
      color: Color.blackColor,
      fontFamily: FontFamily.bold,
      fontSize: FontSetting.text + 1.5,
    },
    span: {
      color: Color.blackColor,
      fontFamily: FontFamily.regular,
      fontSize: FontSetting.text,
      marginTop: -10,
      lineHeight: descriptionLineHeight,
    }
  }

  return (
    <RenderHtml
      source={{ html: props.source }}
      contentWidth={Dimensions.get('screen').width}
      tagsStyles={tagsStyles}
      systemFonts={systemFonts}
      baseStyle={tagsStyles.p}
    />
  )
}

export default HtmlRenderComponent;