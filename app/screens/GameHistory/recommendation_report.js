import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import mainStyles from '../../assets/style_sheets/main/main';

import realm from '../../db/schema';
import User from '../../utils/user';
import characteristicList from '../../data/json/characteristic_jobs';
import Recommendation from '../../components/Recommendation/Recommendation';

export default class RecommendationReport extends Component {
  componentWillMount() {
    this._initState();
  }

  _initState() {
    let user = User.getCurrent();
    let game = user.games.filtered('uuid="' + this.props.navigation.state.params.gameUuid + '"')[0];
    let currentGroup = characteristicList.find((obj) => obj.id == game.characteristicId);
    let currentJob = currentGroup.careers.find((obj) => obj.code == game.mostFavorableJobCode);

    this.setState({
      currentJob: currentJob,
      user: user,
      game: game,
      gameSubject: game.gameSubject,
      currentGroup: currentGroup,
    })
  }

  renderContent() {
    return (
      <Recommendation
        user={this.state.user}
        currentJob={this.state.currentJob}
        currentGroup={this.state.currentGroup}
        gameSubject={this.state.gameSubject}
        game={this.state.game}/>
    )
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          { this.renderContent() }
        </ScrollView>
      </View>
    );
  };
}
