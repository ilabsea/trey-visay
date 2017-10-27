import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView
} from 'react-native';

import {
  ThemeProvider,
  Icon,
} from 'react-native-material-ui';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class Institution extends Component {
  static navigationOptions = {
    drawerLabel: 'គ្រឹះស្ថានសិក្សា',
    drawerIcon: ({ tintColor }) => (
      <ThemeProvider uiTheme={{}}>
        <AwesomeIcon name='play-circle-o' size={18} />
      </ThemeProvider>
    ),
  };

  render() {
    return (
      <ScrollView>
        <Text>គ្រឹះស្ថានសិក្សា</Text>

      </ScrollView>
    )
  }
}
