import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native';
import scrollHeaderStyles from '../../assets/style_sheets/scroll_header';
import { Content, Icon } from 'native-base';
import { Colors } from '../../assets/style_sheets/main/colors';

export default class ProgressStep extends Component {
  _renderNumberIcon(image, step) {
    let iconStyle = this.props.step == step ? {} : scrollHeaderStyles.inactiveIcon;

    return (
      <View key={step}>
        { this.props.step > step &&
          <View style={[scrollHeaderStyles.numberWrapper, scrollHeaderStyles.doneIconWrapper]} >
            <View style={[scrollHeaderStyles.doneIcon]}>
              <Icon name='checkmark' style={{fontSize: 12, color: Colors.blue}} />
            </View>
          </View>
        }

        <View style={scrollHeaderStyles.numberWrapper} key={step}>
          <View style={[scrollHeaderStyles.numberIcon, iconStyle]}>
            <Text style={scrollHeaderStyles.iconText}>{step}</Text>
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
    let arr = [1, 2, 3, 4, 5, 6];
    let doms = [];

    for(let i=0; i<arr.length; i++) {
      let step = i + 1;
      doms.push(this._renderNumberIcon(arr[i], step));

      if (i != arr.length-1) {
        let key = arr.length + step + 1;
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
