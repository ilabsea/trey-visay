import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView
} from 'react-native';

export default class EditPersonalInfo extends Component {
  static navigationOptions = {
    drawerLabel: 'EditPersonalInfo',
  };

  render() {
    return (
      <ScrollView>
        <Text>EditPersonalInfo</Text>

      </ScrollView>
    )
  }
}
