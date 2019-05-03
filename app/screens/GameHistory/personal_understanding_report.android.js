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
import { Divider } from 'react-native-elements';

import realm from '../../db/schema';
import User from '../../utils/user';

import headerStyles from '../../assets/style_sheets/header';
import shareStyles from '../../assets/style_sheets/profile_form';
import StatusBar from '../../components/shared/status_bar';
import Question from '../../data/json/personal_understanding.json';

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
      <View style={shareStyles.box}>
        <Text style={shareStyles.subTitle}>{Question.areYouGoingToStudyTillGrade12}</Text>
        <Divider style={{marginBottom: 8}}/>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
      <View style={shareStyles.box}>
        <Text style={shareStyles.subTitle}>{Question.areYourParentsAllowYouToStudyTillGrade12}</Text>
        <Divider style={{marginBottom: 8}}/>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
      <View style={shareStyles.box}>
        <Text style={shareStyles.subTitle}>{Question.haveYouEverThoughtOfCareer}</Text>
        <Divider style={{marginBottom: 8}}/>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AwesomeIcon name='check-circle' size={24} color='#4caf50' style={{marginRight: 8}} />
          <Text>{this.yesNoValue[personalUnderstanding.haveYouEverThoughtOfCareer]}</Text>
        </View>

        { !!personalUnderstanding.careerName &&
          <View>
            <Text style={[shareStyles.subTitle, {marginTop: 12}]}>{Question.careerName}</Text>
            <Divider style={{marginBottom: 8}}/>
            <Text>{personalUnderstanding.careerName}</Text>
          </View>
        }

        { !!personalUnderstanding.howToReachCareerGoal &&
          <View>
            <Text style={[shareStyles.subTitle, {marginTop: 12}]}>{ Question.howToReachCareerGoal}</Text>
            <Divider style={{marginBottom: 8}}/>
            <Text>{personalUnderstanding.howToReachCareerGoal}</Text>
          </View>
        }

        { !!personalUnderstanding.doesParentsAgreeWith &&
          <View>
            <Text style={[shareStyles.subTitle, {marginTop: 12}]}>{ Question.doesParentsAgreeWith }</Text>
            <Divider style={{marginBottom: 8}}/>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
      <View style={shareStyles.box}>
        <Text style={shareStyles.subTitle}>{ Question.everTalkedWithAnyoneAboutCareer}</Text>
        { personalUnderstanding.everTalkedWithAnyoneAboutCareer.map((obj, i) => {
          return (
            <View key={i}>
              <Divider style={{marginBottom: 8}}/>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
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
      <View style={shareStyles.box}>
        <Text style={shareStyles.subTitle}>{ Question.howToReachJobVacancy }</Text>
        <Text>{personalUnderstanding.howToReachJobVacancy}</Text>
      </View>
    );
  }

  _renderContent(obj, i) {
    return (
      <View key={i} style={{marginBottom: 20}}>
        <Text>ការស្វែងយល់អំពីខ្លួនឯងលើកទី { i + 1 }</Text>

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
          <View style={{margin: 16, flex: 1}}>
            { this.state.game.personalUnderstandings.map((obj, i) => {
              { return (this._renderContent(obj, i)) }
            })}
          </View>
        </ScrollView>
      </View>
    )
  }
}
