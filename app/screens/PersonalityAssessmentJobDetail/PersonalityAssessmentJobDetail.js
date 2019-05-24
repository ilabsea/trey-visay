import React, { Component } from 'react';

import { View, Text } from 'react-native';
import { Container, Content, ListItem, Body, Card, CardItem, Right, Icon } from 'native-base';
import listStyles from '../../assets/style_sheets/list';
import te from '../../data/translates/km';
import ScrollableHeader from '../../components/scrollable_header';
import BackButton from '../../components/shared/back_button';

export default class PersonalityAssessmentJobDetail extends Component {
  _renderDescription = () => {
    let job = this.props.navigation.getParam('job');
    let arr = ['duty', 'working_environment', 'training_level', 'salary'];
    let doms = arr.map((item, index) => {
      return (<Text key={index}>{'\u2022' + " "} {te[item]}: {job[item]}</Text>);
    })

    return (
      <Content padder>
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
      </Content>
    );
  }


  render() {
    let title = 'ទំព័រលម្អិតពីអាជីព';
    return (
      <ScrollableHeader
        renderContent={ this._renderDescription }
        renderNavigation={ () => <BackButton navigation={this.props.navigation}/> }
        title={title}
        largeTitle={title}
      />
    )
  }
}
