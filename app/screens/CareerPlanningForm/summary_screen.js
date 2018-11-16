import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

import Toast, { DURATION } from 'react-native-easy-toast';

import CheckboxGroup from '../../components/checkbox_group';
import RadioGroup from '../../components/radio_group';
import BackConfirmDialog from '../../components/back_confirm_dialog';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';

import realm from '../../schema';
import User from '../../utils/user';
import characteristicList from '../../data/json/characteristic_jobs';

let careers = [];
let allCareers = [];

export default class SummaryScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'ជ្រើសរើសមុខរបរចេញពីតារាងសង្ខេបលទ្ធផល',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>ជ្រើសរើសមុខរបរចេញពីតារាងសង្ខេបលទ្ធផល</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <TouchableOpacity onPress={() => state.params._handleBack()} style={{marginHorizontal: 16}}>
                    <MaterialIcon name='close' color='#fff' size={24} />
                  </TouchableOpacity>,
    }
  };

  componentWillMount() {
    careers = [];
    allCareers = [];

    this.props.navigation.setParams({_handleBack: this._handleBack.bind(this)});
    this._initState();
    this._backHandler();
  }

  _initState() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    let game = user.games[user.games.length - 1];
    let currentGroup = characteristicList.find((obj) => obj.id == game.characteristicId);
    let careerIds = game.personalityCareers.map((obj) => obj.value);
    let userCareers = currentGroup.careers.filter((item, pos) => { return careerIds.includes(item.id) });

    this.state = {
      userCareers: userCareers,
      currentGroup: currentGroup,
      user: user,
      game: game,
      confirmDialogVisible: false,
      mostFavorableJob: game.mostFavorableJobId,
    }
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

  _onYes() {
    realm.write(() => {
      realm.create('Game', this._buildData('SummaryScreen'), true);

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

  _buildData(step) {
    let obj =  {
      uuid: this.state.game.uuid,
      mostFavorableJobId: this.state.mostFavorableJob || null,
      goalCareer: this.state.mostFavorableJob && this.state.currentGroup.careers.find((obj) => obj.id == this.state.mostFavorableJob).name || null,
      step: step || 'RecommendationScreen'
    }

    return obj;
  }

  _formatDataForCheckbox(jobs) {
    let arr = [];

    for(let i = 0; i < jobs.length; i++) {
      arr.push({ value: jobs[i].id, label: jobs[i].name })
    }
    return arr;
  }

  _renderFooter() {
    return(
      <View style={shareStyles.footerWrapper}>
        <TouchableOpacity onPress={this._goNext.bind(this)} style={shareStyles.btnNext}>
          <Text style={shareStyles.btnText}>បន្តទៀត</Text>
          <MaterialIcon name='keyboard-arrow-right' color='#fff' size={24} />
        </TouchableOpacity>
      </View>
    )
  }

  _goNext() {
    if (!this.state.mostFavorableJob) {
      return this.refs.toast.show('សូូមជ្រើសរើសមុខរបរចំនួន 1!', DURATION.SHORT);
    }

    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);
    this._handleSubmit();
  }

  _handleSubmit() {
    realm.write(() => {
      realm.create('Game', this._buildData('RecommendationScreen'), true);
      this.props.navigation.navigate('RecommendationScreen');
    });
  }

  _renderRadioGroups() {
    return(
      <View style={styles.box}>
        <Text style={styles.subTitle}>ចូរជ្រើសរើស មុខរបរតែមួយគត់ដែលអ្នកពេញចិត្តបំផុត</Text>

        <View style={{borderTopWidth: 1, borderTopColor: '#ccc', paddingVertical: 16}}>
          <RadioGroup
            style={{alignItems: 'flex-start'}}
            formVertical={true}
            options={this._formatDataForCheckbox(this.state.userCareers)}
            onPress={(text) => this.setState({ mostFavorableJob: text })}
            value={this.state.mostFavorableJob} >
          </RadioGroup>
        </View>
      </View>
    )
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={{margin: 16, flex: 1}}>
            <View style={{flexDirection: 'row', marginVertical: 16}}>
              <MaterialIcon name='stars' color='#e94b35' size={24} style={{marginRight: 8}} />
              <Text>ចូរប្អូនជ្រើសរើស មុខរបរ ឬការងារ ១ដែលប្អូនចូលចិត្តបំផុត ដើម្បីដាក់គោលដៅ និងផែនការអនាគត!</Text>
            </View>

            { this._renderRadioGroups() }
          </View>
        </ScrollView>

        { this._renderFooter() }

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
        <Toast ref="toast"/>
      </View>
    );
  };
}
