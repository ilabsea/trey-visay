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

class About extends Component {
  static navigationOptions = {
    drawerLabel: 'អំពីកម្មវិធី',
    drawerIcon: ({ tintColor }) => (
      <ThemeProvider uiTheme={{}}>
        <Icon name="list" />
      </ThemeProvider>
    ),
  };

  render() {
    return (
      <ScrollView>
        <Text>About</Text>

      </ScrollView>
    )
  }
}

export default About;

// const InboxScreen = ({ navigation }) => (
//   <MyNavScreen banner={'Inbox Screen'} navigation={navigation} />
// );

// InboxScreen.navigationOptions = {
//   drawerLabel: 'Inbox',
//   drawerIcon: ({ tintColor }) => (
//     <MaterialIcons
//       name="move-to-inbox"
//       size={24}
//       style={{ color: tintColor }}
//     />
//   ),
// };


