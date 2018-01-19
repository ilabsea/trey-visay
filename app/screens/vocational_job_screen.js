import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
  Icon,
} from 'react-native-material-ui';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

// Utils
import realm from '../schema';
import User from '../utils/user';
import headerStyles from '../assets/style_sheets/header';
import StatusBar from '../components/status_bar';

const uiTheme = {
  palette: {
    primaryColor: '#1976d2',
  }
};

export default class VocationalJobScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'ជំនាញវិជ្ជាជីវៈ',
    drawerIcon: ({ tintColor }) => (
      <ThemeProvider uiTheme={{}}>
        <Icon name="home" color={tintColor} />
      </ThemeProvider>
    ),
  };

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={{flex: 1}}>
          <StatusBar />
          <Toolbar
            leftElement="menu"
            centerElement={<Text style={[headerStyles.headerTitleStyle, {marginLeft: 0}]}>ជំនាញវិជ្ជាជីវៈ</Text>}
            onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
          />

          <ScrollView>
            <View style={{margin: 16}}>

            </View>
          </ScrollView>
        </View>
      </ThemeProvider>
    );
  }
}
