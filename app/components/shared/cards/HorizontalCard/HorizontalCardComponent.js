import React from 'react';
import {View} from 'react-native';
import {Card} from 'react-native-paper';
import Text from '../../../Text';

import HorizontalCardImageComponent from './HorizontalCardImageComponent';
import { getStyleOfDevice } from '../../../../utils/responsive_util';
import tabletStyles from '../../../../assets/style_sheets/tablet/horizontalCardComponentStyles';
import mobileStyles from '../../../../assets/style_sheets/mobile/horizontalCardComponentStyles';
import BoldLabelComponent from '../../BoldLabelComponent';
import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = getStyleOfDevice(tabletStyles, mobileStyles);

const HorizontalCardComponent = (props) => {
  const onPress = () => {
    !!props.onPress && props.onPress()
  }

  return (
    <Card style={[styles.container, props.containerStyle]} onPress={() => onPress()} >
      <View style={{flexDirection: 'row', height: '100%'}}>
        <HorizontalCardImageComponent image={props.item.source_image} />
        <View style={styles.labelContainer}>
          <BoldLabelComponent label={props.item.title} numberOfLines={2} style={styles.title} />
        </View>
        <View style={styles.rightBtnContainer}>
          <Text style={styles.startLabel}>ចាប់ផ្តើម</Text>
          <Icon name="chevron-right" size={24} style={styles.arrowIcon}/>
        </View>
      </View>
    </Card>
  )
}

export default HorizontalCardComponent;
