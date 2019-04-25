import React, { Component } from 'react';

import { View, Text } from 'react-native';
import { Container, Content, ListItem, Body, Card, CardItem } from 'native-base';
import listStyles from '../../assets/style_sheets/list';

export default class MajorDetail extends Component {
  _renderRecievedKnowledge(major) {
    let doms = major.recieved_knowledge.split(';').map((text, index) => {
      return (<Text key={index} style={{marginLeft: 16}}>{'-' + " "} {text}</Text>);
    })

    return (
      <View>
        <Text>{'\u2022' + " "} ចំណេះដឹងដែលនិស្សិតទទួលបានក្រោយពីបញ្ចប់ការសិក្សារយៈពេល៤ឆ្នាំ៖</Text>
        { doms }
      </View>
    );
  }

  _renderPossibleWorkplaces(major) {
    let doms = major.possible_workplaces.split(';').map((text, index) => {
      return (<Text key={index} style={{marginLeft: 16}}>{'-' + " "} {text}</Text>);
    })

    return (
      <View>
        <Text>{'\u2022' + " "} អង្គភាព ឬមូលដ្ឋានដែលអ្នកសិក្សាចប់មុខជំនាញនេះអាចទៅបម្រើការងារ៖</Text>
        { doms }
      </View>
    );
  }

  render() {
    let major = this.props.navigation.getParam('major');

    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem bordered>
              <Text>មុខជំនាញ{major.name_km}</Text>
            </CardItem>

            <CardItem>
              <Body>
                <Text>{'\u2022' + " "} ចំណេះដឹងដឹងមូលដ្ឋានដែលបេក្ខជនត្រូវចេះសម្រាប់ទៅសិក្សាមុខជំនាញនេះ៖ {major.basic_knowledge}</Text>
                <Text>{'\u2022' + " "} ការសិក្សាដើម្បីទទួលបានសញ្ញាបត្របរិញ្ញាបត្រលើមុខជំនាញនេះ៖ {major.study_credit}</Text>

                { this._renderRecievedKnowledge(major) }
                { this._renderPossibleWorkplaces(major) }
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
