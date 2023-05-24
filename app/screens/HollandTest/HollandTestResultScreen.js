import React from 'react';
import { View } from 'react-native';

import { Text, BackButton, ScrollableHeader, FooterBar } from '../../components';
import HollandTestResultBarChart from '../../components/HollandTestResult/HollandTestResultBarChart';
import HollandTestResultCharacteristicAccordions from '../../components/HollandTestResult/HollandTestResultCharacteristicAccordions';
import HollandTestResultOptionsBottomSheet from '../../components/HollandTestResult/HollandTestResultOptionsBottomSheet';
import BottomSheetModalComponent from '../../components/shared/BottomSheetModalComponent';
import {screenHorizontalPadding} from '../../constants/component_constant';
import {hollandTestResultOptionsSnapPoints} from '../../constants/modal_constant';
import {getStyleOfOS} from '../../utils/responsive_util';

const HollandTestResult = ({navigation}) => {
  const modalRef = React.useRef();
  const title = "តេស្តបុគ្គលិកលក្ខណៈ"
  const renderContent = () => {
    return (
      <View style={{marginBottom: 10}}>
        <View style={{paddingTop: 10, paddingHorizontal: screenHorizontalPadding}}>
          <Text style={{color: 'black', lineHeight: getStyleOfOS(30, 34)}}>ខាងក្រោមនេះ ជាលទ្ធផលតេស្ដរបស់អ្នក! សូមអ្នកឈ្វេងយល់ពីការពណ៌នាលម្អិតអំពីបុគ្គលិកលក្ខណៈរបស់អ្នកដូចខាងក្រោម </Text>
          <HollandTestResultBarChart/>
        </View>
        <HollandTestResultCharacteristicAccordions/>
      </View>
    )
  }

  const showOptionsBottomSheet = () => {
    modalRef.current?.setContent(<HollandTestResultOptionsBottomSheet/>)
    modalRef.current?.present()
  }

  return (
    <View style={{flex: 1}}>
      <ScrollableHeader
        renderContent={ renderContent }
        renderNavigation={ () => <BackButton onPress={() => navigation.popToTop()} /> }
        title={title}
        largeTitle={title}
      />
      <FooterBar icon='keyboard-arrow-right' text='បន្តជ្រើសរើសជំនាញសិក្សា ឬអាជីពការងារ' onPress={() => showOptionsBottomSheet()} />
      <BottomSheetModalComponent ref={modalRef} snapPoints={hollandTestResultOptionsSnapPoints} />
    </View>
  )
}

export default HollandTestResult;