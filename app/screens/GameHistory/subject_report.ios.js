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

import mainStyles from '../../assets/style_sheets/main/main';
import RadioGroup from '../../components/radio_group';
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

  _renderGroups(obj) {
    return (
      <View>
        <View style={[mainStyles.blueTitleBox, {marginTop: 20}]}>
          <Text style={[mainStyles.title, { paddingLeft: 8, color: 'rgb(24, 118, 211)' }]}>{obj.title}</Text>
        </View>

        <View style={mainStyles.subTitleBox}>
          { obj.groups.map((group, i) => {
            if (!this.state.gameSubject[group.stateName]) {
              return (null)
            }

            return (
              <View key={i} style={{paddingVertical: 8}}>
                <Text>{group.label}</Text>

                <Divider style={{marginLeft: 2}}/>
                <View style={{paddingTop: 8}}>
                  <RadioGroup
                    disabled={true}
                    options={[{ label: 'ខ្លាំង', value: 'ខ្លាំង' }, { label: 'មធ្យម', value: 'មធ្យម' }, { label: 'ខ្សោយ', value: 'ខ្សោយ' }]}
                    value={this.state.gameSubject[group.stateName]} >
                  </RadioGroup>
                </View>
              </View>
            )
          })}
        </View>
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

        <ScrollView>
          <View style={{flex: 1, marginTop: 8}}>
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
