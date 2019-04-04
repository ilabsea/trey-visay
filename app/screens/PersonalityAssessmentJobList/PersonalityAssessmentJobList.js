import React, { Component } from 'react';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { View, StyleSheet, Text } from 'react-native';
import { Container, Content, ListItem, Left, Body, Icon, Right } from 'native-base';
import styles from '../../assets/style_sheets/list';
import majorList from '../../data/json/personality_major';
import characteristicList from '../../data/json/characteristic_jobs';

export default class PersonalityAssessmentJobList extends Component {
  _renderList() {
    let category = this.props.navigation.getParam('category');
    let id = category.group == 'science' ? 1 : 3;
    let jobs = characteristicList.find((obj) => obj.id == id).careers;

    let doms = jobs.map((job, index) => {
      return (
        <ListItem
          key={index}
          button
          onPress={() => {this.props.navigation.navigate('PersonalityAssessmentJobDetailScreen', {title: job.name, job: job})}}
          >
          <Body>
            <Text>{job.name}</Text>
          </Body>
          <Right>
            <Icon active name="arrow-forward" />
          </Right>
        </ListItem>
      )
    });

    return (
      <View>
        <ListItem itemDivider><Text>អ្នកដែលស្ថិតក្នុងក្រុមមនុស្សដែលមានប្រភេទបុគ្គលិកលក្ខណៈបែប{category.name_km}គួរចាប់យកអាជីពការងារជា៖</Text></ListItem>
        { doms }
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Content>
          { this._renderList() }
        </Content>
      </Container>
    );
  }
}
