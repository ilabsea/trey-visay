import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import {Button} from 'native-base';

import Text from '../Text';
import Color from '../../themes/color';
import {pressableItemSize, buttonBorderRadius} from '../../constants/component_constant';

const CongratulationModal = (props) => {
  const renderMessage = () => {
    return <View>
              <Image source={require('../../assets/images/success.png')} style={{width: 100, height: 100}}/>
              {props.description()}
           </View>
  }

  const renderButton = () => {
    return <Button style={styles.btn}>
              <Text>ការផុ្តល់អនុសាសន៍</Text>
           </Button>
  }

  return (
    <Portal>
      <Modal
        visible={props.visible}
        onDismiss={props.onDismiss}
        contentContainerStyle={styles.container}
      >
        {renderMessage()}
        {renderButton()}
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
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

export default CongratulationModal