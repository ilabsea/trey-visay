import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Platform,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

import { Container, Content } from 'native-base';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FooterBar from '../../components/FooterBar';
import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import CheckboxGroup from '../../components/checkbox_group';
import personalities from '../../data/json/personality';
import BackConfirmDialog from '../../components/back_confirm_dialog';
import { NavigationActions } from 'react-navigation';

import realm from '../../schema';
import User from '../../utils/user';

export default class PersonalityAssessmentRealistic extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   const { state } = navigation;

  //   return {
  //     title: state.params && state.params.title,
  //     headerTitleStyle: [headerStyles.headerTitleStyle],
  //     headerRight: (<TouchableOpacity style={headerStyles.actionWrapper}>
  //                     <Text style={headerStyles.saveText}><Text>{state.params && state.params.total || 0} </Text> / 18</Text>
  //                   </TouchableOpacity>)
  //   }
  // };

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
      assessment: assessment
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

  render() {
    return(
      <View style={{flex: 1}}>
        <Container>
          <Content padder>
            <View style={{flexDirection: 'row'}}>
              <MaterialIcon name='stars' color='#e94b35' size={24} style={{marginRight: 8}} />
              <Text style={{flex: 1}}>សូមបំពេញក្នុងប្រអប់ខាងមុខឃ្លាទាំងឡាយណាដែល បរិយាយពីអត្តចរិករបស់អ្នក!</Text>
            </View>

            { this._renderCheckBoxes() }
          </Content>
        </Container>

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
      </View>
    )
  }
}
