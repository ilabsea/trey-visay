import React, { Component } from 'react';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Container, Content, ListItem, Left, Body, Icon, Right } from 'native-base';
import majorList from '../../data/json/personality_major';
import mainStyles from '../../assets/style_sheets/main/main';
import styles from '../../assets/style_sheets/assessment';

export default class PersonalityAssessmentPersonalityCategory extends Component {
  constructor(props) {
    super(props);

    let category = props.navigation.getParam('category');
    this.state = {
      category: category
    }
  }

  _renderList() {
    let entries = this.props.navigation.getParam('entries');

    if (!entries.length) { return (null); }

    let doms = entries.map((entry, index) => {
      return (
        <ListItem
          key={index}
          icon>
          <Left>
            <AwesomeIcon name='check-square' size={24} color='rgb(17, 130, 254)' />
          </Left>
          <Body>
            <Text>{entry.name_km}</Text>
          </Body>
        </ListItem>
      )
    });

    return (
      <View style={[styles.curveBox, {marginHorizontal: 20, marginTop: 20}]}>
        <ListItem itemDivider style={styles.header}>
          <Text>ចម្លើយបុគ្គលិកលក្ខណៈរបស់អ្នក</Text>
        </ListItem>

        <View>
          {doms}
        </View>
      </View>
    );
  }

  _renderDescription() {
    if (!this.state.category.description) {
      return (null);
    }

    let doms = this.state.category.description.split(';').map((text, index) => {
      return (
        <Text key={index}>{text}</Text>
      );
    })

    return (
      <View style={[styles.curveBox, {marginHorizontal: 20, marginTop: 20}]}>
        <ListItem itemDivider style={styles.header}>
          <Text>មនុស្សបែប{this.props.navigation.getParam('title')}</Text>
        </ListItem>
        <View style={{backgroundColor: '#fff', padding: 16}}>{doms}</View>
      </View>
    );
  }

  _renderButtonList() {
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
              category: this.state.category,
              assessment: this.props.navigation.getParam('assessment')
            })}
          }>
          <Body>
            <Text>{option.label}</Text>
          </Body>
          <Right>
            <AwesomeIcon name='angle-right' size={24} color='#bbb' />
          </Right>
        </ListItem>
      )
    });

    return (
      <View>
        <Text style={mainStyles.sectionText}>ព័ត៌មានបន្ថែម</Text>

        <View style={{backgroundColor: '#fff', marginBottom: 16}}>{ doms }</View>
      </View>
    );
  }

  _renderContent = () => {
    return (
      <Content>
        { this._renderList() }
        { this._renderDescription() }
        { this._renderButtonList() }
      </Content>
    )
  }

  render() {
    return (
      <ScrollView>
        { this._renderContent() }
      </ScrollView>
    )
  }
}
