import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import mainStyles from '../../../assets/style_sheets/main/main';
import { Divider } from 'react-native-elements';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

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
            size={24} color='rgb(17, 130, 254)' style={{marginRight: 8}} />
        }
        <Text>{props.response}</Text>
      </View>
      { props.children }
    </View>
  )
}

export default Card;
