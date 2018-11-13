import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import headerStyles from '../../../assets/style_sheets/header';
import shareStyles from '../../../assets/style_sheets/profile_form';
import fontStyles from '../../../assets/style_sheets/app_styles';
import StatusBar from '../../../components/status_bar';
import characteristicList from '../../../data/json/characteristic_jobs';
import realm from '../../../schema';
import User from '../../../utils/user';

export default class StudentPersonalityReport extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'ការបំពេញបុគ្គលិកលក្ខណៈ',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>ការបំពេញបុគ្គលិកលក្ខណៈ</Text>,
      headerStyle: headerStyles.headerStyle,
      headerTintColor: '#fff'
    }
  };

  componentWillMount() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    let game = user.games.filtered('uuid="' + this.props.navigation.state.params.gameUuid + '"')[0];

    this.state = {
      user: user,
      game: game,
    }
  }

  _renderContent() {
    return (
      <View style={shareStyles.box}>
        <Text style={shareStyles.subTitle}>ចម្លើយអំពីបុគ្គលិកលក្ខណៈរបស់អ្នក</Text>

        { this.state.game.characteristicEntries.map((entry, i) => {
          return (
            <View key={i} style={{flexDirection: 'row', alignItems: 'center', marginVertical: 8}}>
              <AwesomeIcon name='check-circle' size={24} color='#4caf50' style={{marginRight: 8}} />
              <Text style={{fontFamily: fontStyles.mainBold}}>{entry.value}</Text>
            </View>
          )
        })}
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar />

        <ScrollView style={{flex: 1}}>
          <View style={{margin: 16, flex: 1}}>
            { this._renderContent() }
          </View>
        </ScrollView>
      </View>
    )
  }
}
