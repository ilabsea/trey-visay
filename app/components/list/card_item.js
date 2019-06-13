import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Images from '../../assets/images';

const CardItem = (props) => {
  let width = props.width ? props.width : '38%';
  let height = props.height ? props.height : '18%';
  let item = props.item || {};
  let imageUrl = require('../../assets/images/careers/default.png');
  if (!!item.image) { imageUrl = Images[item.image] }

  return(
    <TouchableOpacity
      style={[styles.btnBox, {width: wp(width), height: hp(height) + hp('10%')}]}
      onPress={props.onPress} key={props.key}>
      <Image
        resizeMode="cover"
        style={[styles.btnImage, {width: wp(width), height: hp(height), borderRadius: 8 }]}
        source={imageUrl}
      />

      <View style={[styles.textContainer, { width: wp(props.width) }]}>
        <Text numberOfLines={2}>{ props.text }</Text>
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
    padding: 8,
    alignSelf: 'center'
  }
});

export default CardItem;
