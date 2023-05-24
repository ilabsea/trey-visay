import React, {useState} from 'react';
import { View } from 'react-native';

import { Text, BackButton, ScrollableHeader, FooterBar } from '../../components';
import HollandTestResultBarChart from '../../components/HollandTestResult/HollandTestResultBarChart';
import HollandTestResultCharacteristicAccordions from '../../components/HollandTestResult/HollandTestResultCharacteristicAccordions';
import {screenHorizontalPadding} from '../../constants/component_constant';
import {getStyleOfOS} from '../../utils/responsive_util';

const HollandTestResult = ({navigation}) => {
  const title = "តេស្តបុគ្គលិកលក្ខណៈ"
  const renderContent = () => {
    return (
      <View style={{marginBottom: 10}}>
        <View style={{paddingTop: 10, paddingHorizontal: screenHorizontalPadding}}>
          <Text style={{color: 'black', lineHeight: getStyleOfOS(30, 32)}}>ខាងក្រោមនេះ ជាលទ្ធផលតេស្ដរបស់អ្នក! សូមអ្នកឈ្វេងយល់ពីការពណ៌នាលម្អិតអំពីបុគ្គលិកលក្ខណៈរបស់អ្នកដូចខាងក្រោម </Text>
          <HollandTestResultBarChart/>
        </View>
        <HollandTestResultCharacteristicAccordions/>
      </View>
    )
  }

  const showOptionsBottomSheet = () => {

  }

  return (
    <View style={{flex: 1}}>
      <ScrollableHeader
        renderContent={ renderContent }
        renderNavigation={ () => <BackButton onPress={() => navigation.popToTop()} /> }
        title={title}
        largeTitle={title}
      />
      <FooterBar icon='keyboard-arrow-right' text='បន្តជ្រើសរើសជំនាញសិក្សា ឬអាជីពការងារ' onPress={() => {}} />
    </View>
  )
}

export default HollandTestResult;