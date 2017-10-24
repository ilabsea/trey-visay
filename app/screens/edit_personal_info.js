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

export default class EditPersonalInfo extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack } = navigation;

    return {
      title: 'កែសម្រួល',
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => goBack()} style={{marginLeft: 16}}>
                      <Icon name='close' />
                    </TouchableOpacity>
                  </ThemeProvider>,
    }
  };

  render() {
    return (
      <ScrollView>
        <Text>EditPersonalInfo</Text>

      </ScrollView>
    )
  }
}
