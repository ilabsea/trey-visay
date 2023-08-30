import React from 'react'
import { View, ScrollView } from 'react-native'

import { Text } from '../../components';
import CustomNavigationHeader from '../../components/shared/CustomNavigationHeader'
import intelligenceTypes from '../../data/json/intelligence_types.json'
import BoldLabelComponent from '../../components/shared/BoldLabelComponent'
import IntelligentDetailAccordion from '../../components/IntelligentDetail/IntelligentDetailAccordion'
import {screenHorizontalPadding} from '../../constants/component_constant'

const IntelligentDetailScreen = ({route}) => {
  const intelligence = intelligenceTypes.filter(item => item.code == route.params.code)[0]
  return (
    <View style={{flex: 1}}>
      <CustomNavigationHeader title={intelligence.name_km} headerStyle={{zIndex: 1}} />

      <ScrollView>
        <Text style={{marginTop: 16, marginBottom: 8, paddingHorizontal: screenHorizontalPadding, color: '#000'}}>
          ទម្រង់នៃបញ្ញា និងរបៀបនៃការសិក្សា <BoldLabelComponent label={intelligence.name_km} />៖
        </Text>
        <IntelligentDetailAccordion intelligence={intelligence} />
      </ScrollView>
    </View>
  )
}

export default IntelligentDetailScreen
