import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Images from '../../assets/images_js/careers_images';
import mainStyles from '../../assets/style_sheets/main/main';
import { FontSetting } from '../../assets/style_sheets/font_setting';

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

        <Text style={{marginTop: 8, fontSize: FontSetting.nav_title, textAlign: 'center'}}>{career.name}</Text>
      </View>
    )
  }
}
