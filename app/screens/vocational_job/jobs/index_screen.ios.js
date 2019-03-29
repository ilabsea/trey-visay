import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

// Utils
import mainStyles from '../../../assets/style_sheets/main/main';
import StatusBar from '../../../components/status_bar';
import ButtonList from '../../../components/list/button_list';
import OneList from '../../../components/list/one_list';
import characteristicList from '../../../data/json/characteristic_jobs';

import { FontSetting } from "../../../assets/style_sheets/font_setting";

export default class VocationalJobIndexScreen extends Component {
  componentWillMount() {
    let currentGroup = characteristicList.find((obj) => obj.id == 4);

    this.setState({
      currentGroup: currentGroup,
      lineDescription: 2
    });
  }

  _renderCareer(career, i) {
    return (
      <View key={i}>
        <ButtonList
          onPress={() => {
            this.props.navigation.navigate('VocationalJobShowScreen', {
              id: career.id,
              title: career.name
            })
          }}
          title={career.name} />
      </View>
    )
  }

  _renderContent() {
    return (
      <View>
        <OneList onPress={() => {
            this.props.navigation.navigate('Description', {
              title: 'អំពីជំនាញវិជ្ជាជីវៈ',
              text: this.state.currentGroup.recommendation
            })
          }} text="អំពី"/>

        <Text style={mainStyles.sectionText}>
          មុខរបរមានដូចខាងក្រោម៖
        </Text>

        <View style={mainStyles.box}>
          { this.state.currentGroup.careers.map((career, i) => {
            { return (this._renderCareer(career, i))}
          })}
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar />

        <ScrollView>
          { this._renderContent() }
        </ScrollView>
      </View>
    );
  }
}
