import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'native-base';

import Text from '../../Text';
import Color from '../../../themes/color';
import {pressableItemSize, buttonBorderRadius} from '../../../constants/component_constant';

const ConfirmationModalButtons = (props) => {
  const renderButton = (label, onPress, style) => {
    return <Button style={[styles.btn, style]} onPress={() => onPress()}>
              <Text style={{color: Color.whiteColor}}>{label}</Text>
           </Button>
  }

  return <View style={styles.container}>
            { !!props.leftButtonLabel && renderButton(props.leftButtonLabel, props.onLeftPress, {marginRight: 22}) }
            { !!props.rightButtonLabel && renderButton(props.rightButtonLabel, props.onRightPress) }
          </View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btn: {
    alignItems: 'center',
    backgroundColor: Color.pressable,
    borderRadius: buttonBorderRadius,
    justifyContent: 'center',
    height: pressableItemSize,
    minWidth: pressableItemSize,
    paddingHorizontal: 12
  }
});

export default ConfirmationModalButtons;