import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const NextButton = (props) => {
  return(
    <TouchableOpacity onPress={() => props.navigation.state.params.goNext()} style={{marginHorizontal: 16}}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: '#fff'}}>{props.text || "បន្តទៀត"}</Text>
        <MaterialIcon name={props.icon || 'keyboard-arrow-right'} color='#fff' size={24} />
      </View>
    </TouchableOpacity>
  )
}

export default NextButton;
