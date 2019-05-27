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

          <View style={styles.imageContainer}>
            <Image source={logo} style={styles.image} />
          </View>

          <View style={{flex: 1, marginLeft: 16, marginRight: 8}}>
            <Text numberOfLines={1} style={mainStyles.title}>
              {school.universityName}
            </Text>

            { this.props.showCategory &&
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../../assets/icons/building.png')}
                  resizeMode='contain'
                  style={{width: 16, height: 16}}
                />
                <Text style={styles.schoolAddress}>{school.category || 'មិនមាន'}</Text>
              </View>
            }

            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../assets/icons/pin.png')}
                resizeMode='contain'
                style={{width: 16, height: 16}}
              />
              <Text numberOfLines={1} style={[styles.schoolAddress, {color: 'rgb(74, 74, 74)'}]}>{school.address || 'មិនមាន'}</Text>
            </View>
          </View>

          <View style={{ alignSelf: 'center'}}>
            <AwesomeIcon name='angle-right' size={24} color='#bbb'/>
          </View>
        </TouchableOpacity>
        <Divider style={{marginLeft: 90}}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 4,
    borderColor: 'rgb(151,151, 151)'
  },
  image: {
    width: 50,
    height: 50
  },
  schoolAddress: {
    marginLeft: 8,
    marginRight: 16,
    fontSize: FontSetting.sub_title
  }
})

export default School;
