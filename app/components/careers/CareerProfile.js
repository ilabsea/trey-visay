import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Images from '../../assets/images_js/careers_images';
import mainStyles from '../../assets/style_sheets/main/main';

export default class CareerProfile extends Component  {
  render(){
    let career = this.props.career;
    let imageHeight = 120;
    let imageUrl = career.image_name ? Images[career.image_name] : Images.default;

    return (
      <View style={{alignItems: 'center'}}>
        <Image
          resizeMode="cover"
          style={{width: imageHeight, height: imageHeight, borderRadius: 8}}
          source={imageUrl}/>

        <Text style={[mainStyles.title, {marginTop: 8}]}>{career.name}</Text>
      </View>
    )
  }
}
