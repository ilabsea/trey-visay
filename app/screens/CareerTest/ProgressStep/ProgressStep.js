import React, { Component } from 'react';
import {
  View,
  Image,
} from 'react-native';
import scrollHeaderStyles from '../../../assets/style_sheets/scroll_header';
import { Container, Content, Icon } from 'native-base';
import { Colors } from '../../../assets/style_sheets/main/colors';

export default class ProgressStep extends Component {
  _renderIcon(image, index) {
    let iconStyle = this.props.progressIndex == index ? {} : scrollHeaderStyles.inactiveIcon;

    return (
      <View key={index}>
        { this.props.progressIndex > index &&
          <View style={[scrollHeaderStyles.numberWrapper, scrollHeaderStyles.doneIconWrapper]} >
            <View style={[scrollHeaderStyles.doneIcon]}>
              <Icon name='checkmark' style={{fontSize: 12, color: Colors.blue}} />
            </View>
          </View>
        }

        <View style={scrollHeaderStyles.numberWrapper} key={index}>
          <View style={[scrollHeaderStyles.numberIcon, iconStyle]}>
            <Image source={image.url} style={[image.style, {resizeMode: 'cover'}]}/>
          </View>
        </View>
      </View>
    )
  }

  _renderLine(key) {
    return (
      <View style={scrollHeaderStyles.line} key={key}></View>
    )
  }

  render() {
    let arr = [
      {url: require('../../../assets/images/career_tests/subject.png'), style: {width: 20, height: 20}},
      {url: require('../../../assets/images/career_tests/personality.png'), style: {width: 16, height: 20}},
      {url: require('../../../assets/images/career_tests/careers.png'), style: {width: 20, height: 20}},
      {url: require('../../../assets/images/career_tests/goal_career.png'), style: {width: 22, height: 22}},
      {url: require('../../../assets/images/career_tests/done.png'), style: {width: 20, height: 20}}
    ];

    let doms = [];

    for(let i=0; i<arr.length; i++) {
      doms.push(this._renderIcon(arr[i], i));

      if (i != arr.length-1) {
        let key = arr.length + i + 1;
        doms.push(this._renderLine(key))
      }
    }

    return (
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 18}}>
        { doms }
      </View>
    )
  }
}
