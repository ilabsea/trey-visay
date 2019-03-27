import React, { Component } from 'react';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { View, StyleSheet } from 'react-native';
import { Container, Content, ListItem, Text, Left, Body, Icon, Right } from 'native-base';
import styles from '../../assets/style_sheets/list';

export default class PersonalityAssessmentRealisticHistory extends Component {
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
    let arr = [
      'ធ្វើការដោយការអនុវត្តជាក់ស្តែង',
      'ធ្វើការដោយប្រើម៉ាស៊ីន ឬសម្ភារៈឧបទ្ទេស',
      'ធ្វើការដោយប្រើសត្វជាកម្លាំងជំនួយ',
      'ធ្វើការដោយប្រើកម្លាំងជាមធ្យោបាយ',
      'ធ្វើការជាអ្នកបើកបរ'
    ];

    let doms = arr.map((text, index) => {
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
    let majors = [
      { name: 'គណិតវិទ្យា'},
      { name: 'រូបវិទ្យា'},
      { name: 'វិស្វកម្មសំណង់ស៊ីវិល'},
      { name: 'វិស្វកម្មអគ្គិសនី'},
      { name: 'ស្ថាបត្យកម្ម'}
    ];

    let doms = majors.map((major, index) => {
      return (
        <ListItem
          key={index}
          button
          onPress={() => {this.props.navigation.navigate('MajorDetailScreen', {title: major.name})}}
          >
          <Body>
            <Text>{major.name}</Text>
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
