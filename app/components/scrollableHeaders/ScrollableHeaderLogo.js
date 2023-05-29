import React from 'react'
import {Animated, View} from 'react-native'

import scrollableHeaderUtil from '../../utils/scrollable_header_util'

const ScrollableHeaderLogo = (props) => {
  if (!!props.largeTitle || !props.renderLogo)
    return null

  return (
    <Animated.View
      style={[
        { transform: [{ translateY: 0 }]},
        { bottom: -scrollableHeaderUtil.getHeaderMaxHeight(props.headerMaxHeight) },
        { opacity: scrollableHeaderUtil.getOverlayOpacity(props.scrollY, props.headerMaxHeight) }
      ]}>

      <View style={{position: 'absolute', left: 20, right: 20, bottom: 0}}>
        { props.renderLogo() }
      </View>
    </Animated.View>
  )
}

export default ScrollableHeaderLogo