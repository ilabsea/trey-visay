import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Divider } from 'react-native-elements';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import realm from '../../db/schema';
import User from '../../utils/user';

import mainStyles from '../../assets/style_sheets/main/main';
import StatusBar from '../../components/shared/status_bar';
import Question from '../../data/json/personal_understanding.json';
import Card from '../../components/GameHistory/PersonalUnderstanding/Card';
import { Colors } from '../../assets/style_sheets/main/colors';

export default class PersonalUnderstandingReport extends Component {
  componentWillMount() {
    let user = User.getCurrent();
    let game = user.games.filtered('uuid="' + this.props.navigation.state.params.gameUuid + '"')[0];

    this.setState({
      user: user,
      game: game,
    })
  }

  yesNoValue = { Yes: 'បាទ/ចាស', No: 'ទេ', Don_Know: 'មិនដឹង' };

  _renderQuestion(personalUnderstanding, questionKey) {
    if (!personalUnderstanding[questionKey]) {
      return (null);
    }

    return (
      <Card
        question={Question[questionKey]}
        response={this.yesNoValue[personalUnderstanding[questionKey]]}/>
    );
  }

  _renderQuestion3(personalUnderstanding) {
    if (!personalUnderstanding.haveYouEverThoughtOfCareer) {
      return (null);
    }

    return (
      <Card
        question={Question.haveYouEverThoughtOfCareer}
        response={this.yesNoValue[personalUnderstanding.haveYouEverThoughtOfCareer]}>

        <View style={{marginLeft: -20, marginTop: -20}}>
          { !!personalUnderstanding.careerName &&
            <Card
              noIcon={true}
              question={Question.careerName}
              response={personalUnderstanding.careerName}/>
          }

          { !!personalUnderstanding.howToReachCareerGoal &&
            <Card
              noIcon={true}
              question={Question.howToReachCareerGoal}
              response={personalUnderstanding.howToReachCareerGoal}/>
          }

          { !!personalUnderstanding.doesParentsAgreeWith &&
            <Card
              question={Question.doesParentsAgreeWith}
              response={this.yesNoValue[personalUnderstanding.doesParentsAgreeWith]}/>
          }
        </View>
      </Card>
    );
  }

  _renderQuestion4(personalUnderstanding) {
    if (!personalUnderstanding.everTalkedWithAnyoneAboutCareer.length) {
      return (null);
    }

    let arr = { 1: 'ឳពុកម្តាយ', 2: 'បងប្អូន', 3: 'ក្រុមប្រឹក្សាកុមារ', 4: 'នាយកសាលា', 5: 'គ្រូ', 6: 'មិត្តភក្តិ' };

    return (
      <View style={[mainStyles.curveBox, { marginTop: 20 }]}>
        <Text style={mainStyles.sectionTextInBox}>{ Question.everTalkedWithAnyoneAboutCareer}</Text>
        <Divider style={{marginLeft: 16}}/>
        { personalUnderstanding.everTalkedWithAnyoneAboutCareer.map((obj, i) => {
          return (
            <View key={i} style={{flexDirection: 'row', margin: 16, marginBottom: 8}}>
              <AwesomeIcon name='check-square' size={24} color={Colors.blue} style={{marginRight: 8}} />
              <Text>{arr[obj.value]}</Text>
            </View>
          )
        })}
      </View>
    );
  }

  _renderQuestion5(personalUnderstanding) {
    if (!personalUnderstanding.howToReachJobVacancy) {
      return (null);
    }

    return (
      <Card
        noIcon={true}
        question={Question.howToReachJobVacancy}
        response={personalUnderstanding.howToReachJobVacancy}/>
    );
  }

  _renderContent(obj, i) {
    return (
      <View key={i} style={{paddingBottom: 20}}>
        <Text style={{marginLeft: 20, marginTop: 16}}>
          ការស្វែងយល់អំពីខ្លួនឯងលើកទី { i + 1 }
        </Text>

        { this._renderQuestion(obj, 'areYouGoingToStudyTillGrade12') }
        { this._renderQuestion(obj, 'areYourParentsAllowYouToStudyTillGrade12') }
        { this._renderQuestion3(obj) }
        { this._renderQuestion4(obj) }
        { this._renderQuestion5(obj) }
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar />
        <ScrollView>
          { this.state.game.personalUnderstandings.map((obj, i) => {
            { return (this._renderContent(obj, i)) }
          })}
        </ScrollView>
      </View>
    )
  }
}
