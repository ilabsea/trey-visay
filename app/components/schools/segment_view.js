import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { Container, Header, Left, Title, Body, Right, Button, Icon, Segment,
  Content, Text } from 'native-base';

  import { SegmentedButtons } from 'react-native-paper';

import { Platform } from 'react-native';
import { Colors } from '../../assets/style_sheets/main/colors';
import { FontSetting } from '../../assets/style_sheets/font_setting';
import {pressableItemSize} from '../../constants/component_constant';
import {getStyleOfOS} from '../../utils/responsive_util';

const borderRadius = 6
export default class SegmentView extends Component {
  constructor(props){
    super(props);
  }

  renderLabel(label) {
    return <Text style={{fontSize: FontSetting.text}}>{label}</Text>
  }

  render() {
    return (
      <Segment style={{marginTop: 12}}>
        <Button first active={this.props.activePage == 1} onPress={()=>this.props.setContent(1)}
          style={[styles.button, {borderTopLeftRadius: borderRadius, borderBottomLeftRadius: borderRadius}]}
        >
          <Text style={{fontSize: FontSetting.text, marginTop: getStyleOfOS(2, -2)}}>ឧត្ដមសិក្សា</Text>
        </Button>
        <Button last active={this.props.activePage == 2} onPress={()=>this.props.setContent(2)}
          style={[styles.button, {borderTopRightRadius: borderRadius, borderBottomRightRadius: borderRadius}]}
        >
          <Text style={{fontSize: FontSetting.text}}>TVET</Text>
        </Button>
      </Segment>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    height: pressableItemSize,
    justifyContent: 'center',
    minWidth: 110
  }
})