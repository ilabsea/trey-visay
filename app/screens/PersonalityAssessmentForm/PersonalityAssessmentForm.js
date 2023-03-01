import React, { Component } from 'react';
import {
  View,
  BackHandler,
} from 'react-native';

import FooterBar from '../../components/footer/FooterBar';
import styles from '../../assets/style_sheets/profile_form';
import scrollHeaderStyles from '../../assets/style_sheets/scroll_header';
import CheckboxGroup from '../../components/CheckboxGroup';
import personalities from '../../data/json/personality';
import BackConfirmDialog from '../../components/shared/back_confirm_dialog';
import { Content, Left, Body, Right, Icon, Title, Button } from 'native-base';

import ScrollableHeader from '../../components/scrollable_header';
import BackButton from '../../components/shared/back_button';
import { FontSetting } from '../../assets/style_sheets/font_setting';
import ProgressStep from './ProgressStep';
import {Colors} from '../../assets/style_sheets/main/colors';

import { reset, navigate } from '../StackNav/RootNavigation';
import Text from '../../components/Text';

import realm from '../../db/schema';
import User from '../../utils/user';
import te from '../../data/translates/km';

export default class PersonalityAssessmentRealistic extends Component {
  screens = [
    { category: 'realistic', nextCategory: 'investigative', nextScreen: 'InvestigativeScreen' },
    { category: 'investigative', nextCategory: 'artistic', nextScreen: 'ArtisticScreen' },
    { category: 'artistic', nextCategory: 'social', nextScreen: 'SocialScreen' },
    { category: 'social', nextCategory: 'enterprising', nextScreen: 'EnterprisingScreen' },
    { category: 'enterprising', nextCategory: 'conventional', nextScreen: 'ConventionalScreen' },
    { category: 'conventional', nextCategory: '', nextScreen: 'AssessmentResultScreen' }
  ];

  constructor(props) {
    super(props);

    let index = 0;
    if (!!props.route.params && !!props.route.params.category) {
      index = this.screens.map(e => e.category).indexOf(props.route.params.category);
    }
    this.screen = this.screens[index];

    let assessments = realm.objects('PersonalityAssessment').filtered('isDone = false AND userUuid = "' + User.getID() + '"');
    let assessment = assessments[assessments.length - 1];
    let data = assessment[this.screen.category].map((obj)=> obj.value);

    this.state = {
      personalities: personalities.filter(item => item.category == this.screen.category),
      data: data,
      assessment: assessment,
      index: index
    }
  }

  componentDidMount() {
    this._backHandler();
  }

  _backHandler() {
    this.props.navigation.setParams({
      _handleBack: this._handleBack.bind(this),
      goNext: this._goNext.bind(this)
    });

    BackHandler.addEventListener('hardwareBackPress', this._onClickBackHandler);
  }

  _handleBack() {
    this.setState({confirmDialogVisible: true});
  }

  _onClickBackHandler = () => {
    this.setState({confirmDialogVisible: true});

    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);
    return true
  }

  _onYes() {
    realm.write(() => {
      realm.create('PersonalityAssessment', this._buildData(), true);
      this._closeDialog();
    });
  }

  _closeDialog() {
    this.setState({confirmDialogVisible: false});

    reset({ routeName: 'PersonalityAssessmentScreen' });
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.assessment);
      this._closeDialog();
    });
  }

  _toTitleCase(str) {
    return str.replace(/^[a-z]/, function (x) {return x.toUpperCase()})
  }

  _buildData(step) {
    let screen = step || `${this._toTitleCase(this.screen.category)}Screen`;
    let data = this.state.data.map((value) => { return { value: value } })

    obj = {
      uuid: this.state.assessment.uuid,
      step: screen,
    };

    obj[this.screen.category] = data;

    return obj;
  }

  _handleChecked(value) {
    this.props.navigation.setParams({total: value.length});
    this.setState({data: value});
  }

  _renderCheckBoxes() {
    let checkboxes = this.state.personalities.map(item => {
      return { value: item.code, label: item.name_km };
    });

    return (
      <View style={styles.box}>
        <Text style={styles.subTitle}>ខ្ញុំគិតថាខ្ញុំជាមនុស្ស</Text>

        <View>
          <CheckboxGroup
            onSelect={(selected) => {this._handleChecked(selected)}}
            options={checkboxes}
            selected={this.state.data}
          />
        </View>
      </View>
    );
  }

  _goNext = () => {
    realm.write(() => {
      realm.create('PersonalityAssessment', this._buildData(this.screen.nextScreen), true);

      navigate(this.screen.nextScreen, {category: this.screen.nextCategory});
    });
  }

  _renderContent = () => {
    return (
      <View style={{marginHorizontal: 20, marginTop: 16, marginBottom: 12}}>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <Text style={{flex: 1}}>សូមបំពេញក្នុងប្រអប់ខាងមុខឃ្លាទាំងឡាយណាដែល បរិយាយពីអត្តចរិករបស់អ្នក!</Text>
        </View>

        { this._renderCheckBoxes() }
      </View>
    )
  }

  _renderNavigation = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <BackButton buttonColor='#fff' navigation={this.props.navigation} style={{width: 48}}/>
        <Text style={[scrollHeaderStyles.navTitle, { paddingTop: 2, flex: 1, textAlign: 'center', justifyContent: 'center' }]}>តេស្ត{te[this.screen.category]}</Text>
        <Text style={{color: '#fff', marginRight: 8, width: 48}}>{this.state.data.length} / 18</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollableHeader
          backgroundColor={Colors.blue}
          statusBarColor={Colors.blueStatusBar}
          barStyle={'light-content'}
          renderContent={ this._renderContent }
          renderNavigation={ this._renderNavigation }
          headerMaxHeight={140}
          renderForeground={ () => <ProgressStep step={this.state.index+1} /> }
        />

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
        <FooterBar icon='keyboard-arrow-right' text='បន្តទៀត' onPress={this._goNext} />
      </View>
    )
  }
}
