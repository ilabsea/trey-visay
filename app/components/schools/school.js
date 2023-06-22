import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { Divider } from 'react-native-paper';

import Text from '../Text';
import BoldLabelComponent from '../shared/BoldLabelComponent';
import CustomImageComponent from '../shared/CustomImageComponent';
import mainStyles from '../../assets/style_sheets/main/main';
import { FontSetting } from '../../assets/style_sheets/font_setting';
import {getStyleOfDevice, getStyleOfOS} from '../../utils/responsive_util';
import {arrowRightIconSize} from '../../constants/component_constant';
import DownloadedImage from '../../models/DownloadedImage';

class School extends Component {
  render() {
    const {school} = this.props
    const logo = DownloadedImage.getImagePath(school.logo)

    return (
      <View>
        <TouchableOpacity
          style={[mainStyles.btnList, {alignItems: 'center', paddingVertical: getStyleOfDevice(18, 12)}]}
          onPress={() => { this.props.navigation.navigate('InstitutionDetail', {school: school})} }
          >

          <View style={styles.imageContainer}>
            <CustomImageComponent source={!!logo ? {uri: logo} : null} style={styles.image} resizeMode='contain' emptyImageStyle={styles.image}/>
          </View>

          <View style={{flex: 1, marginLeft: 16, marginRight: 8, justifyContent: 'center'}}>
            <BoldLabelComponent label={school.name} numberOfLines={1} style={[mainStyles.title, styles.nameLabel]} />

            { this.props.showCategory &&
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../../assets/icons/building.png')}
                  resizeMode='contain'
                  style={{width: 16, height: 16, marginTop: getStyleOfOS(4, 0)}}
                />
                <Text style={[styles.schoolAddress, {marginTop: 5, color: 'rgb(74, 74, 74)'}]}>{school.category || 'មិនមាន'}</Text>
              </View>
            }

            <View style={styles.locationContainer}>
              <Image
                source={require('../../assets/icons/pin.png')}
                resizeMode='contain'
                style={{width: 16, height: 16, marginTop: getStyleOfOS(0, -4)}}
              />
              <Text numberOfLines={1} style={[styles.schoolAddress, {color: 'rgb(74, 74, 74)'}]}>{school.address || 'មិនមាន'}</Text>
            </View>
          </View>

          <View style={{ alignSelf: 'center'}}>
            <AwesomeIcon name='angle-right' size={arrowRightIconSize} color='#bbb'/>
          </View>
        </TouchableOpacity>
        <Divider/>
      </View>
    )
  }
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
    marginRight: 16,
    fontSize: FontSetting.sub_title
  },
  nameLabel: {
    fontSize: getStyleOfDevice(FontSetting.title, FontSetting.text),
    color: '#000000',
    marginTop: 4
  },
  locationContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  }
})

export default School;
