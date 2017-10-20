import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView
} from 'react-native';

export default class EditFamilyInfo extends Component {
  static navigationOptions = {
    drawerLabel: 'EditFamilyInfo',
  };

  render() {
    return (
      <ScrollView>
        <Text>EditFamilyInfo</Text>

      </ScrollView>
    )
  }
}
