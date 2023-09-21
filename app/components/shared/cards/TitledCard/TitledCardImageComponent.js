import React from 'react';
import {View, StyleSheet, Image, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {getStyleOfDevice, isShortScreenDevice} from '../../../../utils/responsive_util'

const TitledCardImageComponent = (props) => {
  return <View style={{flex: 1.5}}>
            <Image source={props.image} style={styles.image} resizeMode='contain' />
         </View>
}

const styles = StyleSheet.create({
  image: {
    top: -46,
    zIndex: 1,
    alignSelf: 'center',
    ...Platform.select({
      android: {
        height: getStyleOfDevice(125, isShortScreenDevice() ? 80 : 85),
        width: isShortScreenDevice() ? '70%' : '75%',
      },
      ios: {
        height: getStyleOfDevice(125, DeviceInfo.hasNotch() ? 85 : 78),
        width: DeviceInfo.hasNotch() ? '75%' : '70%',
      }
    })
  }
});

export default TitledCardImageComponent;
