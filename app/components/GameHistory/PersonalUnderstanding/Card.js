import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import mainStyles from '../../../assets/style_sheets/main/main';
import { Divider } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../../assets/style_sheets/main/colors';
import Text from '../../Text';

const Card = (props) => {
  return(
    <View style={[mainStyles.curveBox, { marginTop: 20 }]}>
      <Text style={mainStyles.sectionTextInBox}>
        {props.question}
      </Text>

      <Divider />

      <View style={{flexDirection: 'row', marginLeft: 0, margin: 16}}>
        { !props.noIcon &&
          <AwesomeIcon name='check-square'
            size={24} color={Colors.blue} style={{marginRight: 8}} />
        }
        <Text>{props.response}</Text>
      </View>
      { props.children }
    </View>
  )
}

export default Card;
