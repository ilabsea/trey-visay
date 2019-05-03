import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  BackHandler,
} from 'react-native';

import Toast, { DURATION } from 'react-native-easy-toast';
import { NavigationActions } from 'react-navigation';
import { Divider } from 'react-native-elements';

import RadioButtonGroup from '../../components/radio_button_group';
import BackConfirmDialog from '../../components/shared/back_confirm_dialog';
import FooterBar from '../../components/footer/FooterBar';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import mainStyles from '../../assets/style_sheets/main/main';

import realm from '../../db/schema';
import User from '../../utils/user';
import characteristicList from '../../data/json/characteristic_jobs';

export default class SummaryScreen extends Component {
  constructor(props) {
    super(props);

    this.props.navigation.setParams({
      _handleBack: this._handleBack.bind(this),
      goNext: this._goNext.bind(this)
    });
    this._initState();
    this._backHandler();
  }

  _initState() {
    let user = User.getCurrent();
    let game = user.games[user.games.length - 1];
    let currentGroup = characteristicList.find((obj) => obj.id == game.characteristicId);
    let careerCodes = game.personalityCareers.map((obj) => obj.value);
    let userCareers = currentGroup.careers.filter((item, pos) => { return careerCodes.includes(item.code) });

    this.state = {
      userCareers: userCareers,
      currentGroup: currentGroup,
      user: user,
      game: game,
      confirmDialogVisible: false,
      mostFavorableJob: game.mostFavorableJobCode,
    };
  }

  _handleBack() {
    this.setState({confirmDialogVisible: true});
  }

  _backHandler() {
    BackHandler.addEventListener('hardwareBackPress', this._onClickBackHandler);
  }

  _onClickBackHandler = () => {
    this.setState({confirmDialogVisible: true});

    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);
    return true
  }

  _onYes() {
    realm.write(() => {
      realm.create('Game', this._buildData('SummaryScreen'), true);
      this._closeDialog();
    });
  }

  _closeDialog() {
    this.setState({confirmDialogVisible: false});
    this.props.navigation.reset([NavigationActions.navigate({ routeName: 'AssessmentScreen' }), NavigationActions.navigate({ routeName: 'CareerCounsellorScreen' })], 1)
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.game);
      this._closeDialog();
    });
  }

  _buildData(step) {
    let obj =  {
      uuid: this.state.game.uuid,
      mostFavorableJobCode: this.state.mostFavorableJob || null,
      goalCareer: this.state.mostFavorableJob && this.state.currentGroup.careers.find((obj) => obj.code == this.state.mostFavorableJob).name || null,
      step: step || 'RecommendationScreen'
    }

    return obj;
  }

  _formatDataForCheckbox(jobs) {
    let arr = [];

    for(let i = 0; i < jobs.length; i++) {
      arr.push({ value: jobs[i].code, label: jobs[i].name })
    }
    return arr;
  }

  _goNext() {
    if (!this.state.mostFavorableJob) {
      return this.refs.toast.show('សូូមជ្រើសរើសមុខរបរចំនួន 1!', DURATION.SHORT);
    }

    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);
    this._handleSubmit();
  }

  _handleSubmit() {
    realm.write(() => {
      realm.create('Game', this._buildData('RecommendationScreen'), true);
      this.props.navigation.navigate('RecommendationScreen');
    });
  }

  _renderRadioGroups() {
    return(
      <View style={mainStyles.box}>
        <Text style={[mainStyles.sectionText, {paddingBottom: 8}]}>ចូរជ្រើសរើស មុខរបរតែមួយគត់ដែលអ្នកពេញចិត្តបំផុត</Text>
        <Divider />
        <View style={{margin: 16}}>
          <RadioButtonGroup
            radio_props={this._formatDataForCheckbox(this.state.userCareers)}
            onPress={(text) => this.setState({ mostFavorableJob: text })}
            value={this.state.mostFavorableJob} >
          </RadioButtonGroup>
        </View>
      </View>
    )
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={mainStyles.instructionContainer}>
            <MaterialIcon name='stars' color='#e94b35' size={24} style={{marginRight: 8}} />
            <Text style={[mainStyles.text, {flex: 1}]}>
              ចូរប្អូនជ្រើសរើស មុខរបរ ឬការងារ ១ដែលប្អូនចូលចិត្តបំផុត ដើម្បីដាក់គោលដៅ និងផែនការអនាគត!
            </Text>
          </View>

          { this._renderRadioGroups() }
        </ScrollView>

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
        <Toast ref='toast' positionValue={ 120 }/>
      </View>
    );
  };
}
