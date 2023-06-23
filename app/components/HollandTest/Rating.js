import React from 'react'
import { View, Image } from 'react-native'
import Color from '../../themes/color';
import { Text } from '../../components';
import images from '../../assets/images';
import {isShortWidthScreen} from '../../utils/responsive_util';

const Rating = (props) => {
  const style = props.active ? {backgroundColor: 'rgba(24, 118, 211, 0.3)', borderColor: Color.blue, borderWidth: 3} : {};

  return (
    <View style={[{borderWidth: 1, borderRadius: 5, borderColor: Color.gray, height: 95, flexDirection: 'column'}, style]}>
      <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
        <Image source={ images[props.icon] } style={[{width: 50, height: 50}, props.style]} />
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 0}}>
        <Text style={{fontSize: isShortWidthScreen() ? 11 : 12, width: '100%', textAlign: 'center', lineHeight: 18, paddingHorizontal: 2}}>{props.label}</Text>
      </View>
    </View>
  )
}

export default Rating
