import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  BackHandler,
  Image,
  Platform
} from 'react-native';

import Toast, { DURATION } from 'react-native-easy-toast';
import { NavigationActions } from 'react-navigation';

import BackConfirmDialog from '../../components/shared/back_confirm_dialog';
import CloseButton from '../../components/shared/close_button';

import mainStyles from '../../assets/style_sheets/main/main';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Images from '../../assets/images';
import CheckboxGroup from '../../components/checkbox_group';
import MathUtil from '../../utils/math';

import realm from '../../db/schema';
import User from '../../utils/user';
import characteristicList from '../../data/json/characteristic_jobs';
import entries from '../../data/json/personalities';

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
    this.props.navigation.setParams({
      _handleBack: this._handleBack.bind(this),
      goNext: this._goNext.bind(this)
    });
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
    this.props.navigation.reset([NavigationActions.navigate({ routeName: 'AssessmentScreen' }), NavigationActions.navigate({ routeName: 'CareerCounsellorScreen' })], 1)
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
    let arr = [];

    for(let i = 0; i < personalities.length; i++) {
      arr.push({ value: personalities[i], label: personalities[i] })
    }
    return arr;
  }

  _handleChecked(arr) {
    this.setState({characteristicEntries: arr});
  }

  _renderPersonalities() {
    let checkboxes = this._formatDataForCheckbox(this.state.personalities);

    return(
      <View style={mainStyles.box}>
        <CheckboxGroup
          onSelect={(selected) => {this._handleChecked(selected)}}
          items={checkboxes}
          checked={this.state.characteristicEntries}
          style={{
            icon: {
              color: '#4caf50',
              size: 30
            },
            container: {
              flexDirection: 'row',
              borderTopWidth: 0.5,
              borderColor: '#ccc',
              paddingVertical: 8,
            },
            label: {
              color: '#333',
              fontSize: 16,
              marginLeft: 10
            }
          }}
        />
      </View>
    )
  }

  _goToPersonalityJobsScreen(groupNumber, title) {
    this.currentGroup = groupNumber;
    this.props.navigation.navigate('PersonalityJobsScreen', { title: title, groupNumber: groupNumber})
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={mainStyles.instructionContainer}>
            <MaterialIcon name='stars' color='#e94b35' size={24} style={{marginRight: 8}} />
            <Text style={[mainStyles.text, {flex:1}]}>
              ចូរប្អូនជ្រើសរើស បុគ្គលិកលក្ខណៈខាងក្រោមឲ្យបាន យ៉ាងតិចចំនួន៥ ដែលសមស្របទៅនឹងលក្ខណៈសម្បត្តិរបស់ប្អូនផ្ទាល់
              និងអាចជួយប្អូនក្នុងការជ្រើសរើស អាជីពមួយ ជាក់លាក់នាពេលអនាគត។
            </Text>
          </View>

          { this._renderPersonalities() }
        </ScrollView>

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
        <Toast ref='toast' positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
      </View>
    );
  };
}
