import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  BackHandler,
  Platform
} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import BackConfirmDialog from '../../../components/shared/back_confirm_dialog';
import FooterBar from '../../../components/footer/FooterBar';

import mainStyles from '../../../assets/style_sheets/main/main';

// import { NavigationActions } from 'react-navigation';
import { CommonActions } from '@react-navigation/native';

import realm from '../../../db/schema';
import User from '../../../utils/user';
import characteristicList from '../../../data/json/characteristic_jobs';

import ScrollableHeader from '../../../components/scrollable_header';
import CloseButton from '../../../components/shared/close_button';
import Recommendation from '../../../components/Recommendation/Recommendation';
import { Colors } from '../../../assets/style_sheets/main/colors';

export default class RecommendationScreen extends Component {
  constructor(props) {
    super(props);

    this._initState();
    this._backHandler();
  }

  _initState() {
    let user = User.getCurrent();
    let game = user.games[user.games.length - 1];
    let currentGroup = characteristicList.find((obj) => obj.id == game.characteristicId);
    let currentJob = currentGroup.careers.find((obj) => obj.code == game.mostFavorableJobCode);

    this.state = {
      currentJob: currentJob,
      user: user,
      game: game,
      gameSubject: game.gameSubject,
      currentGroup: currentGroup,
    };

    this.props.navigation.setParams({
      _handleBack: this._handleBack.bind(this),
      goNext: this._goNext.bind(this)
    });
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
    this._closeDialog();
  }

  _closeDialog() {
    this.setState({confirmDialogVisible: false});
    this.props.navigation.reset([CommonActions.navigate({ routeName: 'CareerCounsellorScreen' })])
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.game);
      this._closeDialog();
    });
  }

  _goNext() {
    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);

    this._handleSubmit();
  }

  _buildData() {
    let obj = Object.assign({}, this.state, {
      uuid: this.state.game.uuid,
      goalCareer: this.state.currentJob,
      step: 'GoalScreen'
    })

    return obj;
  }

  _handleSubmit() {
    realm.write(() => {
      this.state.game.step = 'GoalScreen';
      this.props.navigation.navigate('GoalScreen', {career: this.state.currentJob.name});
    });
  }

  _renderContent = () => {
    return (
      <Recommendation
        user={this.state.user}
        currentJob={this.state.currentJob}
        currentGroup={this.state.currentGroup}
        gameSubject={this.state.gameSubject}
        game={this.state.game}/>
    )
  }

  render() {
    let title = 'ការផ្តល់អនុសាសន៍';
    let buttonColor=Platform.OS == 'ios' ? Colors.blue : '#000';

    return (
      <View style={{flex: 1}}>
        <ScrollableHeader
          renderContent={ this._renderContent }
          renderNavigation={ () => <CloseButton buttonColor={buttonColor} navigation={this.props.navigation}/> }
          title={title}
          largeTitle={title}
        />

        <FooterBar icon='keyboard-arrow-right' text='បន្តទៀត' onPress={this._goNext.bind(this)} />

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
      </View>
    )
  };
}
