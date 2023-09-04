import React from 'react'
import {Animated, StyleSheet, View} from 'react-native'
import * as Progress from 'react-native-progress';

import Text from '../Text'
import ScrollableHeaderOverlay from './ScrollableHeaderOverlay'
import ScrollableHeaderLargeTitle from './ScrollableHeaderLargeTitle'
import ScrollableHeaderLogo from './ScrollableHeaderLogo'
import ScrollableHeaderForeground from './ScrollableHeaderForeground'
import {DEFAULT_HEADER_MAX_HEIGHT, DEFAULT_HEADER_MIN_HEIGHT, DEFAULT_HEADER_COLOR, NAVIGATION_BUTTON_WIDTH, DEFAULT_TEXT_COLOR} from '../../constants/nav_header_constant'
import {navHeaderBigTitleHorizontalPadding} from '../../constants/component_constant'
import scrollableHeaderUtil from '../../utils/scrollable_header_util'
import {getStyleOfOS, getStyleOfDevice} from '../../utils/responsive_util'
import { FontSetting } from '../../assets/style_sheets/font_setting'

const ScrollableHeaderMain = (props) => {
  const bgColor = props.backgroundColor || DEFAULT_HEADER_COLOR;

  const getTextColor = () => {
    return props.textColor || DEFAULT_TEXT_COLOR;
  }

  const renderTitle = () => {
    if (!!props.title)
      return (
        <View style={styles.titleWrapper}>
          <Text numberOfLines={1} style={[styles.title, {color: getTextColor()}]}>{props.title}</Text>
        </View>
      )
  }

  const renderProgress = () => {
    if (!!props.enableProgressBar && props.progressValue > -1) {
      return <View style={{position: 'absolute', left: 0, right: 0, bottom: -4}}>
                <Progress.Bar progress={props.progressValue} borderRadius={0} width={null} color='#4caf50' unfilledColor='rgb(19, 93, 153)' borderColor='transparent' />
             </View>
    }
  }

  const renderOverlay = () => {
    return <ScrollableHeaderOverlay
              scrollY={props.scrollY}
              headerMaxHeight={props.headerMaxHeight}
              backgroundColor={props.backgroundColor}
              overlayBgColor={props.overlayBgColor}
              headerStyle={props.headerStyle}
           />
  }

  const renderLargeTitle = () => {
    return <ScrollableHeaderLargeTitle largeTitle={props.largeTitle} scrollY={props.scrollY} headerMaxHeight={props.headerMaxHeight} textColor={getTextColor()} />
  }

  const renderLogo = () => {
    return <ScrollableHeaderLogo scrollY={props.scrollY} headerMaxHeight={props.headerMaxHeight} largeTitle={props.largeTitle} renderLogo={props.renderLogo} />
  }

  const renderForeground = () => {
    return <ScrollableHeaderForeground scrollY={props.scrollY} headerMaxHeight={props.headerMaxHeight} largeTitle={props.largeTitle} renderForeground={props.renderForeground} />
  }

  return (
    <Animated.View
      style={[
        styles.header,
        { height: scrollableHeaderUtil.getHeaderMaxHeight(props.headerMaxHeight)},
        { backgroundColor: bgColor, transform: [{ translateY: scrollableHeaderUtil.getHeaderTranslate(props.scrollY, props.headerMaxHeight) }] },
        props.headerStyle,
      ]}
    >
      { renderTitle() }
      { renderProgress() }
      { renderOverlay() }
      { renderLargeTitle() }
      { renderLogo() }
      { renderForeground() }
    </Animated.View>
  )
}

const iosTitleBottom = getStyleOfDevice(6, 12)
const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
    height: DEFAULT_HEADER_MAX_HEIGHT,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: navHeaderBigTitleHorizontalPadding
  },
  titleWrapper: {
    position: 'absolute',
    left: NAVIGATION_BUTTON_WIDTH,
    // right: NAVIGATION_BUTTON_WIDTH,
    bottom: getStyleOfOS(iosTitleBottom, -5),
    justifyContent: 'center',
    height: getStyleOfOS('auto', DEFAULT_HEADER_MIN_HEIGHT),
  },
  title: {
    fontSize: FontSetting.nav_title,
    color: DEFAULT_TEXT_COLOR,
    paddingHorizontal: 16,
    paddingTop: 3,
    textAlign: getStyleOfOS('center', 'left'),
  },
})

export default ScrollableHeaderMain