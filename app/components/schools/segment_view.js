import React, { Component } from 'react';
import {View, TouchableOpacity} from 'react-native';

import { FontSetting } from '../../assets/style_sheets/font_setting';
import {pressableItemSize} from '../../constants/component_constant';
import Color from '../../themes/color';
import Text from '../Text';

export default class SegmentView extends Component {
  constructor(props){
    super(props);
  }

  renderLabel(label) {
    return <Text style={{fontSize: FontSetting.text}}>{label}</Text>
  }

  segmentButton(label, value, style) {
    const activeStyle = {
      text: {color: Color.whiteColor},
      button: {backgroundColor: Color.pressable}
    }
    const nonActiveStyle = {
      text: {color: Color.pressable},
      button: {backgroundColor: Color.white}
    }
    return (
      <TouchableOpacity onPress={() => this.props.setContent(value)}
        style={[{flex: 1, justifyContent: 'center', alignItems: 'center'}, style, this.props.activePage == value ? activeStyle.button : nonActiveStyle.button]}
      >
        <Text style={this.props.activePage == value ? activeStyle.text : nonActiveStyle.text}>{label}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{flexDirection: 'row', width: '58%', borderWidth: 1, borderRadius: 6, borderColor: Color.pressable, height: pressableItemSize, marginTop: 4}}>
        {this.segmentButton('ឧត្ដមសិក្សា', 1)}
        {this.segmentButton('TVET', 2)}
      </View>
    )
  }
}