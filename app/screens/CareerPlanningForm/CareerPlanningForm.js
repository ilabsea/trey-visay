import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';


export default class CareerPlanningForm extends Component {
  static navigationOptions = {
    drawerLabel: 'ប្រឹក្សាអាជីព',
    headerTitle: 'Career Planning',
  };

  render() {
    return(
      <View>
        <Text>Career Planning</Text>
      </View>
    );
  };

}
