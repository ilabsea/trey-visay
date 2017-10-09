import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  ToolbarAndroid
} from 'react-native';

class Dashboard extends Component {
  static navigationOptions = {
    drawerLabel: 'Dashboard',
  };

  onActionSelected(position) {
    if (position === 0) { // index of 'Settings'
      showSettings();
    }
  }

  render() {
    return (
      <ScrollView>
        <Text>Dashboard</Text>


      </ScrollView>
    )

    // return (
    //   <ToolbarAndroid
    //     title="AwesomeApp"
    //     actions={[{title: 'Settings', show: 'always'}]}
    //     onActionSelected={this.onActionSelected.bind(this)} />
    // )
  }
}

export default Dashboard;
