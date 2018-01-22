import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
} from 'react-native-material-ui';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';

// Utils
import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import StatusBar from '../../components/status_bar';
import characteristicList from '../../data/json/characteristic_jobs';

export default class VocationalJobIndexScreen extends Component {
  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    let currentGroup = characteristicList.find((obj) => obj.id == 4);

    this.state = {
      currentGroup: currentGroup
    };
  }

  _renderCareer(career, i) {
    return (
      <View key={i}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center', padding: 16}}
          onPress={() => {this.props.navigation.navigate('VocationalJobShowScreen', {id: career.id, title: career.name})}}
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
      <View style={{margin: 16}}>
        <Text style={styles.box}>{this.state.currentGroup.recommendation}</Text>

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
      <ThemeProvider uiTheme={{}}>
        <View style={{flex: 1}}>
          <StatusBar />
          <Toolbar
            leftElement="menu"
            centerElement={<Text style={[headerStyles.headerTitleStyle, {marginLeft: 0}]}>ជំនាញវិជ្ជាជីវៈ</Text>}
            onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
          />

          <ScrollView>
            { this._renderContent() }
          </ScrollView>
        </View>
      </ThemeProvider>
    );
  }
}
