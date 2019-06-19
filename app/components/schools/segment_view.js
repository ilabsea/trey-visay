import React, { Component } from 'react';
import { Container, Header, Left, Title, Body, Right, Button, Icon, Segment,
  Content, Text } from 'native-base';

import { Platform } from 'react-native';
import { Colors } from '../../assets/style_sheets/main/colors';

export default class SegmentView extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const headerStyle = Platform.OS == 'android' ? {backgroundColor: Colors.blue} : {}

    return (
      <Segment style={headerStyle}>
        <Button first active={this.props.activePage == 1}
          onPress={()=>this.props.setContent(1)}>
          <Text>សាលារដ្ឋ</Text>
        </Button>
        <Button active={this.props.activePage == 2}
          onPress={()=>this.props.setContent(2)}>
          <Text>សាលាឯកជន</Text>
        </Button>
        <Button active={this.props.activePage == 3} last
          onPress={()=>this.props.setContent(3)}>
          <Text>អង្គការ</Text>
        </Button>
      </Segment>
    );
  }
}
