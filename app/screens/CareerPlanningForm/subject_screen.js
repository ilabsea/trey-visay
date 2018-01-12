import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
} from 'react-native';

import {
  ThemeProvider,
  Icon,
} from 'react-native-material-ui';

import RadioGroup from '../../components/radio_group';
import BackConfirmDialog from '../../components/back_confirm_dialog';

import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';

import realm from '../../schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';

export default class SubjectScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'បំពេញមុខវិជ្ជា',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>បំពេញមុខវិជ្ជា</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => state.params._handleBack()} style={{marginHorizontal: 16}}>
                      <Icon name='close' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>,
    }
  };

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
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
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

  _renderRadioGroups(obj) {
    return(
      <View style={styles.box}>
        <Text style={styles.subTitle}>{obj.title}</Text>

        { obj.groups.map((group, i) => {
          return(
            <View key={i} style={{borderTopWidth: 1, borderTopColor: '#ccc', paddingVertical: 16}}>
              <Text style={shareStyles.label}>{group.label}</Text>

              <RadioGroup
                options={[{ label: 'ខ្លាំង', value: 'ខ្លាំង' }, { label: 'មធ្យម', value: 'មធ្យម' }, { label: 'ខ្សោយ', value: 'ខ្សោយ' }]}
                onPress={(text) => this._handleSetState(group.stateName, text)}
                value={this.state[group.stateName]} >
              </RadioGroup>
            </View>
          )
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
      title: 'វិទ្យាសាស្ត្រ',
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

  _renderFooter() {
    return(
      <View style={shareStyles.footerWrapper}>
        <TouchableOpacity onPress={this._goNext.bind(this)} style={shareStyles.btnNext}>
          <Text style={shareStyles.btnText}>បន្តទៀត</Text>
          <Icon name='keyboard-arrow-right' color='#fff' size={24} />
        </TouchableOpacity>
      </View>
    )
  }

  _goNext() {
    if (!this._isValid()) {
      return ToastAndroid.show('សូមបំពេញមុខវិជ្ជាទាំងអស់!', ToastAndroid.SHORT);
    }

    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);
    this._handleSubmit();
  }

  _isValid() {
    var arr = [];

    for (let key in this.state) {
      if (this.state[key] && !['user', 'game', 'confirmDialogVisible', 'uuid'].includes(key)) {
        arr.push(key);
      }
    }

    return arr.length == 15;
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
      this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, key: null, actions: [{ type: 'Navigation/NAVIGATE', routeName:'CareerCounsellorScreen'}]});
    });
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.game);

      this.setState({confirmDialogVisible: false});
      this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, key: null, actions: [{ type: 'Navigation/NAVIGATE', routeName:'CareerCounsellorScreen'}]});
    });
  }

  render() {
    return(
      <ThemeProvider uiTheme={{}}>
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <View style={{margin: 16}}>
              { this._renderKhmer() }
              { this._renderEnglish() }
              { this._renderSocialStudies() }
              { this._renderScience() }
              { this._renderSoftSkill() }
            </View>
          </ScrollView>

          { this._renderFooter() }

          <BackConfirmDialog
            visible={this.state.confirmDialogVisible}
            onTouchOutside={() => this.setState({confirmDialogVisible: false})}
            onPressYes={() => this._onYes()}
            onPressNo={() => this._onNo()}
          />
        </View>
      </ThemeProvider>
    );
  };
}
