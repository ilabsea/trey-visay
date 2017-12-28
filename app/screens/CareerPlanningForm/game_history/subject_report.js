import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';

import {
  ThemeProvider,
} from 'react-native-material-ui';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';

import realm from '../../../schema';
import User from '../../../utils/user';

import headerStyles from '../../../assets/style_sheets/header';
import shareStyles from '../../../assets/style_sheets/profile_form';
import StatusBar from '../../../components/status_bar';

export default class SubjectReport extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'បំពេញមុខវិជ្ជា',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>បំពេញមុខវិជ្ជា</Text>,
      headerStyle: headerStyles.headerStyle,
      headerTintColor: '#fff'
    }
  };

  componentWillMount() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    let game = user.games.filtered('uuid=="' + this.props.navigation.state.params.gameUuid + '"')[0];

    this.state = {
      user: user,
      game: game,
      gameSubject: game.gameSubject
    }
  }

  _renderGroups(obj) {
    return (
      <View style={shareStyles.box}>
        <Text style={shareStyles.subTitle}>{obj.title}</Text>

        { obj.groups.map((group, i) => {
          if (!this.state.gameSubject[group.stateName]) {
            return (null)
          }

          return (
            <View key={i} style={{marginBottom: 16}}>
              <Divider style={{ marginBottom: 10 }}/>
              <Text style={{fontFamily: 'KantumruyBold'}}>{ group.label }</Text>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AwesomeIcon name='check-circle' size={24} color='#4caf50' style={{marginRight: 8}} />
                <Text>{ this.state.gameSubject[group.stateName] }</Text>
              </View>
            </View>
          )
        })}
      </View>
    )
  }

  _renderKhmer() {
    let obj = {
      title: 'ភាសាខ្មែរ',
      groups: [
        { stateName: 'khmerSpeaking', label: 'ការនិយាយ' },
        { stateName: 'khmerListening', label: 'ការស្តាប់' },
        { stateName: 'khmerReading', label: 'ការអាន' },
        { stateName: 'khmerWriting', label: 'ការសរសេរ' },
      ]
    }


    return this._renderGroups(obj);
  }

  _renderEnglish() {
    let obj = {
      title: 'ភាសាអង់គ្លេស',
      groups: [
        { stateName: 'englishSpeaking', label: 'ការនិយាយ' },
        { stateName: 'englishListening', label: 'ការស្តាប់' },
        { stateName: 'englishReading', label: 'ការអាន' },
        { stateName: 'englishWriting', label: 'ការសរសេរ' },
      ]
    }

    return this._renderGroups(obj);
  }

  render() {
    return (
      <ThemeProvider uiTheme={{}}>
        <View style={{flex: 1}}>
          <StatusBar />

          <ScrollView style={{flex: 1}}>
            <View style={{margin: 16, flex: 1}}>
              { this._renderKhmer() }
              { this._renderEnglish() }
            </View>
          </ScrollView>
        </View>
      </ThemeProvider>
    )
  }
}
