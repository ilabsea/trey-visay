import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import realm from '../../db/schema';
import User from '../../utils/user';
import subjectGroups from '../../data/json/subjects/subject_groups';

import mainStyles from '../../assets/style_sheets/main/main';
import RadioGroup from '../../components/radio_group';
import Card from '../../components/GameHistory/Subject/Card';
import StatusBar from '../../components/shared/status_bar';

export default class SubjectReport extends Component {
  componentWillMount() {
    let user = User.getCurrent();
    let game = user.games.filtered('uuid="' + this.props.navigation.state.params.gameUuid + '"')[0];

    this.setState({
      user: user,
      game: game,
      gameSubject: game.gameSubject
    })
  }

  renderSubject(subject, index){
    return(
      <Card data={subject} index={index} gameSubject={this.state.gameSubject}/>
    )
  }

  render() {
    let subjectsView = subjectGroups.map((subject, index) => {
      return this.renderSubject(subject, index);
    })

    return (
      <View style={{flex: 1}}>
        <StatusBar />

        <ScrollView>
          { subjectsView }
        </ScrollView>
      </View>
    )
  }
}
