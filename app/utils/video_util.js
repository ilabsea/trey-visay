import {Platform} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import {heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {isShortScreenDevice} from './responsive_util'

const videoUtil = (() => {
  return {
    getIframeHeight
  }

  function getIframeHeight () {
    if (DeviceInfo.isTablet()) return hp('36%')

    if (Platform.OS === 'ios')
      return DeviceInfo.hasNotch() ? hp('25%') : hp('30%')

    return isShortScreenDevice() ? hp('31%') : hp('27%')
  }
})()

export default videoUtil