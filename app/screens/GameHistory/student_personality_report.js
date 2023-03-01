import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-paper';

import mainStyles from '../../assets/style_sheets/main/main';
import StatusBar from '../../components/shared/status_bar';
import characteristicList from '../../data/json/characteristic_jobs';
import realm from '../../db/schema';
import User from '../../utils/user';
import { Colors } from '../../assets/style_sheets/main/colors';

export default class StudentPersonalityReport extends Component {
  componentWillMount() {
    let user = User.getCurrent();
    let game = user.games.filtered('uuid="' + this.props.route.params.gameUuid + '"')[0];

    this.setState({
      user: user,
      game: game,
    })
  }

  _renderContent() {
    return (
      <View>
        <Text style={{marginLeft: 20, marginTop: 16}}>ចម្លើយអំពីបុគ្គលិកលក្ខណៈរបស់អ្នក</Text>
        <View style={[mainStyles.curveBox, { marginTop: 0 }]}>
          { this.state.game.characteristicEntries.map((entry, i) => {
            return (
              <View key={i}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
                  <AwesomeIcon name='check-square' size={24} color={Colors.blue} style={{marginRight: 8}} />
                  <Text>{entry.value}</Text>
                </View>

                <Divider style={{marginLeft: 2}}/>
              </View>
            )
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
          <View style={{flex: 1, marginTop: 8}}>
            { this._renderContent() }
          </View>
        </ScrollView>
      </View>
    )
  }
}
