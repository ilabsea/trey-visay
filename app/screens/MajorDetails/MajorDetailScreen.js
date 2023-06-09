import React from 'react'
import { View, ScrollView } from 'react-native'
import { Text } from '../../components';

import CustomNavigationHeader from '../../components/shared/CustomNavigationHeader'
import BoldLabelComponent from '../../components/shared/BoldLabelComponent'
import MajorDetailAccordion from '../../components/MajorDetails/MajorDetailAccordion'
import { FontSetting } from '../../assets/style_sheets/font_setting'
import {screenHorizontalPadding} from '../../constants/component_constant'
import majorHelper from '../../helpers/major_helper'

const MajorDetailScreen = ({route}) => {
  const major = majorHelper.findByCode(route.params.major_code) || {};

  return (
    <View style={{flex: 1}}>
      <CustomNavigationHeader title={route.params.title} />

      <ScrollView>
        <Text style={{marginTop: 16, marginBottom: 8, paddingHorizontal: screenHorizontalPadding, color: '#000'}}>
          ការសិក្សាមុខវិជ្ជាថ្នាក់បរិញ្ញាបត្រ <BoldLabelComponent label={route.params.title} />៖
        </Text>
        <MajorDetailAccordion major={major}/>
      </ScrollView>
    </View>
  )
}

export default MajorDetailScreen
