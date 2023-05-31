import {Platform} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import {IPHONE_HEADER_HEIGHT, DEFAULT_HEADER_MAX_HEIGHT, DEFAULT_HEADER_MIN_HEIGHT} from '../constants/nav_header_constant'
import {getStyleOfDevice} from './responsive_util'

const scrollableHeaderUtil = (() => {
  return {
    getHeaderMaxHeight,
    getHeaderScrollDistance,
    getOverlayOpacity,
    getInputRange,
    getOverlayTranslate,
    getTitleScale,
    getHeaderTranslate,
    getContentMarginTop
  }

  function getHeaderMaxHeight(headerMaxHeight) {
    if (headerMaxHeight) {
      return headerMaxHeight + IPHONE_HEADER_HEIGHT;
    }
    return DEFAULT_HEADER_MAX_HEIGHT;
  }

  function getHeaderScrollDistance(headerMaxHeight) {
    let margin = 9     // Android mobile and tablet margin
    if (Platform.OS === 'ios')
      margin = getStyleOfDevice(-14, DeviceInfo.hasNotch() ? -15 : -12)

    return getHeaderMaxHeight(headerMaxHeight) - (DEFAULT_HEADER_MIN_HEIGHT - margin)
  }

  function getOverlayOpacity(scrollY, headerMaxHeight) {
    const scrollDistance = getHeaderScrollDistance(headerMaxHeight)

    return scrollY.interpolate({
      inputRange: [0, scrollDistance / 2, scrollDistance],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
  }

  function getInputRange(headerMaxHeight) {
    return [0, getHeaderScrollDistance(headerMaxHeight)];
  }

  function getOverlayTranslate(scrollY, headerMaxHeight) {
    return scrollY.interpolate({
      inputRange: scrollableHeaderUtil.getInputRange(headerMaxHeight),
      outputRange: [0, DEFAULT_HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
  }

  function getTitleScale(scrollY, headerMaxHeight) {
    return scrollY.interpolate({
      inputRange: getInputRange(headerMaxHeight),
      outputRange: [getHeaderMaxHeight(headerMaxHeight), getHeaderScrollDistance(headerMaxHeight)],
      extrapolate: 'clamp',
    });
  }

  function getHeaderTranslate(scrollY, headerMaxHeight) {
    return scrollY.interpolate({
      inputRange: getInputRange(headerMaxHeight),
      outputRange: [0, -getHeaderScrollDistance(headerMaxHeight)],
      extrapolate: 'clamp',
    });
  }

  function getContentMarginTop(headerMaxHeight) {
    if (headerMaxHeight)
      return headerMaxHeight

    const iPhoneMargin = !DeviceInfo.hasNotch() ? 19 : 47
    return Platform.OS === 'ios' ? DEFAULT_HEADER_MAX_HEIGHT - getStyleOfDevice(24, iPhoneMargin) : DEFAULT_HEADER_MAX_HEIGHT
  }
})()

export default scrollableHeaderUtil