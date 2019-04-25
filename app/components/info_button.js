import React from 'react';
import { Platform, TouchableOpacity , Text} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const InfoButton = (props) => {
  return <TouchableOpacity
            style={{marginHorizontal: 16}}
            onPress={
              () => {
                props.navigation.navigate('Description', {
                  title: 'អំពី' + props.navigation.state.params.title || "ជំនាញវិជ្ជាជីវៈ",
                  content: props.navigation.state.params.content
                })
              }
            }>
            <MaterialIcon name='info' color='#fff' size={24} />
          </TouchableOpacity>;
}

export default InfoButton;
