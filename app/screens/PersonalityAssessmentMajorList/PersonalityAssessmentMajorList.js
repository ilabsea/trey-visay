import React, { Component } from 'react';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Content, ListItem, Left, Body, Icon, Right, Card, CardItem } from 'native-base';
import majorList from '../../data/json/personality_major';
import styles from '../../assets/style_sheets/assessment';

export default class PersonalityAssessmentMajorList extends Component {
  _onPressItem(major) {
    if (!major.basic_knowledge) { return; }

    this.props.navigation.navigate('MajorDetailScreen', {title: major.name_km, major: major})
  }

  _renderMajorList = () => {
    let category = this.props.navigation.getParam('category');
    let majors = majorList.filter(obj => category.majors.includes(obj.code));
    let arr = majors.filter(x => !!x.basic_knowledge);
    arr = arr.concat(majors.filter(x => !x.basic_knowledge));

    let doms = arr.map((major, index) => {
      return (
        <CardItem
          key={index}
          button
          bordered
          onPress={() => this._onPressItem(major)}
          >
          <Body>
            <Text>{major.name_km}</Text>
          </Body>
          <Right>
            { !!major.basic_knowledge && <AwesomeIcon name='angle-right' size={24} color='#bbb' /> }
          </Right>
        </CardItem>
      )
    });

    return (
      <Content style={{padding: 20, paddingTop: 4}}>
        <Card style={styles.curveBox}>
          <CardItem bordered style={styles.header}>
            <Body>
              <Text>អ្នកដែលស្ថិតក្នុងក្រុមមនុស្សដែលមានប្រភេទបុគ្គលិកលក្ខណៈបែប{category.name_km}គួរជ្រើសយកការសិក្សាលើមុខជំនាញពាក់ព័ន្ធដូចជា៖</Text>
            </Body>
          </CardItem>

          { doms }
        </Card>
      </Content>
    )
  }

  render() {
    return (
      <ScrollView>
        { this._renderMajorList() }
      </ScrollView>
    )
  }
}
