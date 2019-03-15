import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button
} from 'react-native';

import { NavigationActions } from 'react-navigation';

class Result extends Component {
  render() {
    return(
          <View>
            <Text>ពូកែអង្កេត</Text>
            <Button title='Done' onPress={()=> this.props.navigation.reset([NavigationActions.navigate({ routeName: 'AssessmentScreen' }), NavigationActions.navigate({ routeName: 'PersonalityAssessmentScreen' })], 1)} />
          </View>
    )
  }
}

export default Result;
