import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Text from '../Text';
import Images from '../../assets/images_js/careers_images';
import { FontSetting } from '../../assets/style_sheets/font_setting';
import DownloadedImage from '../../models/DownloadedImage';

export default class CareerProfile extends Component  {
  render(){
    let imageHeight = 120;
    const imagePath = DownloadedImage.getImagePath(this.props.career.logo)

    return (
      <View style={{alignItems: 'center'}}>
        <Image
          resizeMode="cover"
          style={{width: imageHeight, height: imageHeight, borderRadius: 8}}
          source={imagePath ? {uri: imagePath} : Images.default}
        />
        <View style={{minHeight: 60, justifyContent: 'center', paddingHorizontal: 16}}>
          <Text style={{fontSize: FontSetting.nav_title, textAlign: 'center'}}>{this.props.career.name}</Text>
        </View>
      </View>
    )
  }
}
