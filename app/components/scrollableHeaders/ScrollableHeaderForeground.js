import React from 'react'
import {Animated, View} from 'react-native'

import scrollableHeaderUtil from '../../utils/scrollable_header_util'

const ScrollableHeaderForeground = (props) => {
  if (!!props.largeTitle || !!props.renderLogo || !props.renderForeground)
    return null

  return (
    <Animated.View
      style={[
        { opacity: scrollableHeaderUtil.getOverlayOpacity(props.scrollY, props.headerMaxHeight) },
        {position: 'relative', top: 56, position: 'absolute', width: '100%'}
      ]}
    >
      <View style={{width: '100%'}}>
        { props.renderForeground() }
      </View>
    </Animated.View>
  )
}

export default ScrollableHeaderForeground