import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';

import mainStyles from '../../../assets/style_sheets/main/main';
import StatusBar from '../../../components/shared/status_bar';
import characteristicList from '../../../data/json/characteristic_jobs';
import realm from '../../../db/schema';
import User from '../../../utils/user';

export default class StudentPersonalityReport extends Component {
  componentWillMount() {
    let user = User.getCurrent();
    let game = user.games.filtered('uuid="' + this.props.navigation.state.params.gameUuid + '"')[0];

    this.setState({
      user: user,
      game: game,
    })
  }

  _renderContent() {
    return (
      <View style={mainStyles.box}>
        <Text style={mainStyles.sectionText}>ចម្លើយអំពីបុគ្គលិកលក្ខណៈរបស់អ្នក</Text>
        <Divider />
        { this.state.game.characteristicEntries.map((entry, i) => {
          return (
            <View key={i} style={{flexDirection: 'row', alignItems: 'center', marginVertical: 8, marginLeft: 32}}>
              <AwesomeIcon name='check-circle' size={24} color='#4caf50' style={{marginRight: 8}} />
              <Text style={{fontWeight: 'bold'}}>{entry.value}</Text>
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

        <ScrollView>
          <View style={{flex: 1, marginTop: 8}}>
            { this._renderContent() }
          </View>
        </ScrollView>
      </View>
    )
  }
}
