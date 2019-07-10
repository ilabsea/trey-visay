import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';

import firebase from 'react-native-firebase';
import Button from '../../components/shared/button';

import { FontSetting } from '../../assets/style_sheets/font_setting';
import realm from '../../db/schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';
import mainStyles from '../../assets/style_sheets/main/main';
import { Colors } from '../../assets/style_sheets/main/colors';
import { Content, Body, Icon, CardItem } from 'native-base';

import ScrollableHeader from '../../components/scrollable_header';
import BackButton from '../../components/shared/back_button';
import ButtonList from '../../components/list/button_list';
import TestListItem from '../../components/GameHistory/TestListItem';
import keyword from '../../data/analytics/keyword';

export default class PersonalityAssessment extends Component {
  constructor(props) {
    super(props);

    let assessments = realm.objects('PersonalityAssessment').filtered('userUuid="' + User.getID() +'"');
    let assessment = assessments[assessments.length-1];
    let completedAssessments = realm.objects('PersonalityAssessment').filtered('isDone = true AND userUuid="' + User.getID() +'"').sorted('createdAt', true);
    let isContinued = !!assessment && !assessment.isDone && !!assessment.step;

    this.state = {
      assessment: assessment,
      completedAssessments: completedAssessments,
      isContinued: isContinued,
    };
  }

  _renderInstruction() {
    return (
      <View>
        <CardItem>
          <Body>
            <Text>សួរស្តីសាជាថ្មី </Text>
            <Text>ការធ្វើតេស្តស្វែងយល់អំពី បុគ្គលិកលក្ខណៈ </Text>
          </Body>
        </CardItem>

        <CardItem footer style={{flexDirection: 'column'}}>
          <Button
            style={[styles.button]}
            onPress={this._startNewAssessment.bind(this)}>
            <Text style={styles.btnText}>
              ចាប់ផ្តើមថ្មី
            </Text>
          </Button>

          { this.state.isContinued &&
            <Button
              style={[styles.button, { backgroundColor: '#1976d2', marginTop: 18}]}
              onPress={this._continueStep.bind(this)}
              >
              <Text style={styles.btnText}>បន្តទៅវគ្គមុន</Text>
            </Button>
          }

        </CardItem>
      </View>
    )
  }

  _continueStep() {
    let category = this.state.assessment.step.split('Screen')[0].toLowerCase();
    this.props.navigation.navigate(this.state.assessment.step, {category: category});
  }

  _startNewAssessment() {
    firebase.analytics().logEvent(keyword.PERSONALITY_ASSESSMENT_BEGAN);
    let uncompletedAssessments = realm.objects('PersonalityAssessment').filtered('isDone = false AND userUuid = "' + User.getID() + '"');

    realm.write(() => {
      realm.delete(uncompletedAssessments);
      realm.create('PersonalityAssessment', this._buildData());

      this.setState({isContinued: false});
      this.props.navigation.navigate('RealisticScreen');
    });
  }

  _buildData() {
    return {
      uuid: uuidv4(),
      userUuid: User.getID(),
      createdAt: new Date()
    };
  }

  _renderHistory() {
    let count = this.state.completedAssessments.length;

    return(
      <Content padder style={{marginHorizontal: 8}}>
        { !!count &&
          <Text style={[mainStyles.sectionText, {marginLeft: 0}]}>
            <Text>លទ្ធផលធ្វើតេស្ត</Text>
          </Text>
        }

        { this.state.completedAssessments.map((assessment, i) => this._renderListItem(assessment, i, count)) }
      </Content>
    );
  }

  _renderListItem = (assessment, index, count) => {
    return (
      <TestListItem
        key={index}
        number={count - index}
        createdAt={assessment.createdAt}
        onPress={() => this.props.navigation.navigate('AssessmentResultHistoryScreen', {num: (count - index), assessmentUuid: assessment.uuid})}
      />
    )
  }

  _renderAbout() {
    return (
      <View style={{marginVertical: 12, backgroundColor: 'white'}}>
        <ButtonList
          hasLine={true}
          icon={{color: Colors.blue, src: require('../../assets/icons/others/info.png')}}
          onPress={() => { this.props.navigation.navigate('AboutPersonalityAssessment') }}
          title='អំពីការធ្វើតេស្តស្វែងយល់បុគ្គលិកលក្ខណៈ' />
      </View>
    )
  }

  _renderContent = () => {
    return (
      <Content>
        { this._renderAbout() }
        { this._renderInstruction() }
        { this._renderHistory() }
      </Content>
    )
  }

  _renderNavigation = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <BackButton navigation={this.props.navigation}/>
      </View>
    )
  }

  render() {
    let title = 'ស្វែងយល់អំពីបុគ្គលិកលក្ខណៈ';

    return (
      <ScrollableHeader
        renderContent={ this._renderContent }
        renderNavigation={ this._renderNavigation }
        title={title}
        largeTitle={title}
      />
    )
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 3,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '100%'
  },
  btnText: {
    fontSize: FontSetting.button_text,
    color: '#fff',
    fontWeight: 'bold'
  }
});
