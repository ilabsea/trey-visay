import React, {useEffect} from 'react';
import { View, TouchableWithoutFeedback, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { Text, ScrollableHeader, FooterBar } from '../../components';
// import HollandTestResultBarChart from '../../components/HollandTestResult/HollandTestResultBarChart';
import MultiIntelligentResultBarChart from '../../components/MultiIntelligentResult/MultiIntelligentResultBarChart';
import MultiIntelligentResultListItems from '../../components/MultiIntelligentResult/MultiIntelligentResultListItems';
// import HollandTestResultCharacteristicAccordions from '../../components/HollandTestResult/HollandTestResultCharacteristicAccordions';
import HollandTestResultOptionsBottomSheet from '../../components/HollandTestResult/HollandTestResultOptionsBottomSheet';
import BottomSheetModalComponent from '../../components/shared/BottomSheetModalComponent';
import {screenHorizontalPadding} from '../../constants/component_constant';
import {hollandTestResultOptionsSnapPoints} from '../../constants/modal_constant';
import {getStyleOfOS} from '../../utils/responsive_util';
import { useSelector } from 'react-redux';

const MultiIntelligentResultScreen = ({navigation}) => {
  const currentQuiz = useSelector((state) => state.currentQuiz.value);
  const modalRef = React.useRef();
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
            <MultiIntelligentResultBarChart quiz={currentQuiz}/>
          </View>
          <MultiIntelligentResultListItems navigation={navigation} />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const showOptionsBottomSheet = () => {
    modalRef.current?.setContent(<HollandTestResultOptionsBottomSheet navigation={navigation} modalRef={modalRef} quiz={currentQuiz}/>)
    modalRef.current?.present()
  }

  return (
    <View style={{flex: 1}}>
      <ScrollableHeader
        renderContent={ renderContent }
        title={title}
        largeTitle={title}
        onPressBack={() => navigation.popToTop()}
      />
      <FooterBar icon='keyboard-arrow-right' text='បន្តជ្រើសរើសជំនាញសិក្សា ឬអាជីពការងារ' onPress={() => showOptionsBottomSheet()} />
      <BottomSheetModalComponent ref={modalRef} snapPoints={hollandTestResultOptionsSnapPoints} />
    </View>
  )
}

export default MultiIntelligentResultScreen;