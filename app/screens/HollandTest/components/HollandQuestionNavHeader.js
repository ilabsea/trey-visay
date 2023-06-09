import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Appbar} from 'react-native-paper';

import {BackButton, Text} from '../../../components'
import ConfirmationModal from '../../../components/shared/ConfirmationModal';

import {goBack, reset} from '../../../hooks/RootNavigation'
import { FontSetting } from '../../../assets/style_sheets/font_setting';
import {FontFamily} from '../../../themes/font';
import Color from '../../../themes/color';
import {getStyleOfOS, getStyleOfDevice} from '../../../utils/responsive_util'

const CustomNavigationHeader = (props) => {
  const [modalVisible, setModalVisible] = React.useState(false)

  const renderConfirmation = () => {
    const message = (
      <React.Fragment>
        <Text>រាល់ចម្លើយដែលអ្នកបានជ្រើសរើសនឹងត្រូវបាត់បង់នៅពេលចាក់ចេញ។</Text>
        <Text style={{marginTop: 12}}>តើអ្នកពិតជាចង់ចាកចេញពីការតេស្តនេះមែន ឬទេ?</Text>
      </React.Fragment>
    )

    return <ConfirmationModal
              visible={modalVisible}
              leftButtonLabel='ទេ'
              rightButtonLabel='បាទ/ចាស'
              onLeftPress={() => setModalVisible(false)}
              onRightPress={() => reset({routeName: 'HomeTab', params: {}})}
              message={() => message}
              onDismiss={() => setModalVisible(false)}
            />
  }

  return (
    <React.Fragment>
      <Appbar.Header style={{backgroundColor: Color.blue}}>
        <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
          <BackButton onPress={() => !!props.onPressBack ? props.onPressBack() : goBack()} buttonColor={Color.whiteColor} />
          <Appbar.Content title='តេស្តបុគ្គលិកលក្ខណៈ' titleStyle={styles.title} numberOfLines={1} />
          <Appbar.Action icon="home" onPress={() => setModalVisible(true)} color={Color.whiteColor} size={getStyleOfOS(getStyleOfDevice(28, 24), 24)} />
        </View>
      </Appbar.Header>
      {renderConfirmation()}
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  title: {
    color: Color.whiteColor,
    fontFamily: FontFamily.regular,
    fontSize: FontSetting.nav_title,
  }
})

export default CustomNavigationHeader