import React, { Component } from 'react';

import { View, Text } from 'react-native';
import { Container, Content, ListItem, Body, Card, CardItem } from 'native-base';
import listStyles from '../../assets/style_sheets/list';

export default class PersonalityAssessmentJobDetail extends Component {

  render() {
    let job = this.props.navigation.getParam('job');

    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem bordered>
              <Text>{job.description}</Text>
            </CardItem>

          </Card>
        </Content>
      </Container>
    );
  }
}
