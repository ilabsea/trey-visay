import React from 'react'
import {StyleSheet} from 'react-native'
import DeviceInfo from 'react-native-device-info'

import CustomNavigationHeader from '../shared/CustomNavigationHeader'
import {getStyleOfOS, getStyleOfDevice} from '../../utils/responsive_util'

const ScrollableHeaderNavigation = (props) => {
  if (!props.renderNavigation)
    return null

  return <CustomNavigationHeader headerStyle={styles.bar} buttonColor={props.buttonColor}/>
}

const iosTop = getStyleOfDevice(29, DeviceInfo.hasNotch() ? 56 : 26)
const styles = StyleSheet.create({
  bar: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: getStyleOfOS(iosTop, 0),
    left: 0,
    right: 0,
    zIndex: 100,
  }
})

export default ScrollableHeaderNavigation