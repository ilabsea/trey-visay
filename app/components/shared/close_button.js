import React from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';

const DEFAULT_BUTTON_COLOR='#fff';

const CloseButton = (props) => {
  const route = useRoute();

  const getButtonColor = () => {
    return props.buttonColor || DEFAULT_BUTTON_COLOR
  }

  return <TouchableOpacity
            onPress={() => { route.params._handleBack();}}
            style={{marginHorizontal: 16, width: 30}}>

          <MaterialIcon name='close' color={getButtonColor()} size={28} />
        </TouchableOpacity>;
}

export default CloseButton;
