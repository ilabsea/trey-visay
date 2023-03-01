import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';

import realm from '../../db/schema';
import User from '../../utils/user';
import subjectGroups from '../../data/json/subjects/subject_groups';

import Card from '../../components/GameHistory/Subject/Card';
import StatusBar from '../../components/shared/status_bar';

export default class SubjectReport extends Component {
  componentWillMount() {
    let user = User.getCurrent();
    let game = user.games.filtered('uuid="' + this.props.route.params.gameUuid + '"')[0];

    this.setState({
      user: user,
      game: game,
      gameSubject: game.gameSubject
    })
  }

  renderSubject(subject, index){
    return(
      <Card key={index} data={subject} gameSubject={this.state.gameSubject}/>
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
          <View style={{paddingBottom: 20}}>
            { subjectsView }
          </View>
        </ScrollView>
      </View>
    )
  }
}
