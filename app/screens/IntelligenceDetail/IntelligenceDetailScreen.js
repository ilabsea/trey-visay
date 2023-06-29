import React from 'react'
import { View, ScrollView } from 'react-native'

import { Text } from '../../components';
import CustomNavigationHeader from '../../components/shared/CustomNavigationHeader'
import intelligenceTypes from '../../data/json/intelligence_types.json'
import BoldLabelComponent from '../../components/shared/BoldLabelComponent'
import IntelligenceDetailAccordion from '../../components/IntelligenceDetail/IntelligenceDetailAccordion'
import {screenHorizontalPadding} from '../../constants/component_constant'
// import Job from '../../models/Job';

const IntelligenceDetailScreen = ({route}) => {
  const intelligence = intelligenceTypes.filter(item => item.shortcut == route.params.shortcut)[0]

  // console.log('short cut = ', route.params.shortcut)

  return (
    <View style={{flex: 1}}>
      <CustomNavigationHeader title={intelligence.label} headerStyle={{zIndex: 1}} />

      <ScrollView>
        <Text style={{marginTop: 16, marginBottom: 8, paddingHorizontal: screenHorizontalPadding, color: '#000'}}>
          ទម្រង់នៃបញ្ញា និងរបៀបនៃការសិក្សា <BoldLabelComponent label={intelligence.label} />៖
        </Text>
        <IntelligenceDetailAccordion intelligence={intelligence} />
      </ScrollView>
    </View>
  )
}

export default IntelligenceDetailScreen
