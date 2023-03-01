import React, { Component } from 'react';
import {
  View,
  Text,
  BackHandler,
  Platform
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
// import { NavigationActions } from 'react-navigation';
import { CommonActions } from '@react-navigation/native';
import { Divider } from 'react-native-paper';

import mainStyles from '../../../assets/style_sheets/main/main';
import { Colors } from '../../../assets/style_sheets/main/colors';
import BackConfirmDialog from '../../../components/shared/back_confirm_dialog';
import CheckboxGroup from '../../../components/CheckboxGroup';
import FooterBar from '../../../components/footer/FooterBar';
import CloseButton from '../../../components/shared/close_button';

import realm from '../../../db/schema';
import User from '../../../utils/user';
import characteristicList from '../../../data/json/characteristic_jobs';

import ScrollableHeader from '../../../components/scrollable_header';
import scrollHeaderStyles from '../../../assets/style_sheets/scroll_header';
import * as Progress from 'react-native-progress';
import ProgressStep from '../ProgressStep/ProgressStep';
import { Content } from 'native-base';


import { getParam, navigate, reset } from '../../StackNav/RootNavigation';

export default class PersonalityJobsScreen extends Component {
  constructor(props) {
    super(props);

    this._initState();
    this._backHandler();
  }

  _initState() {
    let user = User.getCurrent();
    let game = user.games[user.games.length - 1];
    let currentGroup = characteristicList.find((obj) => obj.id == game.characteristicId);
    let selectedJobIds = game.personalityCareers.map((obj) => obj.value);

    this.state = {
      user: user,
      game: game,
      currentGroup: currentGroup,
      jobs: selectedJobIds,
    };

    this.props.navigation.setParams({
      _handleBack: this._handleBack.bind(this),
      title: currentGroup.career_title,
      total: selectedJobIds.length,
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

  _buildData(step) {
    let data = this.state.jobs.map((value) => {
      return { value: value };
    })

    let obj =  {
      uuid: this.state.game.uuid,
      personalityCareers: data,
      step: step || 'SummaryScreen'
    }

    return obj;
  }

  _onYes() {
    realm.write(() => {
      realm.create('Game', this._buildData('PersonalityJobsScreen'), true);
      this._closeDialog();
    });
  }

  _closeDialog() {
    this.setState({confirmDialogVisible: false});

    reset({ routeName: 'CareerCounsellorScreen' });
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.game);
      this._closeDialog();
    });
  }

  _renderCheckBoxes() {
    let checkboxes = this._formatDataForCheckbox(this.state.currentGroup.id);

    return (
      <View style={[{backgroundColor: '#fff', margin: 20, marginTop: 10}]}>
        <CheckboxGroup
          onSelect={(selected) => {this._handleChecked(selected)}}
          options={checkboxes}
          checked={this.state.jobs}
          limitCheckedItems={3}
        />
      </View>
    )
  }

  _formatDataForCheckbox(id) {
    let jobs = characteristicList.find((obj) => obj.id == id).careers;

    return jobs.map(job => {return {value: job.code, label: job.name}});
  }

  _handleChecked(careers) {
    if (careers.length > 3) {
      return this.refs.toast.show('អ្នកអាចជ្រើសរើសមុខរបរចំនួន 3 ប៉ុណ្ណោះ!',  DURATION.SHORT);
    }

    this.props.navigation.setParams({total: careers.length});
    this.setState({jobs: careers});
  }

  _goNext() {
    if (this.state.jobs.length != 3) {
      return this.refs.toast.show('សូមជ្រើសរើសមុខរបរចំនួន 3គត់!', DURATION.SHORT);
    }

    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);
    this._handleSubmit();
  }

  _handleSubmit() {
    realm.write(() => {
      realm.create('Game', this._buildData('SummaryScreen'), true);
      navigate('SummaryScreen');
    });
  }

  _renderContent = () => {
    return (
      <View>
        <View style={{flexDirection: 'row', padding: 16, paddingBottom: 0, flex: 1}}>
          <Text style={{flex: 1}}>សូមជ្រើសរើសមុខរបរខាងក្រោមយ៉ាងច្រើនចំនួន៣៖</Text>
        </View>

        { this._renderCheckBoxes() }
      </View>
    )
  }

  _renderNavigation = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <CloseButton />
        <Text style={scrollHeaderStyles.whiteNavTitle}>{!!this.props.route.params && this.props.route.params.title}</Text>
      </View>
    )
  }

  _renderForeground = () => {
    return (
      <View>
        <ProgressStep progressIndex={2} />

        <View>
          <View style={scrollHeaderStyles.progressTextWrapper}>
            <Text style={scrollHeaderStyles.progressText}>ឆ្លើយរួចរាល់</Text>
          </View>

          <Progress.Bar progress={this.state.jobs.length/3} width={null} color='#fff' unfilledColor='rgb(19, 93, 153)' borderColor='transparent' />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollableHeader
          backgroundColor={Colors.blue}
          textColor={'#fff'}
          statusBarColor={Colors.blueStatusBar}
          barStyle={'light-content'}
          renderContent={ this._renderContent }
          renderNavigation={ this._renderNavigation }
          renderForeground={this._renderForeground }
          headerMaxHeight={162}
          enableProgressBar={true}
          progressValue={this.state.jobs.length/3}
        />

        <FooterBar icon='keyboard-arrow-right' text='បន្តទៀត' onPress={this._goNext.bind(this)} />

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
        <Toast ref='toast' positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
      </View>
    )
  };
}
