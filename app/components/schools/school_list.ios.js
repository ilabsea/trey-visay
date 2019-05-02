import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';

import School from './school';

import Images from '../../assets/images';
import mainStyles from '../../assets/style_sheets/main/main';
import { FontSetting} from '../../assets/style_sheets/font_setting';

class SchoolListView extends Component {

  renderSchool(school, i) {
    return (
      <School school={school} index={i} showCategory={true}/>
    )
  }

  render(){
    return (
      <View style={mainStyles.box}>
        { this.props.data.map((school, i) => this.renderSchool(school,i))
        }
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
    fontSize: FontSetting.sub_title
  }
})

export default SchoolListView;
