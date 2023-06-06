import React from 'react'
import { View, ScrollView } from 'react-native'
import { Text } from '../../components';

import CustomNavigationHeader from '../../components/shared/CustomNavigationHeader'
import BoldLabelComponent from '../../components/shared/BoldLabelComponent'
import MajorDetailAccordion from '../../components/MajorDetails/MajorDetailAccordion'
import { FontSetting } from '../../assets/style_sheets/font_setting'
import {screenHorizontalPadding} from '../../constants/component_constant'
import listMajors from '../MajorSelection/json/list_majors';

const MajorDetailScreen = ({route}) => {
  const major = listMajors.filter(x => x.code == route.params.major_code)[0] || {};

  return (
    <View style={{flex: 1}}>
      <CustomNavigationHeader title={major.name} />

      <ScrollView>
        <Text style={{marginTop: 16, marginBottom: 8, paddingHorizontal: screenHorizontalPadding, color: '#000'}}>
          ការសិក្សាមុខវិជ្ជាថ្នាក់បរិញ្ញាបត្រ <BoldLabelComponent label={major.name} />៖
        </Text>
        <MajorDetailAccordion major={major}/>
      </ScrollView>
    </View>
  )
}

export default MajorDetailScreen
