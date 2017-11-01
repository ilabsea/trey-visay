import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  ThemeProvider,
  Icon,
  Button,
  Toolbar,
} from 'react-native-material-ui';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import headerStyles from '../../assets/style_sheets/header';

const uiTheme = {
  palette: {
    primaryColor: '#1976d2',
  }
};

export default class CareerCounsellor extends Component {
  static navigationOptions = {
    drawerLabel: 'វាយតម្លៃមុខរបរនិងអាជីព',
    header: null,
    drawerIcon: ({ tintColor }) => (
      <AwesomeIcon name="briefcase" size={16} color={tintColor} />
    ),
  };

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.wrapper}>

          <Toolbar
            leftElement="menu"
            centerElement={<Text style={[headerStyles.headerTitleStyle, {marginLeft: 0}]}>វាយតម្លៃមុខរបរ និង អាជីព</Text>}
            onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
          />

          <View style={{height: 50}}>
            <Button raised primary text="Personal Understanding" onPress={() => this.goToPersonalUnderstandingForm() } />
          </View>

          <View style={{height: 50}}>
            <Button raised primary text="Planning a future career" />
          </View>

          <View style={{height: 50}}>
            <Button raised primary text="Recommendation list" />
          </View>

        </View>
      </ThemeProvider>
    );
  }

  goToPersonalUnderstandingForm(){
    this.props.navigation.navigate('PersonalUnderstandingFormScreen');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    flex: 1
  },

  icon: {
    width: 24,
    height: 24,
  },
});
