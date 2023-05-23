import React, {useState} from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Text } from '../../components';
import BoldLabelComponent from '../shared/BoldLabelComponent';
import HollandTestResultAccordionContent from './HollandTestResultAccordionContent';
import Color from '../../themes/color';
import {screenHorizontalPadding} from '../../constants/component_constant';
import characteristics from './json/characteristics'

const HollandTestResultCharacteristicAccordions = () => {
  const [statuses, setStatuses] = useState(new Array(characteristics.length))
  const renderAccordionTitle = (characteristic) => {
    return (
      <View style={{flexDirection: 'row', width: wp('75%'), alignItems: 'center'}}>
        <View style={{width: 32, height: 32, borderColor: characteristic.color, borderWidth: 2, borderRadius: 6, marginRight: 10}}>
          <Text style={{color: characteristic.color, textAlign: 'center', lineHeight: 26, fontWeight: 'bold'}}>{characteristic.shortcut}</Text>
        </View>
        <BoldLabelComponent label={characteristic.label} />
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
          style={[{ backgroundColor: Color.whiteColor, borderBottomWidth: 1, borderColor: Color.paleGray }]}
          onPress={() => onToggle(index)}
          expanded={statuses[index]}
        >
          <HollandTestResultAccordionContent personality={characteristic.personality} impression={characteristic.impression} ability={characteristic.ability}/>
        </List.Accordion>
      )
    });
  }

  return (
    <View style={{marginTop: 4}}>
      <Text style={{color: 'black', paddingHorizontal: screenHorizontalPadding}}>បុគ្គលិកលក្ខណៈរបស់អ្នកគឺស្ថិតក្នុងក្រុម</Text>
      <List.Section>
        { renderAccordion() }
      </List.Section>
    </View>
  )
}

export default HollandTestResultCharacteristicAccordions