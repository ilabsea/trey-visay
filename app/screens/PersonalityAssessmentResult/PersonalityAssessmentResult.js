import React, { Component } from 'react';
import {
  BackHandler,
  View,
  Text,
} from 'react-native';

import { Button, Icon } from 'native-base';
import firebase from 'react-native-firebase';

import FooterBar from '../../components/footer/FooterBar';
import { NavigationActions } from 'react-navigation';
import BackConfirmDialog from '../../components/shared/back_confirm_dialog';
import realm from '../../db/schema';
import User from '../../utils/user';
import Sidekiq from '../../utils/models/sidekiq';
import ScrollableHeader from '../../components/scrollable_header';
import Result from './Result';
import keyword from '../../data/analytics/keyword';

export default class PersonalityAssessmentResult extends Component {
  constructor(props) {
    super(props);

    let assessments = realm.objects('PersonalityAssessment').filtered('isDone = false AND userUuid = "' + User.getID() + '"');
    let assessment = assessments[assessments.length - 1];

    this.state = {
      assessment: assessment,
    };

    this._backHandler();
  }

  _backHandler() {
    this.props.navigation.setParams({
      _handleBack: this._handleBack.bind(this),
      goNext: this._goNext.bind(this)
    });
    BackHandler.addEventListener('hardwareBackPress', this._onClickBackHandler);
  }

  _handleBack() {
    this.setState({confirmDialogVisible: true});
  }

  _onClickBackHandler = () => {
    this.setState({confirmDialogVisible: true});

    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);
    return true
  }

  _goNext = () => {
    firebase.analytics().logEvent(keyword.PERSONALITY_ASSESSMENT_FINISHED);
    realm.write(() => {
      realm.create('PersonalityAssessment', this._buildData(), true);
      Sidekiq.create(this.state.assessment.uuid, 'PersonalityAssessment');
      this._closeDialog();
    });
  }

  _onYes() {
    realm.write(() => {
      realm.create('PersonalityAssessment', this._buildData(), true);
      Sidekiq.create(this.state.assessment.uuid, 'PersonalityAssessment');
      this._closeDialog();
    });
  }

  _closeDialog() {
    this.setState({confirmDialogVisible: false});
    this.props.navigation.reset([NavigationActions.navigate({ routeName: 'PersonalityAssessmentScreen' })]);
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.assessment);
      this._closeDialog();
    });
  }

  _buildData() {
    return {
      uuid: this.state.assessment.uuid,
      step: 'ResultScreen',
      isDone: true
    };
  }

  _renderContent = () => {
    return (
      <View style={{paddingTop: 4}}>
        <Result
          assessment={this.state.assessment}
          navigation={this.props.navigation}/>
      </View>
    )
  }

  render() {
    let title = 'លទ្ធផលតេស្ត';

    return (
      <View style={{flex: 1}}>
        <ScrollableHeader
          renderContent={ this._renderContent }
          largeTitle={title}
          title={title}
        />

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
        <FooterBar icon='keyboard-arrow-right' text='រួចរាល់' onPress={this._goNext} />
      </View>
    )
  }
}
