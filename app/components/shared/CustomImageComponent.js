import React, {useState} from 'react';
import {Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from '../../themes/color';

const CustomImageComponent = (props) => {
  const [isError, setIsError] = useState(!props.source)
  const renderImage = () => {
    return <Image source={props.source} resizeMode={props.resizeMode}
            onError={() => setIsError(true)}
            style={props.style}
         />
  }

  if (isError && !props.source)
    return <View style={[{width: '100%', height: '100%', backgroundColor: Color.lightGrayColor, justifyContent: 'center', alignItems: 'center'}, props.emptyImageStyle]}>
              <Icon name='image' size={props.size || 22} color={Color.grayColor} />
           </View>

  return renderImage();
}

export default CustomImageComponent;