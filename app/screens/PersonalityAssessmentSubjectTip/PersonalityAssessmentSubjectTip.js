import React, { Component } from 'react';

import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Content, ListItem, Body, Card, CardItem } from 'native-base';
import subjectList from '../../data/json/subjects/subject_tips';
import subjectTe from '../../data/translates/subject';
import styles from '../../assets/style_sheets/assessment';

export default class PersonalityAssessmentSubjectTip extends Component {
  constructor(props) {
    super(props);

    let subjectCode = this.props.navigation.getParam('subjectCode');
    let subject = subjectList.find((obj) => obj.code == subjectCode);

    this.state = {
      subject: subject,
      subjectCode: subjectCode
    };

    props.navigation.setParams({title: subjectTe[subjectCode]})
  }

  _renderTip() {
    let tipType = 'medium_tips';
    let doms = this.state.subject[tipType].map((tip, i) => this._buildList('\u2022', tip, i));
    return doms;
  }

  _buildList(symbol, text, key) {
    return (
      <View style={[{flexDirection: 'row', width: '100%'}]} key={key}>
        <Text style={{width: 16}}>{symbol}</Text>
        <Text style={{flex: 1}}>{text}</Text>
      </View>
    );
  }

  _renderContent = () => {
    return (
      <Content style={{padding: 20, paddingTop: 4}}>
        <Card style={styles.curveBox}>
          <CardItem header bordered style={styles.header}>
            <Text>គន្លឹះសម្រាប់{ subjectTe[this.state.subjectCode] }</Text>
          </CardItem>

          <CardItem bordered>
            <Body>
              {this._renderTip()}
            </Body>
          </CardItem>
        </Card>
      </Content>
    )
  }

  render() {
    return(
      <ScrollView>
        { this._renderContent() }
      </ScrollView>
    )
  }
}
