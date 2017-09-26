import React, { Component } from 'react';
import { Text, View } from 'react-native';

import Login  from './roots/login';
import Logout   from './roots/logout';
import {
  StackNavigator,
} from 'react-navigation';

import ProfileForm from './components/profile_form/profile_form';

// const App = StackNavigator({
//   Profile: { screen: ProfileForm },
//   Login: { screen: Login },
// });

class App extends Component {

  renderContent() {
    return (
      <Login></Login>
    )
  }

  render() {
    // // need to fetch current user and environment before launching
    // if (!this.state.user || !this.state.environment || !this.state.debug) {
    //   return(<Launch ref="current" />);
    // }
    // else if (this.state.environment.data.name === 'test') {
    //   return (
    //     <View style={{flex:1}}>
    //       <TestRunner routeUnderTest={this.state.routeUnderTest}/>
    //       {this.renderContent()}
    //     </View>
    //   );
    // }
    // else {
    //   return this.renderContent();
    // }

    return this.renderContent();
  }
}

export default App;
