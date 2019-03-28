import React, { Component } from 'react';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { View, StyleSheet, Text } from 'react-native';
import { Container, Content, ListItem, Left, Body, Icon, Right } from 'native-base';
import styles from '../../assets/style_sheets/list';
import majorList from '../../data/json/personality_major';

export default class PersonalityAssessmentMajorList extends Component {
  _renderList() {
    let entries = this.props.navigation.getParam('entries');

    if (!entries.length) {
      return (null);
    }

    let doms = entries.map((entry, index) => {
      return (
        <ListItem
          key={index}
          icon>
          <Left>
            <AwesomeIcon name='check-circle' size={24} color='#4caf50' />
          </Left>
          <Body>
            <Text>{entry.name_km}</Text>
          </Body>
        </ListItem>
      )
    });

    doms.unshift(<ListItem itemDivider key={'header'}><Text>បុគ្គលិកលក្ខណៈរបស់អ្នក</Text></ListItem>)

    return doms;
  }

  _renderDescription() {
    let category = this.props.navigation.getParam('category');

    if (!category.description) {
      return (null)
    }

    let doms = category.description.split(';').map((text, index) => {
      return (
        <View style={ styles.column } key={index}>
            <View style={ styles.row }>
                <View style={ styles.bullet }>
                    <Text>{'\u2022' + " "}</Text>
                </View>
                <View style={ styles.bulletText }>
                    <Text>{text}</Text>
                </View>
            </View>
        </View>
      );
    })

    return (
      <View>
        <ListItem itemDivider><Text>មនុស្សបែប{this.props.navigation.getParam('title')}</Text></ListItem>
        {doms}
      </View>
    );
  }

  _renderMajorList() {
    let category = this.props.navigation.getParam('category');
    let majors = majorList.filter(obj => (obj.group == category.group));

    let doms = majors.map((major, index) => {
      return (
        <ListItem
          key={index}
          button
          onPress={() => {this.props.navigation.navigate('MajorDetailScreen', {title: major.name_km, major: major})}}
          >
          <Body>
            <Text>{major.name_km}</Text>
          </Body>
          <Right>
            <Icon active name="arrow-forward" />
          </Right>
        </ListItem>
      )
    });

    return (
      <View>
        <ListItem itemDivider><Text>ការសិក្សានៅសាកលវិទ្យាល័យ</Text></ListItem>
        <Text style={{paddingHorizontal: 16}}>អ្នកដែលស្ថិតក្នុងក្រុមមនុស្សដែលមានប្រភេទបុគ្គលិកលក្ខណៈបែបប្រាកដនិយមគួរជ្រើសយកការសិក្សាលើមុខជំនាញពាក់ព័ន្ធដូចជា៖</Text>
        { doms }
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Content>
          { this._renderList() }
          { this._renderDescription() }
          { this._renderMajorList() }
        </Content>
      </Container>
    );
  }
}
