import React, { Component } from 'react';

import { View, Text } from 'react-native';
import { Container, Content, ListItem, Body, Card, CardItem } from 'native-base';
import listStyles from '../../assets/style_sheets/list';

export default class MajorDetail extends Component {

  render() {
    let major = this.props.navigation.getParam('major');
    let conditions = (major.conditions || '').split(';');
    let doms = conditions.map((text, index) => {
      return (<Text key={index}>{'\u2022' + " "} {text}</Text>);
    })

    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem bordered>
              <Text>{major.description}</Text>
            </CardItem>

            <CardItem>
              <Body>
                { doms }
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
