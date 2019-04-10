import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';

import realm from '../../../schema';
import User from '../../../utils/user';

import headerStyles from '../../../assets/style_sheets/header';
import shareStyles from '../../../assets/style_sheets/profile_form';
import StatusBar from '../../../components/shared/status_bar';

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
              <Text style={{fontWeight: 'bold'}}>{ group.label }</Text>

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
        { stateName: 'khmerReading', label: 'ការអាន' },
        { stateName: 'khmerWriting', label: 'ការសរសេរ' },
      ]
    }

    return this._renderGroups(obj);
  }

  _renderEnglish() {
    let obj = {
      title: 'ភាសាបរទេស',
      groups: [
        { stateName: 'english', label: 'ភាសាអង់គ្លេស/បារាំង' },
      ]
    }

    return this._renderGroups(obj);
  }

  _renderSocialStudies() {
    let obj = {
      title: 'សិក្សាសង្គម',
      groups: [
        { stateName: 'socialStudyEthicsAndCitizenship', label: 'សីលធម៌ និង ពលរដ្ឋ' },
        { stateName: 'socialStudyGeography', label: 'ភូមិវិទ្យា' },
        { stateName: 'socialStudyHistory', label: 'ប្រវត្តិវិទ្យា' },
      ]
    }

    return this._renderGroups(obj);
  }

  _renderScience() {
    let obj = {
      title: 'វិទ្យាសាស្ត្រ',
      groups: [
        { stateName: 'math', label: 'គណិតវិទ្យា' },
        { stateName: 'sciencePhysics', label: 'រូបវិទ្យា' },
        { stateName: 'scienceChemistry', label: 'គីមីវិទ្យា' },
        { stateName: 'scienceBiology', label: 'ជីវៈវិទ្យា' },
      ]
    }

    return this._renderGroups(obj);
  }

  _renderSoftSkill() {
    let obj = {
      title: 'ជំនាញទន់',
      groups: [
        { stateName: 'softSkillCommunication', label: 'ទំនាក់ទំនង' },
        { stateName: 'softSkillBrave', label: 'ក្លាហាន' },
        { stateName: 'softSkillTeamwork', label: 'ក្រុមការងារ' },
        { stateName: 'softSkillProblemSolving', label: 'ដោះស្រាយបញ្ហា' },
        { stateName: 'softSkillPublicSpeaking', label: 'ការនិយាយជាសាធារណៈ' },
      ]
    }

    return this._renderGroups(obj);
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar />

        <ScrollView style={{flex: 1}}>
          <View style={{margin: 16, flex: 1}}>
            { this._renderKhmer() }
            { this._renderEnglish() }
            { this._renderSocialStudies() }
            { this._renderScience() }
            { this._renderSoftSkill() }
          </View>
        </ScrollView>
      </View>
    )
  }
}
