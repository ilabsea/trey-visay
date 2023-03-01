import React, { Component } from 'react';
import {
  View,
  Text,
  BackHandler,
  Platform
} from 'react-native';

import Toast, { DURATION } from 'react-native-easy-toast';

import BackConfirmDialog from '../../../components/shared/back_confirm_dialog';
import CloseButton from '../../../components/shared/close_button';

import mainStyles from '../../../assets/style_sheets/main/main';
import { Colors } from '../../../assets/style_sheets/main/colors';
import CheckboxGroup from '../../../components/CheckboxGroup';
import FooterBar from '../../../components/footer/FooterBar';
import MathUtil from '../../../utils/math';

import ScrollableHeader from '../../../components/scrollable_header';
import scrollHeaderStyles from '../../../assets/style_sheets/scroll_header';
import { Container, Content, Icon } from 'native-base';
import * as Progress from 'react-native-progress';
import ProgressStep from '../ProgressStep/ProgressStep';

import realm from '../../../db/schema';
import User from '../../../utils/user';
import characteristicList from '../../../data/json/characteristic_jobs';
import entries from '../../../data/json/personalities';
import { navigate, reset } from '../../StackNav/RootNavigation';

export default class PersonalityScreen extends Component {
  currentGroup;

  state = {
    jobs: [],
    confirmDialogVisible: false,
    user: '',
    game: '',
    personalities: entries,
    characteristicEntries: [],
  }

  componentWillMount() {
    this.props.navigation.setParams({_handleBack: this._handleBack.bind(this)});
    this._initState();
    this._backHandler();
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

  _initState() {
    let user = User.getCurrent();
    let game = user.games[user.games.length - 1];

    if (!!game.characteristicEntries.length) {
      let obj = { characteristicEntries: game.characteristicEntries.map((obj)=> obj.value) };
      this.setState(obj);
    }

    this.setState({user: user, game: game});
  }

  _onYes() {
    realm.write(() => {
      realm.create('Game', this._buildData('PersonalityScreen'), true);
      this._closeDialog();
    });
  }

  _closeDialog() {
    this.setState({confirmDialogVisible: false});

    reset({ routeName: 'CareerCounsellorScreen' })
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.game);
      this._closeDialog();
    });
  }

  _findAndSetMaximumScoreGroup() {
    let arr = [];

    characteristicList.map((obj, i) => {
      let arr1 = obj.entries;
      let arr2 = this.state.characteristicEntries;
      let matchEntries = arr1.filter((n) => arr2.includes(n));

      arr.push({id: i+1, score: matchEntries.length});
    })

    let max = MathUtil.findMaxObjBy(arr, 'score');
    this.currentGroup = max
  }

  _goNext() {
    if (this.state.characteristicEntries.length < 5) {
      return this.refs.toast.show('សូមជ្រេីសរេីសបុគ្គលិកលក្ខណៈចំនួន ៥!', DURATION.SHORT);
    }
    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);
    this._findAndSetMaximumScoreGroup();
    this._handleSubmit();
  }

  _handleSubmit() {
    realm.write(() => {
      realm.create('Game', this._buildData('PersonalityJobsScreen'), true);
      let title = characteristicList.find((obj) => obj.id == this.currentGroup.id).career_title;
      this._goToPersonalityJobsScreen(this.currentGroup.id, title);
    });
  }

  _buildData(step) {
    let data = this.state.characteristicEntries.map((value) => {
      return { value: value };
    })

    let obj =  {
      uuid: this.state.game.uuid,
      characteristicEntries: data,
      characteristicId: this.currentGroup && this.currentGroup.id || null,
      step: step || 'PersonalityJobsScreen'
    }

    return obj;
  }

  _formatDataForCheckbox(personalities) {
    return personalities.map(obj => {return {value: obj, label: obj}})
  }

  _handleChecked(arr) {
    this.setState({characteristicEntries: arr});
  }

  _renderPersonalities() {
    let checkboxes = this._formatDataForCheckbox(this.state.personalities);

    return(
      <View style={[mainStyles.curveBox, { paddingLeft: 0, marginTop: 10}]}>
        <CheckboxGroup
          onSelect={(selected) => {this._handleChecked(selected)}}
          options={checkboxes}
          checked={this.state.characteristicEntries}
        />
      </View>
    )
  }

  _goToPersonalityJobsScreen(groupNumber, title) {
    this.currentGroup = groupNumber;

    navigate('PersonalityJobsScreen', { title: title, groupNumber: groupNumber})
  }

  _renderContent = () => {
    return (
      <View style={{paddingBottom: 20}}>
        <View style={{flexDirection: 'row', padding: 16, paddingBottom: 0, flex: 1}}>
          <Text>
            ចូរប្អូនជ្រើសរើស បុគ្គលិកលក្ខណៈខាងក្រោមឱ្យបាន យ៉ាងតិចចំនួន៥ ដែលសមស្របទៅនឹងលក្ខណៈសម្បត្តិរបស់ប្អូនផ្ទាល់
            និងអាចជួយប្អូនក្នុងការជ្រើសរើស អាជីពមួយ ជាក់លាក់នាពេលអនាគត។
          </Text>
        </View>

        { this._renderPersonalities() }
      </View>
    )
  }

  _renderNavigation = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <CloseButton />
        <Text style={scrollHeaderStyles.whiteNavTitle}>បំពេញបុគ្គលិកលក្ខណៈ</Text>
      </View>
    )
  }

  _renderForeground = () => {
    return (
      <View>
        <ProgressStep progressIndex={1} />

        <View>
          <View style={scrollHeaderStyles.progressTextWrapper}>
            <Text style={scrollHeaderStyles.progressText}>ឆ្លើយយ៉ាងតិច5</Text>
          </View>

          <Progress.Bar progress={this.state.characteristicEntries.length/5} width={null} color='#fff' unfilledColor='rgb(19, 93, 153)' borderColor='transparent' />
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
          progressValue={this.state.characteristicEntries.length/5}
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
  }
}
