import React from 'react'
import {Animated} from 'react-native'

import Text from '../Text';
import scrollableHeaderUtil from '../../utils/scrollable_header_util';
import scrollHeaderStyles from '../../assets/style_sheets/scroll_header';

const ScrollableHeaderLargeTitle = (props) =>  {
  if (!props.largeTitle) {
    return null
  }

  const {headerMaxHeight, scrollY} = props
  return (
    <Animated.View
      style={[
        { transform: [{ translateY: scrollableHeaderUtil.getTitleScale(scrollY, headerMaxHeight) }] },
        { opacity: scrollableHeaderUtil.getOverlayOpacity(scrollY, headerMaxHeight) }
      ]}
    >
      <Text numberOfLines={1} style={[scrollHeaderStyles.largeTitlePosition, scrollHeaderStyles.largeTitle, {color: props.textColor}]}>{props.largeTitle}</Text>
    </Animated.View>
  )
}

export default ScrollableHeaderLargeTitle