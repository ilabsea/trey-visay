import React from 'react';
import { View, TouchableWithoutFeedback, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { Text, ScrollableHeader, FooterBar } from '../../components';
import MultiIntelligentResultBarChart from '../../components/MultiIntelligentResult/MultiIntelligentResultBarChart';
import MultiIntelligentResultListItems from '../../components/MultiIntelligentResult/MultiIntelligentResultListItems';
import {screenHorizontalPadding} from '../../constants/component_constant';
import {getStyleOfOS} from '../../utils/responsive_util';

const MultiIntelligentResultScreen = ({navigation}) => {
  const title = "លទ្ធផលតេស្តពហុបញ្ញា"
  let backHandler = null

  useFocusEffect(
    React.useCallback(() => {
      backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.popToTop()
        return true;
      })
      return () => !!backHandler && backHandler.remove()
    }, [])
  )

  const renderContent = () => {
    return (
      <TouchableWithoutFeedback>
        <View style={{marginBottom: 10}}>
          <View style={{paddingTop: 10, paddingHorizontal: screenHorizontalPadding}}>
            <Text style={{color: 'black', lineHeight: getStyleOfOS(30, 34)}}>ខាងក្រោមនេះ ជាលទ្ធផលតេស្ដរបស់អ្នក! សូមអ្នកឈ្វេងយល់ពីការពណ៌នាលម្អិតអំពី ទម្រង់បញ្ញារបស់អ្នកដូចខាងក្រោម៖</Text>
            <MultiIntelligentResultBarChart/>
          </View>
          <MultiIntelligentResultListItems navigation={navigation} />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <View style={{flex: 1}}>
      <ScrollableHeader
        renderContent={ renderContent }
        title={title}
        largeTitle={title}
        onPressBack={() => navigation.popToTop()}
      />
      <FooterBar icon='keyboard-arrow-right' text='ការផ្តល់អនុសាសន៍' onPress={() => navigation.navigate('MultiIntelligentRecommendationScreen')} />
    </View>
  )
}

export default MultiIntelligentResultScreen;