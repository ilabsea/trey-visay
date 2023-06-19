import React from 'react';
import {StyleSheet, View} from 'react-native';
import { Button } from 'react-native-paper';

import Color from '../../../themes/color';
import {FontFamily} from '../../../themes/font';
import {FontSetting} from '../../../assets/style_sheets/font_setting';
import {pressableItemSize, buttonBorderRadius} from '../../../constants/component_constant';

const ConfirmationModalButtons = (props) => {
  const renderButton = (label, mode, onPress, style) => {
    return <Button mode={mode} style={[styles.btn, style]} onPress={() => onPress()} textColor={mode == 'outlined' ? Color.pressable : Color.whiteColor}
              labelStyle={{fontFamily: FontFamily.regular, fontWeight: 'normal', fontSize: FontSetting.text}}
              contentStyle={{minWidth: 70, height: pressableItemSize}}
           >
              {label}
           </Button>
  }

  return <View style={styles.container}>
            { !!props.leftButtonLabel && renderButton(props.leftButtonLabel, 'outlined', props.onLeftPress, {marginRight: 16, borderColor: Color.pressable, borderWidth: 1.5}) }
            { !!props.rightButtonLabel && renderButton(props.rightButtonLabel, 'contained', props.onRightPress, {backgroundColor: Color.pressable}) }
          </View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btn: {
    alignItems: 'center',
    borderRadius: buttonBorderRadius,
    justifyContent: 'center',
  }
});

export default ConfirmationModalButtons;