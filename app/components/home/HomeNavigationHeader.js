import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {Appbar} from 'react-native-paper';

import { FontSetting } from '../../assets/style_sheets/font_setting';
import {FontFamily} from '../../themes/font';
import {screenHorizontalPadding} from '../../constants/component_constant';
import MyStatusBar from '../shared/status_bar';

const HomeNavigationHeader = () => {
  return (
    <Appbar.Header style={[styles.header]}>
      <MyStatusBar/>
      <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
        <Image source={require('../../assets/images/logo.png')} style={{width: 40, height: 40, marginLeft: screenHorizontalPadding - 4}} />
        <Appbar.Content title='ត្រីវិស័យ' titleStyle={styles.title} numberOfLines={1} />
      </View>
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
  }
})

export default HomeNavigationHeader