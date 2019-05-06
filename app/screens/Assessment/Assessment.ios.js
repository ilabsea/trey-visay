import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import { Container, Header, Content, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Card, CardItem } from 'native-base';

import StatusBar from '../../components/shared/status_bar';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class Assessment extends Component {
  static navigationOptions = {
    drawerLabel: 'វាយតម្លៃមុខរបរនិងអាជីព',
    drawerIcon: ({ tintColor }) => (
      <AwesomeIcon name="briefcase" size={16} color={tintColor} />
    ),
  };

  _renderInstruction() {
    return (
      <Card >
        <CardItem header bordered>
          <Left>
            <Thumbnail source={require('../../assets/images/list.png')} />
            <Body>
              <Text>ការធ្វើតេស្ដឆ្លុះបញ្ចាំងពីខ្លួនឯង</Text>
            </Body>
          </Left>
        </CardItem>

        <CardItem button onPress={() => this.props.navigation.navigate('CareerCounsellorScreen')}>
          <Text style={{}}>ការធ្វើតេស្តវាយតម្លៃមុខរបរនិងអាជីព</Text>
          <Right style={{flex: 1}}>
            <Icon name="arrow-forward" />
          </Right>
        </CardItem>

        <CardItem button onPress={() => this.props.navigation.navigate('PersonalityAssessmentScreen')}>
          <Text>ការធ្វើតេស្តស្វែងយល់អំពីបុគ្គលិកលក្ខណៈ</Text>
          <Right style={{flex: 1}}>
            <Icon name="arrow-forward" />
          </Right>
        </CardItem>
      </Card>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar />
        <Container>
          <Content padder>
            { this._renderInstruction() }
          </Content>
        </Container>
      </View>
    );
  }
}
