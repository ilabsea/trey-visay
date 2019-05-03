import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  BackHandler,
  Platform
} from 'react-native';

import { Container, Header, Content, Text, Body, Footer } from 'native-base';

import Toast, { DURATION } from 'react-native-easy-toast'

import { Divider } from 'react-native-elements';
import RadioGroup from '../../components/radio_group';
import BackConfirmDialog from '../../components/shared/back_confirm_dialog';
import FooterBar from '../../components/footer/FooterBar';
import CardView from '../../components/subject_test/card_view';

import mainStyles from '../../assets/style_sheets/main/main';

import realm from '../../db/schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';
import Subjects from '../../data/json/subjects/subjects';

export default class SubjectScreen extends Component {
  state = {
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
    confirmDialogVisible: false,
    user: '',
    game: ''
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
    this.setState({ confirmDialogVisible: true });
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

    if (!!game.gameSubject) {
      this._handleAssignGameSubject(game.gameSubject);
    }

    this.setState({user: user, game: game});
  }

  _handleAssignGameSubject(gameSubject) {
    let obj = {};
    for (var key in gameSubject) {
      obj[key] = gameSubject[key];
    }
    this.setState(obj);
  }

  _handleSetState(stateName, text) {
    let obj = {};
    obj[stateName] = text;

    this.setState(obj);
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

  renderItem(group, i) {
    let gradientColor = 'transparent';
    let borderStyle = {};

    if (this.state.submit && !this.state[group.stateName]) {
      gradientColor = 'rgba(233,75,53,0.12)';
      borderStyle = { backgroundColor: '#e94b35', height: 2 };
    }

    return(
      <View key={i}>
        <Text>{group.label}</Text>
        <RadioGroup
          options={[{ label: 'ខ្លាំង', value: 'ខ្លាំង' }, { label: 'មធ្យម', value: 'មធ្យម' }, { label: 'ខ្សោយ', value: 'ខ្សោយ' }]}
          onPress={(text) => this._handleSetState(group.stateName, text)}
          value={this.state[group.stateName]} >
        </RadioGroup>
      </View>
    )
  }

  renderCard(subject, index){
    return(
      <CardView header={subject.title} key={index}>
        { subject.groups.map((group, i) => {
            return (this.renderItem(group, i))
          })
        }
      </CardView>
    )
  }

  render() {
    return(
      <Container>
        <Content>
          <View style={{flex: 1, marginTop: 16}}>
            <Text style={mainStyles.instructionText}>ចូរបំពេញគ្រប់មុខវិជ្ជាខាងក្រោម៖</Text>
            { Subjects.map((subject, index) => {
                return (this.renderCard(subject, index))
              })
            }
          </View>

          <BackConfirmDialog
            visible={this.state.confirmDialogVisible}
            onTouchOutside={() => this.setState({confirmDialogVisible: false})}
            onPressYes={() => this._onYes()}
            onPressNo={() => this._onNo()}
          />
          <Toast ref='toast' positionValue={Platform.OS == 'ios' ? 120 : 140}/>
        </Content>
        <FooterBar
          icon='keyboard-arrow-right'
          text='បន្តទៀត'
          onPress={this._goNext.bind(this)}
        />
      </Container>
    );
  };
}
