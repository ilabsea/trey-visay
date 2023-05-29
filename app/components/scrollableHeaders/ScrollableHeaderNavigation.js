import React from 'react'
import {StyleSheet} from 'react-native'

import CustomNavigationHeader from '../shared/CustomNavigationHeader'
import {getStyleOfOS} from '../../utils/responsive_util'

const ScrollableHeaderNavigation = (props) => {
  if (!props.renderNavigation)
    return null

  return <CustomNavigationHeader headerStyle={styles.bar}/>
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: getStyleOfOS(20, 0),
    left: 0,
    right: 0,
    zIndex: 100,
  }
})

export default ScrollableHeaderNavigation