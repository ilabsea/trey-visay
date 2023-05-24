import React, {useState} from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { Text } from '../../components';
import BoldLabelComponent from '../shared/BoldLabelComponent';
import HollandTestResultAccordionContent from './HollandTestResultAccordionContent';
import Color from '../../themes/color';
import {screenHorizontalPadding} from '../../constants/component_constant';
import {getStyleOfOS, getStyleOfDevice} from '../../utils/responsive_util';
import characteristics from './json/characteristics'
import { FontSetting } from '../../assets/style_sheets/font_setting';

const HollandTestResultCharacteristicAccordions = () => {
  const [statuses, setStatuses] = useState(new Array(characteristics.length))
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

  const onToggle = (index) => {
    const newStatuses = statuses
    newStatuses[index] = !statuses[index];
    setStatuses([...newStatuses])
  }

  const renderAccordion = () => {
    return characteristics.map((characteristic, index) => {
      return (
        <List.Accordion
          key={`accordion${index}`}
          title={renderAccordionTitle(characteristic)}
          style={[{ backgroundColor: Color.whiteColor, borderBottomWidth: 1, borderColor: Color.paleGray , paddingHorizontal: getStyleOfDevice(14, 6)}]}
          onPress={() => onToggle(index)}
          expanded={statuses[index]}
        >
          <HollandTestResultAccordionContent personality={characteristic.personality} impression={characteristic.impression} ability={characteristic.ability}/>
        </List.Accordion>
      )
    });
  }

  return (
    <React.Fragment>
      <Text style={{color: 'black', paddingHorizontal: screenHorizontalPadding}}>បុគ្គលិកលក្ខណៈរបស់អ្នកគឺស្ថិតក្នុងក្រុម</Text>
      <List.Section>
        { renderAccordion() }
      </List.Section>
    </React.Fragment>
  )
}

export default HollandTestResultCharacteristicAccordions