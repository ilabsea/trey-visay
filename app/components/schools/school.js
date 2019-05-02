import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet , LoadingIndicator} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { Divider } from 'react-native-elements';

import Images from '../../assets/images';
import mainStyles from '../../assets/style_sheets/main/main';
import { FontSetting } from '../../assets/style_sheets/font_setting';

class School extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let school = this.props.school;
    let i = this.props.index;

    let logo = require('../../assets/images/schools/default.png');
    if (!!school.logoName) {
      logo = Images[school.logoName];
    }
    return (
      <View key={i}>
        <TouchableOpacity
          style={mainStyles.btnList}
          onPress={() => { this.props.navigation.navigate('InstitutionDetail', {school: school})} }
          >

          <Image source={logo} style={styles.image} />

          <View style={{flex: 1, marginLeft: 16, marginRight: 8}}>
            <Text numberOfLines={1} style={mainStyles.title}>
              {school.universityName}
            </Text>

            { this.props.showCategory &&
              <View style={{flexDirection: 'row'}}>
                <AwesomeIcon name='building-o' color='#1976d2' size={16} />
                <Text style={styles.schoolAddress}>{school.category || 'មិនមាន'}</Text>
              </View>
            }

            <View style={{flexDirection: 'row'}}>
              <AwesomeIcon name='map-marker' color='#1976d2' size={18} />
              <Text numberOfLines={1} style={styles.schoolAddress}>{school.address || 'មិនមាន'}</Text>
            </View>
          </View>

          <View style={{justifyContent: 'center'}}>
            <AwesomeIcon name='angle-right' size={24} color='#bbb' />
          </View>
        </TouchableOpacity>
        <Divider style={{marginLeft: 80}}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50
  },
  schoolAddress: {
    marginLeft: 8,
    fontSize: FontSetting.sub_title
  }
})

export default School;
