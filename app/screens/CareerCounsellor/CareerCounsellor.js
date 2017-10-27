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
} from 'react-native-material-ui';

export default class CareerCounsellor extends Component {
  static navigationOptions = {
    drawerLabel: 'ប្រឹក្សាអាជីព',
    headerTitle: 'Career Counsellor',
    // headerLeft: <TouchableOpacity><Icon name="menu" size={30} style={{marginLeft: 10}} onPress={() => navigation.navigate('DrawerOpen')}/></TouchableOpacity>,
    drawerIcon: ({ tintColor }) => (
      <ThemeProvider uiTheme={{}}>
        <Icon name="list" />
      </ThemeProvider>
    ),
  };

  render() {
    return (
      <ThemeProvider uiTheme={{}}>
        <View style={styles.wrapper}>
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
