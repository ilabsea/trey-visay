import React from 'react'
import {Animated, View} from 'react-native'

import scrollableHeaderUtil from '../../utils/scrollable_header_util'

const ScrollableHeaderForeground = (props) => {
  if (!!props.largeTitle || !!props.renderLogo || !props.renderForeground)
    return null

  return (
    <Animated.View
      style={[
        { transform: [{ translateY:scrollableHeaderUtil.getTitleScale(props.scrollY, props.headerMaxHeight) }] },
        { opacity: scrollableHeaderUtil.getOverlayOpacity(props.scrollY, props.headerMaxHeight) }
      ]}>

      <View style={{position: 'absolute', left: 20, right: 20, bottom: 10}}>
        { props.renderForeground() }
      </View>
    </Animated.View>
  )
}

export default ScrollableHeaderForeground