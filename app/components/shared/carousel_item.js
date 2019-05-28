import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

const CarouselItem = (props) =>  {
  let itemWidth = props.width ? wp(props.width) : wp('45%');
  return(
    <View style={{paddingLeft: 16}}>
      <Carousel
        data={props.data}
        renderItem={props.renderItem}
        sliderWidth={width}
        itemWidth={itemWidth}
        activeSlideAlignment='start'
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        onSnapToItem={props.onSnapToItem}
      />
    </View>
  )
}

export default CarouselItem;
