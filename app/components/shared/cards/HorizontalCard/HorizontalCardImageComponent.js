import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { getStyleOfDevice } from '../../../../utils/responsive_util';
import tabletStyles from '../../../../assets/style_sheets/tablet/horizontalCardImageComponentStyles';
import mobileStyles from '../../../../assets/style_sheets/mobile/horizontalCardImageComponentStyles';

const styles = getStyleOfDevice(tabletStyles, mobileStyles);

const HorizontalCardImageComponent = (props) => {
  return (
    <View style={styles.container}>
      <View style={sts.imageContainer}>
        <Image source={props.image}
          resizeMode='center'
          style={styles.image}
        />
      </View>
    </View>
  )
}

const sts = StyleSheet.create({
  imageContainer: {
    width: 105,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default HorizontalCardImageComponent;
