import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import realm from '../../../schema';
import User from '../../../utils/user';

import mainStyles from '../../../assets/style_sheets/main/main';
import StatusBar from '../../../components/status_bar';
import Question from '../../../data/json/personal_understanding.json';

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

  _renderQuestion1(personalUnderstanding) {
    if (!personalUnderstanding.areYouGoingToStudyTillGrade12) {
      return (null);
    }

    return (
      <View style={[mainStyles.box, {padding: 16}]}>
        <Text style={mainStyles.text}>{Question.areYouGoingToStudyTillGrade12}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 16}}>
          <AwesomeIcon name='check-circle' size={24} color='#4caf50' style={{marginRight: 8}} />
          <Text>{this.yesNoValue[personalUnderstanding.areYouGoingToStudyTillGrade12]}</Text>
        </View>
      </View>
    );
  }

  _renderQuestion2(personalUnderstanding) {
    if (!personalUnderstanding.areYourParentsAllowYouToStudyTillGrade12) {
      return (null);
    }

    return (
      <View style={[mainStyles.box, {padding: 16}]}>
        <Text style={mainStyles.text}>{Question.areYourParentsAllowYouToStudyTillGrade12}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 16}}>
          <AwesomeIcon name='check-circle' size={24} color='#4caf50' style={{marginRight: 8}} />
          <Text>{this.yesNoValue[personalUnderstanding.areYourParentsAllowYouToStudyTillGrade12]}</Text>
        </View>
      </View>
    );
  }

  _renderQuestion3(personalUnderstanding) {
    if (!personalUnderstanding.haveYouEverThoughtOfCareer) {
      return (null);
    }

    return (
      <View style={[mainStyles.box, {padding: 16}]}>
        <Text style={mainStyles.text}>{Question.haveYouEverThoughtOfCareer}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 16}}>
          <AwesomeIcon name='check-circle' size={24} color='#4caf50' style={{marginRight: 8}} />
          <Text>{this.yesNoValue[personalUnderstanding.haveYouEverThoughtOfCareer]}</Text>
        </View>

        { !!personalUnderstanding.careerName &&
          <View>
            <Text style={[mainStyles.text, {marginTop: 30}]}>{Question.careerName}</Text>
            <Text style={[mainStyles.text, {marginLeft: 16}]}>{personalUnderstanding.careerName}</Text>
          </View>
        }

        { !!personalUnderstanding.howToReachCareerGoal &&
          <View>
            <Text style={[mainStyles.text, {marginTop: 30}]}>{ Question.howToReachCareerGoal}</Text>
            <Text style={[mainStyles.text, {marginLeft: 16}]}>{personalUnderstanding.howToReachCareerGoal}</Text>
          </View>
        }

        { !!personalUnderstanding.doesParentsAgreeWith &&
          <View>
            <Text style={[mainStyles.text, {marginTop: 30}]}>{ Question.doesParentsAgreeWith }</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 16}}>
              <AwesomeIcon name='check-circle' size={24} color='#4caf50' style={{marginRight: 8}} />
              <Text>{this.yesNoValue[personalUnderstanding.doesParentsAgreeWith]}</Text>
            </View>
          </View>
        }
      </View>
    );
  }

  _renderQuestion4(personalUnderstanding) {
    if (!personalUnderstanding.everTalkedWithAnyoneAboutCareer.length) {
      return (null);
    }

    let arr = { 1: 'ឳពុកម្តាយ', 2: 'បងប្អូន', 3: 'ក្រុមប្រឹក្សាកុមារ', 4: 'នាយកសាលា', 5: 'គ្រូ', 6: 'មិត្តភក្តិ' };

    return (
      <View style={[mainStyles.box, {padding: 16}]}>
        <Text style={mainStyles.text}>{ Question.everTalkedWithAnyoneAboutCareer}</Text>
        { personalUnderstanding.everTalkedWithAnyoneAboutCareer.map((obj, i) => {
          return (
            <View key={i}>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8, marginLeft: 16}}>
                <AwesomeIcon name='check-circle' size={24} color='#4caf50' style={{marginRight: 8}} />
                <Text>{arr[obj.value]}</Text>
              </View>
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
      <View style={[mainStyles.box, {padding: 16}]}>
        <Text style={mainStyles.text}>{ Question.howToReachJobVacancy }</Text>
        <Text style={[mainStyles.text, {marginLeft: 16}]} >{personalUnderstanding.howToReachJobVacancy}</Text>
      </View>
    );
  }

  _renderContent(obj, i) {
    return (
      <View key={i} >
        <Text style={mainStyles.sectionText}>
          ការស្វែងយល់អំពីខ្លួនឯងលើកទី { i + 1 }
        </Text>

        { this._renderQuestion1(obj) }
        { this._renderQuestion2(obj) }
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
        <ScrollView style={{flex: 1}}>
          { this.state.game.personalUnderstandings.map((obj, i) => {
            { return (this._renderContent(obj, i)) }
          })}
        </ScrollView>
      </View>
    )
  }
}
