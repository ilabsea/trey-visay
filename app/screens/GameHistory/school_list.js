import React, { Component } from 'react';
import {
  View,
  ScrollView
} from 'react-native';

import SchoolListView from '../../components/schools/school_list';

export default class SchoolListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      schools: props.route.params.schools
    }
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <ScrollView>
          <SchoolListView navigation={this.props.navigation} data={this.state.schools}/>
        </ScrollView>
      </View>
    );
  };
}
