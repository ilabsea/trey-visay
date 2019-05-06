import React, { Component } from 'react';

import { View, Text } from 'react-native';
import { Container, Content, ListItem, Body, Card, CardItem, Right, Icon } from 'native-base';
import listStyles from '../../assets/style_sheets/list';
import te from '../../data/translates/km';

export default class PersonalityAssessmentJobDetail extends Component {
  _renderDescription() {
    let job = this.props.navigation.getParam('job');
    let arr = ['duty', 'working_environment', 'training_level', 'salary'];
    let doms = arr.map((item, index) => {
      return (<Text key={index}>{'\u2022' + " "} {te[item]}: {job[item]}</Text>);
    })

    return (
      <Card>
        <CardItem header bordered>
          <Text>{job.short_description}</Text>
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
