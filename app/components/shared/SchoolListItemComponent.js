import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import Text from '../Text';
import CustomImageComponent from './CustomImageComponent';
import BoldLabelComponent from './BoldLabelComponent';
import mainStyles from '../../assets/style_sheets/main/main';
import {FontSetting} from '../../assets/style_sheets/font_setting';
import DownloadedImage from '../../models/DownloadedImage';
import {getStyleOfDevice, getStyleOfOS} from '../../utils/responsive_util';
import color from '../../themes/color';

const CATEGORIES = { public: 'សាលារដ្ឋ', private: 'សាលាឯកជន', ngo: 'អង្គការ', default: '' }

const SchoolListItemComponent = (props) => {
  const navigation = useNavigation();
  const {school} = props;
  const logo = DownloadedImage.getImagePath(school.logo)

  return (
    <View>
      <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 12}}
        onPress={() => navigation.navigate('InstitutionDetail', {school: school})}
      >
        <View style={styles.imageContainer}>
          <CustomImageComponent source={!!logo ? {uri: logo} : null} style={styles.image} resizeMode='contain' emptyImageStyle={styles.image}/>
        </View>

        <View style={{flex: 1, marginLeft: 16, marginRight: 8}}>
          <BoldLabelComponent label={school.name} numberOfLines={1} style={[mainStyles.title, styles.nameLabel]} />
          { (props.showCategory && CATEGORIES[school.category]) &&
            <View style={{flexDirection: 'row', marginTop: 2}}>
              <AwesomeIcon name='building-o' color={color.pressable} size={14} style={{marginTop: 3}} />
              <Text style={styles.schoolAddress}>{CATEGORIES[school.category] || 'មិនមាន'}</Text>
            </View>
          }

          <View style={{flexDirection: 'row'}}>
            <AwesomeIcon name='map-marker' color={color.pressable} size={18} />
            <Text numberOfLines={1} style={styles.schoolAddress}>{school.address || 'មិនមាន'}</Text>
          </View>
        </View>
        <View><AwesomeIcon name='angle-right' size={24} color='#bbb' style={{flexGrow: 1, verticalAlign: 'middle'}} /></View>
      </TouchableOpacity>
      <Divider />
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 4,
    borderColor: 'rgb(151,151, 151)',
  },
  image: {
    width: getStyleOfDevice(getStyleOfOS(75, 65), 50),
    height: getStyleOfDevice(getStyleOfOS(75, 65), 50),
    borderRadius: 8
  },
  schoolAddress: {
    marginLeft: 8,
    fontSize: FontSetting.sub_title,
    lineHeight: 26
  },
  nameLabel: {
    fontSize: getStyleOfDevice(FontSetting.title, FontSetting.text),
    color: '#000000',
    marginTop: 4
  },
})

export default SchoolListItemComponent;