import React from 'react';
import { View, Image } from 'react-native';

import { getStyleOfDevice } from '../../../../utils/responsive_util';
import tabletStyles from '../../../../assets/style_sheets/tablet/horizontalCardImageComponentStyles';
import mobileStyles from '../../../../assets/style_sheets/mobile/horizontalCardImageComponentStyles';

const styles = getStyleOfDevice(tabletStyles, mobileStyles);

const HorizontalCardImageComponent = (props) => {
  return (
    <View style={styles.container}>
    <Image source={props.image} resizeMode='center' style={styles.image} />
    </View>
  )
}

export default HorizontalCardImageComponent;
