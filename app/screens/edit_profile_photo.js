import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView
} from 'react-native';

export default class EditProfilePhoto extends Component {
  static navigationOptions = {
    drawerLabel: 'EditProfilePhoto',
  };

  render() {
    return (
      <ScrollView>
        <Text>EditProfilePhoto</Text>

      </ScrollView>
    )
  }
}
