import React, { Component } from 'react';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { View, StyleSheet, Text } from 'react-native';
import { Container, Content, ListItem, Left, Body, Icon, Right } from 'native-base';
import styles from '../../assets/style_sheets/list';
import majorList from '../../data/json/personality_major';

export default class PersonalityAssessmentMajorList extends Component {
  _onPressItem(major) {
    if (!major.basic_knowledge) { return; }

    this.props.navigation.navigate('MajorDetailScreen', {title: major.name_km, major: major})
  }

  _renderMajorList() {
    let category = this.props.navigation.getParam('category');
    let majors = majorList.filter(obj => category.majors.includes(obj.code));

    let doms = majors.map((major, index) => {
      return (
        <ListItem
          key={index}
          button
          onPress={() => this._onPressItem(major)}
          >
          <Body>
            <Text>{major.name_km}</Text>
          </Body>
          <Right>
            { !!major.basic_knowledge && <AwesomeIcon name='angle-right' size={24} color='#bbb' /> }
          </Right>
        </ListItem>
      )
    });

    return (
      <View>
        <ListItem itemDivider><Text>ជំនាញសិក្សានៅសាកលវិទ្យាល័យ</Text></ListItem>
        <Text style={{paddingHorizontal: 16}}>អ្នកដែលស្ថិតក្នុងក្រុមមនុស្សដែលមានប្រភេទបុគ្គលិកលក្ខណៈបែប{category.name_km}គួរជ្រើសយកការសិក្សាលើមុខជំនាញពាក់ព័ន្ធដូចជា៖</Text>
        { doms }
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Content>
          { this._renderMajorList() }
        </Content>
      </Container>
    );
  }
}
