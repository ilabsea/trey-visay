import React from 'react';
import { StyleSheet,View } from 'react-native';
import {Button} from 'react-native-paper';

import {screenHorizontalPadding} from '../../constants/component_constant';
import { FontSetting } from '../../assets/style_sheets/font_setting';
import {FontFamily} from '../../themes/font';
import Color from '../../themes/color';

const FooterBar = (props) => {
  return (
    <View style={styles.container}>
      <Button onPress={props.onPress} style={styles.button}
        labelStyle={{fontSize: FontSetting.button_text, fontFamily: FontFamily.regular, color: 'white', marginBottom: 8}}
      >
        {props.text}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopWidth: 0.2,
    borderColor: Color.footerBorder,
    height: 66,
    justifyContent: 'center',
    paddingHorizontal: screenHorizontalPadding,
    width: '100%',
  },
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Color.pressable,
    borderRadius: 10,
    width: '100%',
    height: 48
  },
})

export default FooterBar;
