import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';
import styles from '../../assets/style_sheets/profile_form';

export default class PersonalityAssessmentHistory extends Component {
  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={[{margin: 16, flex: 1, backgroundColor: '#fff'}, styles.box]}>
          { this.props.navigation.state.params.entries.map((entry, i) => {
            return (
              <View key={i}>
                <View key={i} style={{flexDirection: 'row', alignItems: 'center', marginVertical: 8}}>
                  <AwesomeIcon name='check-circle' size={24} color='#4caf50' style={{marginRight: 8}} />
                  <Text style={{fontWeight: 'bold'}}>{entry.name_km}</Text>
                </View>
                <Divider style={{marginBottom: 8}}/>
              </View>
            )
          })}
        </View>
      </ScrollView>
    );
  }
}
