import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Platform
} from 'react-native';

import Toast, { DURATION } from 'react-native-easy-toast'

import { Divider } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import RadioGroup from '../../components/radio_group';
import BackConfirmDialog from '../../components/back_confirm_dialog';
import CloseButton from '../../components/shared/close_button';
import FooterBar from '../../components/FooterBar';

import mainStyles from '../../assets/style_sheets/main/main';

import realm from '../../schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';

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

  _renderRadioItem(group, i) {
    let gradientColor = 'transparent';
    let borderStyle = {};

    if (this.state.submit && !this.state[group.stateName]) {
      gradientColor = 'rgba(233,75,53,0.12)';
      borderStyle = { backgroundColor: '#e94b35', height: 2 };
    }

    return(
      <View key={i} style={{padding: 16}}>
        <Text>{group.label}</Text>

        <LinearGradient colors={['transparent', gradientColor]}>
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
      <View style={mainStyles.box}>
        <View>
          <Text style={[mainStyles.sectionText, {paddingBottom: 8}]}>{obj.title}</Text>
        </View>

        <Divider/>

        { obj.groups.map((group, i) => {
          { return(this._renderRadioItem(group, i)) }
        })}
      </View>
    )
  }

  _handleSetState(stateName, text) {
    let obj = {};
    obj[stateName] = text;

    this.setState(obj);
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

      this.setState({confirmDialogVisible: false});
      this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, key: null, actions: [{ type: 'Navigation/NAVIGATE', routeName:'CareerCounsellorStack'}]});
    });
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.game);

      this.setState({confirmDialogVisible: false});
      this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, key: null, actions: [{ type: 'Navigation/NAVIGATE', routeName:'CareerCounsellorStack'}]});
    });
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={{marginTop: 24}}>
            <Text style={mainStyles.instructionText}>ចូរបំពេញគ្រប់មុខវិជ្ជាខាងក្រោម៖</Text>

            { this._renderKhmer() }
            { this._renderEnglish() }
            { this._renderSocialStudies() }
            { this._renderScience() }
            { this._renderSoftSkill() }
          </View>
        </ScrollView>

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
        <Toast ref='toast' positionValue={Platform.OS == 'ios' ? 120 : 140}/>
      </View>
    );
  };
}
