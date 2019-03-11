import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';

// Utils
import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import StatusBar from '../../components/status_bar';
import LongText from '../../components/vocational/long_text';
import characteristicList from '../../data/json/characteristic_jobs';

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
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center', padding: 16}}
          onPress={() => {
            this.props.navigation.navigate('VocationalJobShowScreen', {id: career.id, title: career.name})
          }}
        >
          <Text style={[styles.subTitle, {flex: 1}]}>{career.name}</Text>
          <AwesomeIcon name='angle-right' size={24} color='#bbb' />
        </TouchableOpacity>
        <Divider/>
      </View>
    )
  }

  _renderContent() {
    return (
      <View style={myStyles.container}>
        <LongText text={this.state.currentGroup.recommendation} />

        <Text style={[headerStyles.body2, {marginTop: 16}]}>មុខរបរមានដូចខាងក្រោម៖</Text>

        <View style={[styles.box, {padding: 0}]}>
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

const myStyles = StyleSheet.create({
  container: {
    ...Platform.select({
      android: {
        margin: 16
      },
      ios: {
        margin: 8
      }
    })
  }
})
