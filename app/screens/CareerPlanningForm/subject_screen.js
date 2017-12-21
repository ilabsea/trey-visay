import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  BackHandler,
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
import generalSubject from '../../data/translates/general_subject';

export default class SubjectScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'បំពេញមុខវិជ្ជា',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>បំពេញមុខវិជ្ជា</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => navigation.state.params._handleBack()} style={{marginHorizontal: 16}}>
                      <Icon name='close' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>,
    }
  };

  state = {
    khmerSpeaking: '',
    khmerListening: '',
    khmerReading: '',
    khmerWriting: '',
    englishSpeaking: '',
    englishListening: '',
    englishReading: '',
    englishWriting: '',
    mathNumber: '',
    mathGauge: '',
    mathGeometry: '',
    mathStatistics: '',
    mathAlgebra: '',
    SocialStudyEthicsAndCitizenship: '',
    SocialStudyGeography: '',
    SocialStudyHistory: '',
    SocialStudyHousework: '',
    SciencePhysics: '',
    ScienceChemistry: '',
    ScienceBiology: '',
    ScienceEarthAndEnvironment: '',
    SoftSkillCommunication: '',
    SoftSkillBehavior: '',
    SoftSkillBrave: '',
    SoftSkillConfidence: '',
    SoftSkillPunctuality: '',
    SoftSkillTeamwork: '',
    SoftSkillRespect: '',
    SoftSkillProblemSolving: '',
    confirmDialogVisible: false,
    user: '',
    game: ''
  }

  componentDidMount() {
    this.props.navigation.setParams({_handleBack: this._handleBack.bind(this)});
    this._initState();
    this._backHandler();
  }

  _backHandler() {
    let self = this;

    BackHandler.addEventListener('hardwareBackPress', function() {
      if (self._isValid()) {
        self.setState({confirmDialogVisible: true});
        return true;
      }

      self.props.navigation.goBack();
      return false;
    });

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

  _handleBack() {
    if (this._isValid()) {
      this.setState({confirmDialogVisible: true});
    } else {
      this.props.navigation.goBack();
    }
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
        { stateName: 'khmerSpeaking', label: 'ការនិយាយ' },
        { stateName: 'khmerListening', label: 'ការស្តាប់' },
        { stateName: 'khmerReading', label: 'ការអាន' },
        { stateName: 'khmerWriting', label: 'ការសរសេរ' },
      ]
    }

    return this._renderRadioGroups(obj);
  }

  _renderEnglish() {
    let obj = {
      title: 'ភាសាអង់គ្លេស',
      groups: [
        { stateName: 'englishSpeaking', label: 'ការនិយាយ' },
        { stateName: 'englishListening', label: 'ការស្តាប់' },
        { stateName: 'englishReading', label: 'ការអាន' },
        { stateName: 'englishWriting', label: 'ការសរសេរ' },
      ]
    }

    return this._renderRadioGroups(obj);
  }

  _renderMath() {
    let obj = {
      title: 'គណិតវិទ្យា',
      groups: [
        { stateName: 'mathNumber', label: 'លេខ' },
        { stateName: 'mathGauge', label: 'រង្វាស់' },
        { stateName: 'mathGeometry', label: 'ធរណីមាត្រ' },
        { stateName: 'mathStatistics', label: 'ស្ថិតិ' },
        { stateName: 'mathAlgebra', label: 'ពិជគណិត' },
      ]
    }

    return this._renderRadioGroups(obj);
  }

  _renderSocialStudies() {
    let obj = {
      title: 'សិក្សាសង្គម',
      groups: [
        { stateName: 'SocialStudyEthicsAndCitizenship', label: 'សីលធម៌ និង ពលរដ្ឋ' },
        { stateName: 'SocialStudyGeography', label: 'ភូមិវិទ្យា' },
        { stateName: 'SocialStudyHistory', label: 'ប្រវត្តិវិទ្យា' },
        { stateName: 'SocialStudyHousework', label: 'គេហវិជ្ជា' },
      ]
    }

    return this._renderRadioGroups(obj);
  }

  _renderScience() {
    let obj = {
      title: 'វិទ្យាសាស្ត្រ',
      groups: [
        { stateName: 'SciencePhysics', label: 'រូបវិទ្យា' },
        { stateName: 'ScienceChemistry', label: 'គីមីវិទ្យា' },
        { stateName: 'ScienceBiology', label: 'ជីវៈវិទ្យា' },
        { stateName: 'ScienceEarthAndEnvironment', label: 'ផែនដី និង បរិស្ថាន' },
      ]
    }

    return this._renderRadioGroups(obj);
  }

  _renderSoftSkill() {
    let obj = {
      title: 'ជំនាញទន់',
      groups: [
        { stateName: 'SoftSkillCommunication', label: 'ទំនាក់ទំនង' },
        { stateName: 'SoftSkillBehavior', label: 'ឥរិយាបថ' },
        { stateName: 'SoftSkillBrave', label: 'ក្លាហាន' },
        { stateName: 'SoftSkillConfidence', label: 'ទំនុកចិត្ត' },
        { stateName: 'SoftSkillPunctuality', label: 'គោរពពេលវេលា' },
        { stateName: 'SoftSkillTeamwork', label: 'ក្រុមការងារ' },
        { stateName: 'SoftSkillRespect', label: 'គោរព' },
        { stateName: 'SoftSkillProblemSolving', label: 'ដោះស្រាយបញ្ហា' },
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
    if (this._isValid()) {
      this._handleSubmit();
    }
  }

  _isValid() {
    var arr = [];

    for (let key in this.state) {
      if (this.state[key] && !['user', 'game'].includes(key)) {
        arr.push(key);
      }
    }

    return !!arr.length;
  }

  _handleSubmit() {
    realm.write(() => {
      realm.create('Game', this._buildData('ValueScreen'), true);
      // alert(JSON.stringify(realm.objects('GeneralSubject')[realm.objects('GeneralSubject').length -1]));
      this.props.navigation.navigate('ValueScreen');
    });
  }

  _buildData(step) {
    let data = {
      uuid: this.state.game.uuid,
      step: step || 'ValueScreen',
      gameSubject: Object.assign({}, this.state, { uuid: uuidv4() })
    }

    return data;
  }

  _onYes() {
    realm.write(() => {
      realm.create('Game', this._buildData('SubjectScreen'), true);

      this.setState({confirmDialogVisible: false});
      this.props.navigation.goBack();
    });
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.game);

      this.setState({confirmDialogVisible: false});
      this.props.navigation.dispatch({type: 'Navigation/RESET', routeName: 'ContactScreen', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'CareerCounsellorScreen'}]});
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
              { false && this._renderMath() }
              { false && this._renderSocialStudies() }
              { false && this._renderScience() }
              { false && this._renderSoftSkill() }
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
