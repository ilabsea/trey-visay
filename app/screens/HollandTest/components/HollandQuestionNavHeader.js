import React from 'react'
import {Animated, View, StyleSheet} from 'react-native'
import {Appbar} from 'react-native-paper';
import { useDispatch } from 'react-redux';

import {BackButton, Text, ProgressStep} from '../../../components'
import ConfirmationModal from '../../../components/shared/ConfirmationModal';
import HollandProgressArrow from './HollandProgressArrow';

import {goBack, reset} from '../../../hooks/RootNavigation'
import { FontSetting } from '../../../assets/style_sheets/font_setting';
import {FontFamily} from '../../../themes/font';
import Color from '../../../themes/color';
import {getStyleOfOS} from '../../../utils/responsive_util'
import { resetAnswer } from '../../../redux/features/quiz/hollandSlice';

const CustomNavigationHeader = (props) => {
  const [modalVisible, setModalVisible] = React.useState(false)
  const dispatch = useDispatch();

  const renderConfirmation = () => {
    const message = (
      <React.Fragment>
        <Text>រាល់ចម្លើយដែលអ្នកបានជ្រើសរើសនឹងត្រូវបាត់បង់នៅពេលចាក់ចេញ។</Text>
        <Text style={{marginTop: 12}}>តើអ្នកពិតជាចង់ចាកចេញពីការតេស្តនេះមែន ឬទេ?</Text>
      </React.Fragment>
    )

    const returnHome = () => {
      dispatch(resetAnswer());
      reset({routeName: 'HomeTab', params: {}})
    }

    return <ConfirmationModal
              visible={modalVisible}
              leftButtonLabel='ទេ'
              rightButtonLabel='បាទ/ចាស'
              onLeftPress={() => setModalVisible(false)}
              onRightPress={() => returnHome()}
              message={() => message}
              onDismiss={() => setModalVisible(false)}
            />
  }

  const progressArrowOpacity = props.scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  })

  const bigProgresStepOpacity = props.scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  })

  const bigProgressStepTranslateY = props.scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, -33],
    extrapolate: 'clamp',
  })

  const renderProgressIndicator = () => {
    return <Animated.View style={[{backgroundColor: Color.blue}, { transform: [{ translateY: bigProgressStepTranslateY }] }]}>
              <Animated.View style={{paddingHorizontal: 16, paddingTop: 6, opacity: bigProgresStepOpacity}}>
                <ProgressStep step={props.step}/>
              </Animated.View>
              <Animated.View style={{opacity: progressArrowOpacity, position: 'absolute', bottom: 0, left: 0, right: 0}}>
                <HollandProgressArrow step={props.step} />
              </Animated.View>
           </Animated.View>
  }

  return (
    <View style={styles.header}>
      <Appbar.Header style={styles.navigation}>
        <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
          <BackButton onPress={() => !!props.onPressBack ? props.onPressBack() : goBack()} buttonColor={Color.whiteColor} />
          <Appbar.Content title='តេស្តបុគ្គលិកលក្ខណៈ' titleStyle={styles.title} numberOfLines={1} />
          <Appbar.Action icon="home" onPress={() => setModalVisible(true)} color={Color.whiteColor} size={getStyleOfOS(28, 24)} />
        </View>
      </Appbar.Header>
      {renderProgressIndicator()}
      {renderConfirmation()}
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    color: Color.whiteColor,
    fontFamily: FontFamily.regular,
    fontSize: FontSetting.nav_title,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  navigation: {
    backgroundColor: Color.blue,
    elevation: 0,
    zIndex: 1,
  }
})

export default CustomNavigationHeader