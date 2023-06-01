import React, {useState} from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { Text } from '../../components';
import BoldLabelComponent from '../shared/BoldLabelComponent';
import InfoAccordion from '../shared/InfoAccordion';
import HollandTestResultAccordionContent from './HollandTestResultAccordionContent';
import Color from '../../themes/color';
import {screenHorizontalPadding} from '../../constants/component_constant';
import {getStyleOfOS, getStyleOfDevice} from '../../utils/responsive_util';
import characteristicList from './json/characteristics'
import { FontSetting } from '../../assets/style_sheets/font_setting';
import { useSelector } from 'react-redux'

const HollandTestResultCharacteristicAccordions = ({quiz}) => {
  const hollandScores = quiz.sortedHollandScore;
  const personalityTypes = hollandScores.map(c => c[0]);
  const characteristics = personalityTypes.map(a => characteristicList.filter(o => o.shortcut == a)[0]);

  const renderAccordionTitle = (characteristic) => {
    return (
      <View style={{flexDirection: 'row', width: wp('75%'), alignItems: 'center', paddingTop: getStyleOfOS(6, 0)}}>
        <View style={{width: 32, height: 32, borderColor: characteristic.color, borderWidth: 2, borderRadius: 6, marginRight: 10}}>
          <Text style={{color: characteristic.color, textAlign: 'center', lineHeight: 26, fontWeight: 'bold'}}>{characteristic.shortcut}</Text>
        </View>
        <BoldLabelComponent label={characteristic.label} style={{fontSize: FontSetting.title}} />
      </View>
    )
  }

  const renderContent = (characteristic) => {
    return <HollandTestResultAccordionContent personality={characteristic.personality} impression={characteristic.impression} ability={characteristic.ability}/>
  }

  return (
    <React.Fragment>
      <Text style={{color: 'black', paddingHorizontal: screenHorizontalPadding}}>បុគ្គលិកលក្ខណៈរបស់អ្នកគឺស្ថិតក្នុងក្រុម</Text>
      <InfoAccordion
        items={characteristics}
        accordionTitle={renderAccordionTitle}
        accordionContent={renderContent}
      />
    </React.Fragment>
  )
}

export default HollandTestResultCharacteristicAccordions
