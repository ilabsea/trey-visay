import React, { Component } from 'react';

import { View, Text } from 'react-native';
import { Container, Content, ListItem, Body, Card, CardItem, Right, Icon } from 'native-base';
import listStyles from '../../assets/style_sheets/list';

export default class PersonalityAssessmentJobDetail extends Component {
  _renderDescription() {
    let job = this.props.navigation.getParam('job');
    let description3 = (job.description3 || '').split(';');
    let doms = description3.map((text, index) => {
      return (<Text key={index}>{'\u2022' + " "} {text}</Text>);
    })

    if (!job.description2) {
      return (null)
    }

    return (
      <Card>
        <CardItem header bordered>
          <Text>{job.description2}</Text>
        </CardItem>

        <CardItem>
          <Body>
            { doms }
          </Body>
        </CardItem>
      </Card>
    );
  }

  render() {
    return (
      <Container>
        <Content padder>
          { this._renderDescription() }
        </Content>
      </Container>
    );
  }
}
