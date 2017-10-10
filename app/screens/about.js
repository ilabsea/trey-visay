import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView
} from 'react-native';

class About extends Component {
  static navigationOptions = {
    drawerLabel: 'About',
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


