import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

// Utils
import mainStyles from '../../assets/style_sheets/main/main';
import StatusBar from '../../components/shared/status_bar';
import ButtonList from '../../components/list/button_list';
import LongText from '../../components/careers/long_text';
import characteristicList from '../../data/json/characteristic_jobs';
import careers from '../../data/json/careers/career_clusters';

export default class CareerClusterScreen extends Component {
  componentWillMount() {
    let currentGroup = characteristicList.find((obj) => obj.id == 4);

    this.setState({
      currentGroup: currentGroup,
    });
    this.props.navigation.setParams({
      title: 'ជំនាញវិជ្ជាជីវៈ',
      content: currentGroup.recommendation
    })
  }

  _renderCareer(career, i) {
    return (
      <View key={i}>
        <ButtonList
          onPress={() => {
            this.props.navigation.navigate('CareerIndexScreen', {
              code: career.code,
              title: career.name_kh
            })
          }}
          title={career.name_kh} />
      </View>
    )
  }

  _renderContent() {
    return (
      <View>
        <LongText text={this.state.currentGroup.recommendation} />

        <Text style={mainStyles.sectionText}>
          មុខរបរមានដូចខាងក្រោម៖
        </Text>

        <View style={mainStyles.box}>
          { careers.map((career, i) => {
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
