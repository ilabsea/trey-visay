import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  ThemeProvider,
  Icon,
} from 'react-native-material-ui';

import RadioGroup from '../../components/radio_group';

import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';

import realm from '../../schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';
import valueGroup from '../../data/json/values';

export default class ValueScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'បំពេញគុណតម្លៃ',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>បំពេញគុណតម្លៃ</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => goBack()} style={{marginHorizontal: 16}}>
                      <Icon name='close' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>,
    }
  };

  state = {
    group1: {
      readWritePoet: '',
      createThingWithInnovation: '',
      initiative: '',
      imaginationForProcess: '',
      painting: '',
      DevelopYourOwnHandMadeNewSkill: '',
      WritingComposerOrLyric: '',
      CreateNewProducts: '',
      JoinFestivalOrConcert: '',
      VisitMuseumsOrExhibitions: '',
    },
    group2: {
      AnalyzeDataRelatedToNumbers: '',
      UseComputerToSolveOrPerformTasks: '',
      UseDataOrWorkstationAndDailyLife: '',
      UnderstandComplexMaths: '',
      ThinkOfItThroughReasonAndKnowledge: '',
      BecomeSpecialistInStudyAndRememberTheNumbers: '',
      CalculateAndInputDataWithEase: '',
      ManageMoneyEfficiently: '',
      UnderstandWithComplexRulesOrInstructions: '',
      CarryOutIntricateTasksAllTheTime: '',
    },
    group3: {
      DoVolunteerWork: '',
      UnderstandingAndSolvingPeopleProblems: '',
      GrantTheGiftOfSalvation: '',
      ShareMoneyWithFriendsOrAnyoneElse: '',
      DoingOrServingSocialSector: '',
      ChatOrConsultWithOtherPeople: '',
      TeachingOrtraining: '',
      EnsureSafetyAndHarmonyInThePublicDomain: '',
      BeAGoodExampleToOthers: '',
      RelieveTheSufferingOfThoseInDistress: '',
    },
    group4: {
      MakeDecisionsAboutImportantTasks: '',
      BeALeader: '',
      PreferToBeBossRatherThanRegularEmployee: '',
      ManageProjectPlanningCorporateAffairs: '',
      PlansForImplementingLongTermWork: '',
      BecomeASpecialistInBusiness: '',
      BecomeSuccessfulInJobAndEarnHigherIncome: '',
      ManagingOtherPeopleAffairs: '',
      RecognizeEncouragementOfOtherLeaders: '',
      InRoleManagementAndHaveRightToFulfillTask: '',
    },
    group5: {
      PerformTasksWithEyeAndHandSimultaneously: '',
      BeResponsiblePersonOutsideTheOffice: '',
      AttendSportsEvents: '',
      HaveSpecificSkillRelevantToDrivingVehicles: '',
      WorkOnRelatedMachineryAndElectronics: '',
      ManuallyCreateObjects: '',
      PlantTrees: '',
      UseHandTools: '',
      RunningBigMachines: '',
      CanRepairOrMaintainHomeAppliances: '',
    },
    group6: {
      StriveToStudyRelevantSubjectsAndScience: '',
      CreateAndInterpretMapOrGraphics: '',
      TestTheTheoremOrHypothesis: '',
      CollectDataOnGeology: '',
      TryToFindOutAnimalsAndPlantsLifeOnTheEarth: '',
      ExperimentalInScience: '',
      ReadPaperOnDiscoveriesInScienceAndMedicine: '',
      ReadAboutAdvancedTechnology: '',
      EngagingInScientificKnowledgeOrProcesses: '',
      SolveComplexIssues: '',
    }
  }

  _renderRadioGroups(title, number) {
    let obj = {
      title: title,
      groups: valueGroup['group'+number]
    }

    return(
      <View style={styles.box}>
        <View>
          <Text style={styles.subTitle}>កម្រងសំណួរផ្នែកទី {obj.title}</Text>
          <Text style={{fontFamily: 'KantumruyBold', fontSize: 20}}>តើអ្នកគិតថាមានសារះសំខាន់បែបណាក្នុងការ…</Text>
        </View>

        { obj.groups.map((group, i) => {
          return(
            <View key={i} style={{borderTopWidth: 1, borderTopColor: '#ccc', paddingVertical: 16}}>
              <Text style={shareStyles.label}>{group.label}</Text>

              <RadioGroup
                options={[
                  { label: 'សំខាន់ខ្លាំង', value: '4' },
                  { label: 'សំខាន់', value: '3' },
                  { label: 'សំខាន់ល្មម', value: '2' },
                  { label: 'មិនសំខាន់', value: '1' }
                ]}
                onPress={(value) => this._handleSetState('group1', group.stateName, value)}
                value={this.state.group1[group.stateName]} >
              </RadioGroup>
            </View>
          )
        })}
      </View>
    )
  }

  _handleSetState(groupNumber, stateName, value) {
    let group = {...this.state[groupNumber]};
    group[stateName] = value;

    let obj = {...this.state};
    obj[groupNumber] = group;

    this.setState(obj);
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
    this._checkValidation();

  }

  _checkValidation() {

  }

  _handleSubmit() {
    // realm.write(() => {
    //   realm.create('GeneralSubject', this._buildData(), true);
    //   // alert(JSON.stringify(realm.objects('GeneralSubject')[realm.objects('GeneralSubject').length -1]));
    //   this.props.navigation.navigate('ValueScreen');
    // });
  }

  _buildData() {
    // let obj = Object.assign({}, this.state, {
    //   // uuid: uuidv4()
    //   uuid: '123',
    //   userUuid: User.getID()
    // })
    // return obj;
  }

  render() {
    return(
      <ThemeProvider uiTheme={{}}>
        <ScrollView>
          <View style={{margin: 16}}>
            { this._renderRadioGroups('១', 1) }
            { this._renderRadioGroups('២', 2) }
            { this._renderRadioGroups('៣', 3) }
            { this._renderRadioGroups('៤', 4) }
            { this._renderRadioGroups('៥', 5) }
            { this._renderRadioGroups('៦', 6) }
          </View>

          { this._renderFooter() }
        </ScrollView>
      </ThemeProvider>
    );
  };
}
