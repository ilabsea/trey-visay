import React, {Component} from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-paper';

import Text from '../Text';
import CustomImageComponent from '../shared/CustomImageComponent';
import BoldLabelComponent from '../shared/BoldLabelComponent';
import mainStyles from '../../assets/style_sheets/main/main';
import {FontSetting} from '../../assets/style_sheets/font_setting';
import DownloadedImage from '../../models/DownloadedImage';

const CATEGORIES = { public: 'សាលារដ្ឋ', private: 'សាលាឯកជន', ngo: 'អង្គការ', default: '' }

class SchoolListView extends Component {
  renderSchool(school, i) {
    const logo = DownloadedImage.getImagePath(school.logo)
    return (
      <View key={i}>
        <TouchableOpacity style={{paddingTop: 10, paddingBottom: 6, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center'}} onPress={() => this.props.navigation.navigate('InstitutionDetail', {school: school})}>
          <CustomImageComponent source={!!logo ? {uri: logo} : null} style={styles.image} resizeMode='contain' emptyImageStyle={styles.image}/>

          <View style={{flex: 1, marginLeft: 16, marginRight: 8}}>
            <BoldLabelComponent label={school.name} numberOfLines={1} style={mainStyles.title} />

            { CATEGORIES[school.category] &&
              <View style={{flexDirection: 'row'}}>
                <AwesomeIcon name='building-o' color='#1976d2' size={14} style={{marginTop: 3}} />
                <Text style={styles.schoolAddress}>{CATEGORIES[school.category] || 'មិនមាន'}</Text>
              </View>
            }

            <View style={{flexDirection: 'row'}}>
              <AwesomeIcon name='map-marker' color='#1976d2' size={18} />
              <Text numberOfLines={1} style={styles.schoolAddress}>{school.address || 'មិនមាន'}</Text>
            </View>
          </View>
          <View><AwesomeIcon name='angle-right' size={24} color='#bbb' style={{flexGrow: 1, verticalAlign: 'middle'}} /></View>
        </TouchableOpacity>
        <Divider />
      </View>
    )
  }

  render(){
    return (
      <View style={mainStyles.box}>
        { this.props.data.map((school, i) => this.renderSchool(school,i))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70
  },
  schoolAddress: {
    marginLeft: 8,
    fontSize: FontSetting.sub_title,
    lineHeight: 26
  }
})

export default SchoolListView;
