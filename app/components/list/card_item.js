import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CardItem = (props) => {
  let width = props.width ? props.width : '38%';
  let height = props.height ? props.height : '18%';
  return(
    <TouchableOpacity
      style={[styles.btnBox, {width: wp(width), height: hp(height) + hp('10%')}]}
      onPress={props.onPress} key={props.key}>
      <Image
        resizeMode="stretch"
        style={[styles.btnImage, {width: wp(width), height: hp(height) }]}
        source={require('../../assets/images/careers/civil.png')}
      />
      <View style={[styles.textContainer, { width: wp(props.width) }]}>
        <Text>{ props.text }</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btnBox: {
    borderRadius:12,
    backgroundColor: 'white'
  },
  btnImage: {
    alignSelf: 'center'
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    alignSelf: 'center'
  }
});

export default CardItem;
