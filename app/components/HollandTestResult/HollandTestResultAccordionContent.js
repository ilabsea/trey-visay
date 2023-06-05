import React from 'react';
import { View } from 'react-native';

import { Text } from '../../components';
import Color from '../../themes/color';
import { FontSetting } from '../../assets/style_sheets/font_setting';

const HollandTestResultAccordionContent = (props) => {
  const renderContent = () => {
    const sections = [
      {title: 'បុគ្គលិកលក្ខណៈ', description: props.personality},
      {title: 'គុណតម្លៃ និងចំណាប់អារម្មណ៍ផ្ទាល់ខ្លួន', description: props.impression},
      {title: 'ជំនាញ និងសមត្ថភាព', description: props.ability}
    ]

    return sections.map((section, index) => {
      return (
        <View key={index}>
          <Text style={{fontSize: FontSetting.small_text, marginTop: index == 0 ? 6 : 10, marginBottom: -4, color: Color.grayColor}}>{section.title}</Text>
          <Text style={{color: 'black'}}>{section.description}</Text>
        </View>
      )
    })
  }

  return renderContent()
}

export default HollandTestResultAccordionContent