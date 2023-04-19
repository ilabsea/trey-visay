import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Appbar} from 'react-native-paper';

import {BackButton} from '..'
import {goBack} from '../../hooks/RootNavigation'
import { FontSetting } from '../../assets/style_sheets/font_setting';
import {FontFamily} from '../../themes/font';
import {navHeaderPaddingTop} from '../../constants/component_constant';

const CustomNavigationHeader = (props) => {
  return (
    <Appbar.Header style={[styles.header, props.headerStyle]}>
      <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
        <BackButton onPress={() => !!props.onPressBack ? props.onPressBack() : goBack()} />
        <Appbar.Content title={props.title} titleStyle={styles.title} numberOfLines={1} />
      </View>
      {props.children}
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    elevation: 1,
    flexDirection: 'column',
    height: 'auto',
    paddingBottom: 13,
    paddingTop: navHeaderPaddingTop
  },
  title: {
    color: 'black',
    fontFamily: FontFamily.regular,
    fontSize: FontSetting.nav_title,
  }
})

export default CustomNavigationHeader