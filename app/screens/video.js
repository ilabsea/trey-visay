import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView
} from 'react-native';

import {
  ThemeProvider,
} from 'react-native-material-ui';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class Video extends Component {
  static navigationOptions = {
    drawerLabel: 'វីដេអូមុខរបរ',
    drawerIcon: ({ tintColor }) => (
      <ThemeProvider uiTheme={{}}>
        <AwesomeIcon name='graduation-cap' size={20} />
      </ThemeProvider>
    ),
  };

  render() {
    return (
      <ScrollView>
        <Text>វីដេអូមុខរបរ</Text>

      </ScrollView>
    )
  }
}
