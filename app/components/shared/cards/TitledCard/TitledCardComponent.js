import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Card, Text} from 'react-native-paper';

import BoldLabelComponent from '../../BoldLabelComponent';
import TiltedCardImageComponent from './TitledCardImageComponent';
import { getStyleOfDevice } from '../../../../utils/responsive_util';
import tabletStyles from '../../../../assets/style_sheets/tablet/titledCardComponentStyles';
import mobileStyles from '../../../../assets/style_sheets/mobile/titledCardComponentStyles';

const styles = getStyleOfDevice(tabletStyles, mobileStyles);

const TitledCardComponent = (props) => {
  const onPress = () => {
    !!props.onPress && props.onPress()
  }

  const decorateRoundConorView =() => {
    return (
      <View>
        <View style={styles.tiltedView} />
        <View style={styles.secondTiltedView} />
      </View>
    )
  }

  return (
    <Card mode="elevated" elevation={2} style={[styles.container, props.containerStyle]}
      onPress={() => onPress()}
    >
      { decorateRoundConorView() }

      <View style={styles.backgroundContainer}>
        <View style={styles.infoContainer}>
          <TiltedCardImageComponent image={props.item.source_image} />
          <View style={styles.titleContainer}>
            <BoldLabelComponent label={props.item.title} numberOfLines={2} style={styles.title} />
          </View>
        </View>
      </View>
    </Card>
  );
}

export default TitledCardComponent;
