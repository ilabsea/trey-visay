import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Appbar} from 'react-native-paper';

import {BackButton} from '..'
import { FontSetting } from '../../assets/style_sheets/font_setting';
import {FontFamily} from '../../themes/font';
import {navHeaderPaddingTop} from '../../constants/component_constant';
import {getStyleOfOS} from '../../utils/responsive_util';

const CustomNavigationHeader = (props) => {
  const headerStyle = () => {
    let style = {}
    if (props.children || props.showStyleWithChild)
      style = props.children ? {...styles.headerWithChild, paddingTop: getStyleOfOS(10, 13)} : styles.headerWithChild

    return style
  }

  return (
    <Appbar.Header style={[styles.header, headerStyle(), props.headerStyle]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <BackButton onPress={props.onPressBack} buttonColor={props.buttonColor} />
        <Appbar.Content title={props.title} titleStyle={styles.title} numberOfLines={1} />
        { props.rightButton && props.rightButton() }
      </View>
      {props.children}
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    elevation: 1,
  },
  title: {
    color: 'black',
    fontFamily: FontFamily.regular,
    fontSize: FontSetting.nav_title,
  },
  headerWithChild: {
    flexDirection: 'column',
    height: 'auto',
    paddingBottom: 13,
    paddingTop: navHeaderPaddingTop,
    zIndex: 1
  }
})

export default CustomNavigationHeader