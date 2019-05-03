import React, { Component } from 'react';
import { View,Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
import { Divider } from 'react-native-elements';

export default class CardView extends Component {
  render() {
    return (
      <View style={{marginLeft: 16, marginRight: 16}}>
        <Card key={this.props.key}>
          <CardItem header>
            <Text>{this.props.header}</Text>
          </CardItem>
          <Divider style={{marginLeft: 16, marginRight: 16}}/>
          <CardItem>
            <Body>
              {this.props.children}
            </Body>
          </CardItem>
       </Card>
     </View>
    );
  }
}
