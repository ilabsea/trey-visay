import React, { Component } from 'react';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { View, Text } from 'react-native';
import { Container, Content, ListItem, Left, Body, Icon, Right } from 'native-base';
import styles from '../../assets/style_sheets/list';
import majorList from '../../data/json/personality_major';

export default class PersonalityAssessmentPersonalityCategory extends Component {
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

  _renderButtonList() {
    let category = this.props.navigation.getParam('category');
    let options = [
      {label: 'ជម្រើសនៃការសិក្សាកម្រិតមធ្យមសិក្សាទុតិយភូមិ', screen: 'HighSchoolStudyOptionScreen'},
      {label: 'ជម្រើសនៃការសិក្សាកម្រិតឧត្តមសិក្សា', screen: 'MajorListScreen'},
      {label: 'ជម្រើសអាជីពការងារសក្ដិសម', screen: 'PersonalityAssessmentJobListScreen'},
    ];

    let doms = options.map((option, index) => {
      return (
        <ListItem
          key={index}
          button
          onPress={() => {
            this.props.navigation.navigate(option.screen, {
              category: category,
              assessment: this.props.navigation.getParam('assessment')
            })}
          }>
          <Body>
            <Text>{option.label}</Text>
          </Body>
          <Right>
            <Icon active name="arrow-forward" />
          </Right>
        </ListItem>
      )
    });

    return (
      <View>
        <ListItem itemDivider><Text>ព័ត៌មានបន្ថែម</Text></ListItem>
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
          { this._renderButtonList() }
        </Content>
      </Container>
    );
  }
}
