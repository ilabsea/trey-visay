import React, { Component } from 'react';
import {
  View,
  Text,
  BackHandler,
  Platform
} from 'react-native';

import Toast, { DURATION } from 'react-native-easy-toast'
import { NavigationActions } from 'react-navigation';

import { Divider } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import RadioGroup from '../../../components/radio_group';
import BackConfirmDialog from '../../../components/shared/back_confirm_dialog';
import CloseButton from '../.././../components/shared/close_button';
import FooterBar from '../../../components/footer/FooterBar';

import ScrollableHeader from '../../../components/scrollable_header';
import scrollHeaderStyles from '../../../assets/style_sheets/scroll_header';
import { Container, Content, Icon } from 'native-base';
import * as Progress from 'react-native-progress';
import ProgressStep from '../ProgressStep/ProgressStep';

import styles from '../../../assets/style_sheets/profile_form';

import realm from '../../../db/schema';
import User from '../../../utils/user';
import uuidv4 from '../../../utils/uuidv4';

export default class SubjectScreen extends Component {
  subjects = {
    khmerReading: '',
    khmerWriting: '',
    english: '',
    math: '',
    socialStudyEthicsAndCitizenship: '',
    socialStudyGeography: '',
    socialStudyHistory: '',
    sciencePhysics: '',
    scienceChemistry: '',
    scienceBiology: '',
    softSkillCommunication: '',
    softSkillBrave: '',
    softSkillTeamwork: '',
    softSkillProblemSolving: '',
    softSkillPublicSpeaking: '',
  };

  subjectKeys = Object.keys(this.subjects);

  constructor(props) {
    super(props);

    props.navigation.setParams({_handleBack: this._handleBack.bind(this)});

    let user = User.getCurrent();
    let game = user.games[user.games.length - 1];
    let gameSubject = game.gameSubject;
    let subjects = this.subjects;

    if (!!gameSubject) {
      subjects = gameSubject;
    }

    this.state = {
      ...subjects,
      confirmDialogVisible: false,
      user: user,
      game: game,
      progress: this._getProgress(gameSubject),
    }

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

  _getProgress(gameSubject) {
    if (!gameSubject) { return 0 }

    for(const key of this.subjectKeys) {
      this.subjects[key] = gameSubject[key]
    }

    this._calCulateProgress();
  }

  _renderRadioItem(group, i) {
    let gradientColor = 'transparent';
    let borderStyle = {};

    if (this.state.submit && !this.state[group.stateName]) {
      gradientColor = 'rgba(233,75,53,0.12)';
      borderStyle = { backgroundColor: '#e94b35', height: 2 };
    }

    return(
      <View key={i} style={{paddingVertical: 8}}>
        <Text>{group.label}</Text>

        <Divider style={borderStyle}/>

        <LinearGradient style={styles.container} colors={['transparent', gradientColor]}>
          <RadioGroup
            options={[{ label: 'ខ្លាំង', value: 'ខ្លាំង' }, { label: 'មធ្យម', value: 'មធ្យម' }, { label: 'ខ្សោយ', value: 'ខ្សោយ' }]}
            onPress={(text) => this._handleSetState(group.stateName, text)}
            value={this.state[group.stateName]} >
          </RadioGroup>
        </LinearGradient>
      </View>
    )
  }

  _renderRadioGroups(obj) {
    return(
      <View style={[styles.box, {marginVertical: 10}]}>
        <View style={{marginHorizontal: -16, marginTop: -16, backgroundColor: 'rgba(24, 118, 211, 0.2)', height: 54, justifyContent: 'center', paddingHorizontal: 16, borderTopLeftRadius: 8, borderTopRightRadius: 8}}>
          <Text style={[styles.subTitle, {color: 'rgb(24, 118, 211)'}]}>{obj.title}</Text>
        </View>

        { obj.groups.map((group, i) => {
          { return(this._renderRadioItem(group, i)) }
        })}
      </View>
    )
  }

  _handleSetState(stateName, text) {
    let obj = {};
    this.subjects[stateName] = text;
    obj[stateName] = text;
    obj.progress = this._calCulateProgress();

    this.setState(obj);
  }

  _calCulateProgress() {
    let arr = this.subjectKeys.filter(key => !!this.subjects[key]);
    let progress = arr.length / this.subjectKeys.length;

    return progress;
  }

  _renderKhmer() {
    let obj = {
      title: 'ភាសាខ្មែរ',
      groups: [
        { stateName: 'khmerReading', label: 'ការអាន' },
        { stateName: 'khmerWriting', label: 'ការសរសេរ' },
      ]
    }

    return this._renderRadioGroups(obj);
  }

  _renderEnglish() {
    let obj = {
      title: 'ភាសាបរទេស',
      groups: [
        { stateName: 'english', label: 'ភាសាអង់គ្លេស/ភាសាបារាំង' },
      ]
    }

    return this._renderRadioGroups(obj);
  }

  _renderSocialStudies() {
    let obj = {
      title: 'សិក្សាសង្គម',
      groups: [
        { stateName: 'socialStudyEthicsAndCitizenship', label: 'សីលធម៌ និង ពលរដ្ឋ' },
        { stateName: 'socialStudyGeography', label: 'ភូមិវិទ្យា' },
        { stateName: 'socialStudyHistory', label: 'ប្រវត្តិវិទ្យា' },
      ]
    }

    return this._renderRadioGroups(obj);
  }

  _renderScience() {
    let obj = {
      title: " វិទ្យាសាស្ត្រ",
      groups: [
        { stateName: 'math', label: 'គណិតវិទ្យា' },
        { stateName: 'sciencePhysics', label: 'រូបវិទ្យា' },
        { stateName: 'scienceChemistry', label: 'គីមីវិទ្យា' },
        { stateName: 'scienceBiology', label: 'ជីវៈវិទ្យា' },
      ]
    }

    return this._renderRadioGroups(obj);
  }

  _renderSoftSkill() {
    let obj = {
      title: 'ជំនាញទន់',
      groups: [
        { stateName: 'softSkillCommunication', label: 'ទំនាក់ទំនង' },
        { stateName: 'softSkillBrave', label: 'ក្លាហាន' },
        { stateName: 'softSkillTeamwork', label: 'ក្រុមការងារ' },
        { stateName: 'softSkillProblemSolving', label: 'ដោះស្រាយបញ្ហា' },
        { stateName: 'softSkillPublicSpeaking', label: 'ការនិយាយជាសាធារណៈ' },
      ]
    }

    return this._renderRadioGroups(obj);
  }

  _goNext() {
    if (!this._isValid()) {
      this.setState({submit: true});
      return this.refs.toast.show('សូមបំពេញមុខវិជ្ជាទាំងអស់ជាមុនសិន...!', DURATION.SHORT);
    }

    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);
    this._handleSubmit();
  }

  _isValid() {
    let keys = ['khmerReading', 'khmerWriting', 'english', 'math', 'socialStudyEthicsAndCitizenship', 'socialStudyGeography', 'socialStudyHistory', 'sciencePhysics', 'scienceChemistry', 'scienceBiology', 'softSkillCommunication', 'softSkillBrave', 'softSkillTeamwork', 'softSkillProblemSolving', 'softSkillPublicSpeaking'];
    let arr = keys.filter((key) => !!this.state[key]);

    return arr.length == keys.length;
  }

  _handleSubmit() {
    realm.write(() => {
      realm.create('Game', this._buildData('PersonalityScreen'), true);
      this.props.navigation.navigate('PersonalityScreen');
    });
  }

  _buildData(step) {
    let data = {
      uuid: this.state.game.uuid,
      step: step || 'PersonalityScreen',
      gameSubject: Object.assign({}, this.state, { uuid: uuidv4() })
    }

    return data;
  }

  _onYes() {
    realm.write(() => {
      realm.create('Game', this._buildData('SubjectScreen'), true);
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

  _renderContent = () => {
    return (
      <View style={{margin: 20}} >
        <Text>ចូរបំពេញគ្រប់មុខវិជ្ជាខាងក្រោម៖</Text>

        { this._renderKhmer() }
        { this._renderEnglish() }
        { this._renderSocialStudies() }
        { this._renderScience() }
        { this._renderSoftSkill() }
      </View>
    )
  }

  _renderNavigation = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <CloseButton navigation={this.props.navigation}/>
        <Text style={{color: '#fff'}}>បំពេញមុខវិជ្ជា</Text>
      </View>
    )
  }

  _renderForeground = () => {
    return (
      <View>
        <ProgressStep progressIndex={0} />

        <View>
          <View style={{borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingHorizontal: 5, paddingTop: 6, width: 110, backgroundColor: 'rgb(22, 99, 176)'}}>
            <Text style={{color: '#fff', fontSize: 13, lineHeight: 22}}>ឆ្លើយរួចរាល់</Text>
          </View>

          <Progress.Bar progress={this.state.progress} width={null} color='#fff' unfilledColor='rgb(19, 93, 153)' borderColor='transparent' />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollableHeader
          renderContent={ this._renderContent }
          renderNavigation={ this._renderNavigation }
          renderForeground={this._renderForeground }
          headerMaxHeight={180}
          enableProgressBar={true}
          progressValue={this.state.progress}
        />

        <FooterBar icon='keyboard-arrow-right' text='បន្តទៀត' onPress={this._goNext.bind(this)} />

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
        <Toast ref='toast' positionValue={Platform.OS == 'ios' ? 120 : 140}/>
      </View>
    )
  };
}
