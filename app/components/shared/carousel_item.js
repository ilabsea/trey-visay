import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

const CarouselItem = (props) =>  {
  let style = props.noStyle ? '' : { paddingLeft: 28 };
  let itemWidth = props.width ? wp(props.width) : wp('45%');
  let activeSlideAlignment = props.activeSlideAlignment ? props.activeSlideAlignment: 'start';
  let enableSnap = props.enableSnap ? props.enableSnap : false;
  return(
    <Carousel
      data={props.data}
      renderItem={props.renderItem}
      sliderWidth={width}
      itemWidth={itemWidth}
      activeSlideAlignment={activeSlideAlignment}
      inactiveSlideOpacity={1}
      inactiveSlideScale={1}
      onSnapToItem={props.onSnapToItem}
      layout={'default'}
      enableSnap={enableSnap}
      containerCustomStyle={style}
      removeClippedSubviews={false}
    />
  )
}

export default CarouselItem;
