import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
} from 'react-native-material-ui';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import headerStyles from '../assets/style_sheets/header';

const uiTheme = {
  palette: {
    primaryColor: '#1976d2',
  }
};

export default class Institution extends Component {
  static navigationOptions = {
    drawerLabel: 'គ្រឹះស្ថានសិក្សា',
    drawerIcon: ({ tintColor }) => (
      <AwesomeIcon name='play-circle-o' size={18} />
    ),
  };

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <Toolbar
            leftElement="menu"
            centerElement={<Text style={[headerStyles.headerTitleStyle, {marginLeft: 0}]}>គ្រឹះស្ថានសិក្សា</Text>}
            onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
          />

          <ScrollView>
            <View style={styles.scrollContainer}>
              <Text>គ្រឹះស្ថានសិក្សា</Text>
            </View>
          </ScrollView>
        </View>
      </ThemeProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    padding: 16
  },
});
