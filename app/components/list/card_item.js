import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import careersImages from '../../assets/images_js/careers_images';

const CardItem = (props) => {
  let width = props.width ? props.width : '38%';
  let height = props.height ? props.height : '18%';
  let item = props.item || {};
  let imageUrl = careersImages['default'];
  let imageRadius = props.borderRadiusOnlyOnTop ? {borderTopLeftRadius: 8, borderTopRightRadius: 8}: { borderRadius: 8 };
  if (!!item.image_name) { imageUrl = careersImages[item.image_name] }

  return(
    <TouchableOpacity
      style={[styles.btnBox, {width: wp(width), height: hp(height) + hp('10%'), overflow: 'hidden'}]}
      onPress={props.onPress} key={props.key}>
      <Image
        resizeMode="cover"
        style={[styles.btnImage, {width: wp(width), height: hp(height) }, imageRadius]}
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
