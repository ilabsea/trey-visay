import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {getStyleOfDevice} from '../../../../utils/responsive_util'

const TitledCardImageComponent = (props) => {
  return <View style={{flex: 1.5}}>
            <Image source={props.image} style={styles.image} resizeMode='contain' />
         </View>
}

const styles = StyleSheet.create({
  image: {
    height: getStyleOfDevice(125, 115),
    width: '100%',
    top: -46,
    zIndex: 1,
    borderColor: 'black',
  }
});

export default TitledCardImageComponent;
