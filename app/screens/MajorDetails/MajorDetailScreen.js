import React from 'react'
import { View, ScrollView } from 'react-native'
import { Text } from '../../components';

import CustomNavigationHeader from '../../components/shared/CustomNavigationHeader'
import BoldLabelComponent from '../../components/shared/BoldLabelComponent'
import MajorDetailAccordion from '../../components/MajorDetails/MajorDetailAccordion'
import {screenHorizontalPadding} from '../../constants/component_constant'
import CollegeMajor from '../../models/CollegeMajor';

const MajorDetailScreen = ({route}) => {
  const major = CollegeMajor.findByCode(route.params.major_code) || {};

  return (
    <View style={{flex: 1}}>
      <CustomNavigationHeader title={major.name} />

      <ScrollView>
        <Text style={{marginTop: 16, marginBottom: 8, paddingHorizontal: screenHorizontalPadding, color: '#000'}}>
          ការសិក្សាមុខវិជ្ជាថ្នាក់បរិញ្ញាបត្រ <BoldLabelComponent label={route.params.title} />៖
        </Text>
        <MajorDetailAccordion major={major} showRecommendation={route.params.showRecommendation} />
      </ScrollView>
    </View>
  )
}

export default MajorDetailScreen;
