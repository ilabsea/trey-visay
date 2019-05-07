import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CardItem = (props) => {
  return(
    <TouchableOpacity style={styles.btnBox} onPress={props.onPress} key={props.key}>
      <View style={styles.btnImage} >
      </View>
      <View style={styles.textContainer}>
        <Text>{ props.text }</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btnBox: {
    backgroundColor: '#D0D0D0',
    borderRadius:16,
    height: hp('28%')
  },
  btnImage: {
    width: wp('45%'),
    height: hp('20%'),
    borderTopLeftRadius:16,
    borderTopRightRadius:16,
    backgroundColor: 'gray',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: wp('40%'),
    alignSelf: 'center'
  }
});

export default CardItem;
