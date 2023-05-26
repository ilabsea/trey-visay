import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

import {BackButton} from '..'
import SegmentView from './segment_view'
import {goBack} from '../../hooks/RootNavigation'
import { FontSetting } from '../../assets/style_sheets/font_setting';
import {getStyleOfOS} from '../../utils/responsive_util';
import {navheaderPaddingTop} from '../../constants/component_constant';

const SchoolNavigationHeader = (props) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <BackButton onPress={() => goBack()} />
        <Text numberOfLines={1} style={styles.title}>គ្រឹះស្ថានសិក្សា</Text>
      </View>
      <SegmentView activePage={props.activePage} setContent={(active) => props.setContent(active)}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    backgroundColor: 'white',
    paddingBottom: 16,
    paddingTop: navheaderPaddingTop,
    borderBottomColor: '#ccc',
  },
  title: {
    color: 'black',
    fontSize: FontSetting.nav_title,
    marginTop: getStyleOfOS(0, -4),
    paddingHorizontal: 16,
  }
})

export default SchoolNavigationHeader