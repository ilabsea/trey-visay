import React from 'react'
import {Animated, StyleSheet} from 'react-native'

import scrollableHeaderUtil from '../../utils/scrollable_header_util'
import {DEFAULT_HEADER_MAX_HEIGHT, DEFAULT_HEADER_COLOR} from '../../constants/nav_header_constant'

const ScrollableHeaderOverlay = (props) => {
  const getOverlayBgColor = () => {
    return props.overlayBgColor || props.backgroundColor || DEFAULT_HEADER_COLOR;
  }

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          height: scrollableHeaderUtil.getHeaderMaxHeight(props.headerMaxHeight),
          opacity: scrollableHeaderUtil.getOverlayOpacity(props.scrollY, props.headerMaxHeight),
          backgroundColor: getOverlayBgColor(),
          transform: [{ translateY: scrollableHeaderUtil.getOverlayTranslate(props.scrollY, props.headerMaxHeight) }],
        },
        props.headerStyle
      ]}
    />
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: DEFAULT_HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
    backgroundColor: DEFAULT_HEADER_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
})

export default ScrollableHeaderOverlay