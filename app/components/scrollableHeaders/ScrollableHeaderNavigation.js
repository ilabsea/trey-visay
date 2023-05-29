import React from 'react'
import {Animated, StyleSheet} from 'react-native'

import scrollableHeaderUtil from '../../utils/scrollable_header_util'
import {getStyleOfOS} from '../../utils/responsive_util'
import {DEFAULT_HEADER_MIN_HEIGHT, IPHONE_HEADER_HEIGHT} from '../../constants/nav_header_constant'
import {navHeaderHorizontalPadding} from '../../constants/component_constant';

const ScrollableHeaderNavigation = (props) => {
  const getNavigationTranslate = () => {
    let distance = scrollableHeaderUtil.getHeaderScrollDistance(props.headerMaxHeight)
    // let z = Platform.OS === 'ios' ? -4 : -8

    return props.scrollY.interpolate({
      inputRange: [0, distance / 2, distance],
      // outputRange: [0, 0, z],
      outputRange: [0, 0, 0],
      extrapolate: 'clamp',
    });
  }

  if (!props.renderNavigation)
    return null

  return (
    <Animated.View
      style={[styles.bar,
        {
          transform: [{ translateY: getNavigationTranslate() }],
        },
      ]}
    >
      { props.renderNavigation() }
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  bar: {
    marginTop: IPHONE_HEADER_HEIGHT,
    backgroundColor: 'transparent',
    height: getStyleOfOS(84, DEFAULT_HEADER_MIN_HEIGHT),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    paddingHorizontal: navHeaderHorizontalPadding
  },
})

export default ScrollableHeaderNavigation