import React from 'react';
import { View, TouchableWithoutFeedback, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { Text, ScrollableHeader, FooterBar } from '../../components';
import MultiIntelligentResultBarChart from '../../components/MultiIntelligentResult/MultiIntelligentResultBarChart';
import MultiIntelligentResultListItems from '../../components/MultiIntelligentResult/MultiIntelligentResultListItems';
import {screenHorizontalPadding} from '../../constants/component_constant';
import {getStyleOfOS} from '../../utils/responsive_util';
import { reset } from '../../hooks/RootNavigation';
import IntelligentQuiz from '../../models/IntelligentQuiz';

const MultiIntelligentResultScreen = ({navigation, route}) => {
  const currentQuiz = useSelector((state) => state.currentIntelligentQuiz.value);
  const title = !!route.params && !!route.params.order ? `លទ្ធផលតេស្តលើកទី ${route.params.order}` : "លទ្ធផលតេស្តពហុបញ្ញា"
  let backHandler = null

  useFocusEffect(
    React.useCallback(() => {
      backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        reset({routeName: 'MultiIntelligentNavigator'})
        return true;
      })
      return () => !!backHandler && backHandler.remove()
    }, [])
  )

  const renderContent = () => {
    const quiz = !!currentQuiz ? currentQuiz : IntelligentQuiz.findByUuid(route.params.quizUuid);
    return (
      <TouchableWithoutFeedback>
        <View style={{marginBottom: 10}}>
          <View style={{paddingTop: 10, paddingHorizontal: screenHorizontalPadding}}>
            <Text style={{color: 'black', lineHeight: getStyleOfOS(30, 34)}}>ខាងក្រោមនេះ ជាលទ្ធផលតេស្ដរបស់អ្នក! សូមអ្នកឈ្វេងយល់ពីការពណ៌នាលម្អិតអំពី ទម្រង់បញ្ញារបស់អ្នកដូចខាងក្រោម៖</Text>
            <MultiIntelligentResultBarChart quiz={quiz}/>
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
        onPressBack={() => reset({routeName: 'MultiIntelligentNavigator'})}
      />
      <FooterBar icon='keyboard-arrow-right' text='ការផ្តល់អនុសាសន៍' onPress={() => navigation.navigate('MultiIntelligentRecommendationScreen')} />
    </View>
  )
}

export default MultiIntelligentResultScreen;