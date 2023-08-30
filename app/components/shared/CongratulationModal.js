import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import {Button} from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Text from '../Text';
import Color from '../../themes/color';
import {pressableItemSize, buttonBorderRadius, cardBorderRadius} from '../../constants/component_constant';
import {isShortScreenDevice} from '../../utils/responsive_util';

const CongratulationModal = (props) => {
  const renderMessage = () => {
    return <View style={{flex: 1}}>
              <Image source={require('../../assets/images/congratulations.gif')} style={{width: wp('80%'), height: wp('52%'), alignSelf: 'center', marginBottom: 16, marginTop: -10}} resizeMode='contain' />
              {props.message()}
           </View>
  }

  const renderButton = () => {
    return <Button style={styles.btn} onPress={() => props.onPressButton()}>
              <Text style={{color: Color.whiteColor}}>ការផុ្តល់អនុសាសន៍</Text>
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
  container: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: cardBorderRadius,
    justifyContent: 'flex-start',
    padding: 24,
    width: '90%',
    height: hp(isShortScreenDevice() ? '68%' : '62%')
  },
  btn: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Color.pressable,
    borderRadius: buttonBorderRadius,
    justifyContent: 'center',
    height: pressableItemSize,
    minWidth: pressableItemSize,
    paddingHorizontal: 12,
    width: '70%'
  }
});

export default CongratulationModal