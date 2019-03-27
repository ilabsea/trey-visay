import React, { Component } from 'react';

import { View } from 'react-native';
import { Container, Content, ListItem, Text, Body, Card, CardItem } from 'native-base';
import listStyles from '../../assets/style_sheets/list';

export default class MajorDetail extends Component {

  render() {
    let arr = [
      'ចំណេះដឹងមូលដ្ឋាន ឬមុខវិជ្ជាតម្រង់ទិសពីមធ្យមសិក្សាទុតិយភូមិ',
      'ក្របខណ្ឌកម្មវិធីសិក្សា',
      'ចំណេះដឹងទទួលបាន',
      'គ្រឹះស្ថានផ្តល់ការអប់រំបណ្តុះបណ្តាល',
      'អាជីពការងារដែលសក្តិសម'
    ];

    let doms = arr.map((text, index) => {
      return (<Text key={index}>{'\u2022' + " "} {text}</Text>);
    })

    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem bordered>
              <Text>ការសិក្សាជំនាញ {this.props.navigation.state.params.title} ក្នុងកម្រិតបរិញ្ញាបត្រនិស្សិតត្រូវសិក្សារយៈពេល ៤ឆ្នាំ ស្មើនឹង១២០ ក្រេឌីតយ៉ាងតិច៖</Text>
            </CardItem>

            <CardItem>
              <Body>
                { doms }
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
