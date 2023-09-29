import React from 'react';
import { View } from 'react-native';

import mainStyles from '../../assets/style_sheets/main/main';
import CustomImageComponent from '../shared/CustomImageComponent';
import DownloadedImage from '../../models/DownloadedImage';

const InstitutionDetailLogo = ({profileSize, schoolLogo}) => {
  const logo = DownloadedImage.getImagePath(schoolLogo)
  return (
    <View style={[mainStyles.boxShadow, {width: profileSize, height: profileSize, padding: 7, borderRadius: 8, backgroundColor: '#fff'}]}>
      <CustomImageComponent source={!!logo ? {uri: logo} : DownloadedImage.getLocalImage(schoolLogo)} style={{width: 106, height: 106}} resizeMode='contain' emptyImageStyle={{width: 106, height: 106}}/>
    </View>
  )
}

export default InstitutionDetailLogo