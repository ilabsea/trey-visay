import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Appbar} from 'react-native-paper';

import {BackButton} from '..'
import {goBack} from '../../hooks/RootNavigation'
import { FontSetting } from '../../assets/style_sheets/font_setting';
import {getStyleOfOS} from '../../utils/responsive_util';
import {navHeaderPaddingTop} from '../../constants/component_constant';

const CustomNavigationHeader = (props) => {
  return (
    <Appbar.Header style={styles.header}>
      <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
        <BackButton onPress={() => !!props.onPressBack ? props.onPressBack() : goBack()} />
        <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
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
    paddingBottom: 16,
    paddingTop: navHeaderPaddingTop
  },
  title: {
    color: 'black',
    fontSize: FontSetting.nav_title,
    marginTop: getStyleOfOS(0, -4),
    paddingHorizontal: 16,
  }
})

export default CustomNavigationHeader