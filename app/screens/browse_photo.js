import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  ThemeProvider,
  Icon,
} from 'react-native-material-ui';

export default class BrowsePhoto extends Component {
  static navigationOptions = ({ navigation }) => {
    const {goBack} = navigation;
    return {
      title: 'Select Photo',
      headerRight:
        <TouchableOpacity onPress={() => goBack()}>
          <Text>Cancel</Text>
        </TouchableOpacity>
    }
  };

  render() {
    return (
      <ScrollView>
        <Text>BrowsePhoto</Text>

      </ScrollView>
    )
  }
}
