import React, { Component } from 'react';

import { View, Text } from 'react-native';
import { Container, Content, ListItem, Body, Card, CardItem } from 'native-base';
import subjectList from '../../data/json/subject';
import subjectTe from '../../data/translates/subject';

export default class PersonalityAssessmentSubjectTip extends Component {
  constructor(props) {
    super(props);

    let subjectCode = this.props.navigation.getParam('subjectCode')
    let subject = subjectList.find((obj) => obj.code == subjectCode);

    this.state = {
      subject: subject,
      subjectCode: subjectCode
    };

    props.navigation.setParams({title: subjectTe[subjectCode]})
  }

  _renderTip() {
    let tipType = 'medium_tips';
    return (
      <View>
        { this.state.subject[tipType].map((tip, i) => {
          { return (<Text key={i} style={{marginLeft: 8}}>- {tip}</Text>) }
        })}
      </View>
    )
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>គន្លឹះសម្រាប់{ subjectTe[this.state.subjectCode] }</Text>
            </CardItem>

            <CardItem bordered>
              {this._renderTip()}
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
