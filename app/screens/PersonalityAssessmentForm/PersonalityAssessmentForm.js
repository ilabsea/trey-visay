import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FooterBar from '../../components/footer/FooterBar';
import styles from '../../assets/style_sheets/profile_form';
import scrollHeaderStyles from '../../assets/style_sheets/scroll_header';
import headerStyles from '../../assets/style_sheets/header';
import CheckboxGroup from '../../components/checkbox_group';
import personalities from '../../data/json/personality';
import BackConfirmDialog from '../../components/shared/back_confirm_dialog';
import { NavigationActions } from 'react-navigation';
import { Container, Header, Content, Left, Body, Right, Icon, Title, Button } from 'native-base';

import ScrollableHeader from '../../components/scrollable_header';

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
    if (!!props.navigation.state.params && !!props.navigation.state.params.category) {
      index = this.screens.map(e => e.category).indexOf(props.navigation.state.params.category);
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
    this.props.navigation.reset([NavigationActions.navigate({ routeName: 'AssessmentScreen' }), NavigationActions.navigate({ routeName: 'PersonalityAssessmentScreen' })], 1);
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
    console.log('value', value)
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
            items={checkboxes}
            checked={this.state.data}
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
      </View>
    );
  }

  _goNext = () => {
    realm.write(() => {
      realm.create('PersonalityAssessment', this._buildData(this.screen.nextScreen), true);

      this.props.navigation.navigate(this.screen.nextScreen, {category: this.screen.nextCategory});
    });
  }

  _renderNumberIcon(num) {
    let number = (this.state.index || 0) + 1;
    let iconStyle = number == num ? {} : scrollHeaderStyles.inactiveIcon;

    return (
      <View style={scrollHeaderStyles.numberWrapper} key={num}>
        <View style={[scrollHeaderStyles.numberIcon, iconStyle]}>
          <Text style={scrollHeaderStyles.iconText}>{num}</Text>
        </View>
      </View>
    )
  }

  _renderLine(key) {
    return (
      <View style={scrollHeaderStyles.line} key={key}></View>
    )
  }

  _renderContent = () => {
    return (
      <Content padder>
        <View style={{flexDirection: 'row'}}>
          <Text style={{flex: 1}}>សូមបំពេញក្នុងប្រអប់ខាងមុខឃ្លាទាំងឡាយណាដែល បរិយាយពីអត្តចរិករបស់អ្នក!</Text>
        </View>

        { this._renderCheckBoxes() }
      </Content>
    )
  }

  _renderNavigation = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button transparent onPress={() => this._handleBack()}>
          <Icon name='arrow-back' style={{color: '#fff'}} />
        </Button>

        <Text style={{color: '#fff', fontSize: 20, flex: 1}}>តេស្ត{te[this.screen.category]}</Text>
        <Text style={{color: '#fff', marginRight: 20}}>{this.state.data.length} / 18</Text>
      </View>
    )
  }

  _renderForeground = () => {
    let arr = [1, 2, 3, 4, 5, 6];
    let doms = [];

    for(let i=0; i<arr.length; i++) {
      doms.push(this._renderNumberIcon(i+1))

      if (i != arr.length-1) {
        let key = arr.length + i + 1;
        doms.push(this._renderLine(key))
      }
    }

    return (
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center'}}>
        { doms }
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollableHeader
          renderContent={ this._renderContent }
          renderNavigation={ this._renderNavigation }
          headerMaxHeight={160}
          renderForeground={this._renderForeground }
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
