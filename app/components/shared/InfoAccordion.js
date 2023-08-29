import React, {useState} from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { Text } from '..';
import Color from '../../themes/color';
import {getStyleOfOS, getStyleOfDevice} from '../../utils/responsive_util';
import { FontSetting } from '../../assets/style_sheets/font_setting';
import {screenHorizontalPadding} from '../../constants/component_constant';

const InfoAccordion = (props) => {
  const [statuses, setStatuses] = useState(new Array(props.items.length).fill(false))
  const onToggle = (index) => {
    const newStatuses = new Array(props.items.length).fill(false)
    newStatuses[index] = !statuses[index]
    setStatuses([...newStatuses])
  }

  const renderAccordionTitle = (item) => {
    return (
      <View style={[styles.titleContainer, props.titleContainerStyle]}>
        { !!props.accordionTitle ? props.accordionTitle(item) : <Text style={{color: Color.blackColor, fontSize: FontSetting.title}}>{item.title}</Text>}
      </View>
    )
  }

  const renderContent = (item) => {
    return <TouchableWithoutFeedback>
              <View style={[styles.contentContainer, props.contentContainerStyle]}>
                {props.accordionContent(item)}
              </View>
           </TouchableWithoutFeedback>
  }

  const renderAccordion = () => {
    return props.items.map((item, index) => {
      if (!!item) {
        return (
          <List.Accordion
            key={`accordion${index}`}
            title={renderAccordionTitle(item)}
            style={[styles.accordion, props.accordionStyle]}
            onPress={() => onToggle(index)}
            expanded={statuses[index]}
          >
            {renderContent(item)}
          </List.Accordion>
        )
      }
    });
  }

  return <List.Section>
            { renderAccordion() }
         </List.Section>
}

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: Color.whiteColor,
    borderBottomWidth: 1,
    borderColor: Color.paleGray ,
    paddingHorizontal: getStyleOfDevice(14, 6)
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: getStyleOfOS(6, 0),
    width: wp('75%'),
  },
  contentContainer: {
    backgroundColor: 'white',
    borderBottomWidth: getStyleOfOS(0.5, 2),
    borderColor: Color.paleGray,
    paddingHorizontal: screenHorizontalPadding,
    paddingVertical: 16
  }
})

export default InfoAccordion