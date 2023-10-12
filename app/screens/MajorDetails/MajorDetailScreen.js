import React, {useEffect} from 'react'
import { View, ScrollView } from 'react-native'
import { Text } from '../../components';

import CustomNavigationHeader from '../../components/shared/CustomNavigationHeader'
import BoldLabelComponent from '../../components/shared/BoldLabelComponent'
import MajorDetailAccordion from '../../components/MajorDetails/MajorDetailAccordion'
import {screenHorizontalPadding} from '../../constants/component_constant'
import Major from '../../models/Major';
import visitService from '../../services/visit_service';

const MajorDetailScreen = ({route}) => {
  const major = route.params.major_id ? Major.findById(route.params.major_id) || {} : Major.findByCode(route.params.major_code) || {};

  useEffect(() => {
    visitService.recordVisitDetailScreen('major', major.id)
  }, []);

  return (
    <View style={{flex: 1}}>
      <CustomNavigationHeader title={major.name} />

      <ScrollView>
        <Text style={{marginTop: 16, marginBottom: 8, paddingHorizontal: screenHorizontalPadding, color: '#000'}}>
          ការសិក្សាមុខវិជ្ជាថ្នាក់បរិញ្ញាបត្រ <BoldLabelComponent label={route.params.title} />៖
        </Text>
        <MajorDetailAccordion major={major} showRecommendation={route.params.showRecommendation} hideSchoolList={route.params.hide_school_list} />
      </ScrollView>
    </View>
  )
}

export default MajorDetailScreen;
