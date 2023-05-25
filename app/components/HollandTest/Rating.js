import React from 'react'
import { View, Image, TouchableHighlight } from 'react-native'
import Color from '../../themes/color';
import { Text } from '../../components';
import images from '../../assets/images';

const Rating = (props) => {
  const style = props.active ? {backgroundColor: 'pink'} : {};

  return (
    <View style={[{padding: 8, borderWidth: 1, borderRadius: 5, marginRight: 16, borderColor: Color.gray}, style]}>
      <Image
        source={ images[props.icon] }
        style={[{width: 50, height: 50}, props.style]}
      />
    </View>
  )
}

export default Rating
