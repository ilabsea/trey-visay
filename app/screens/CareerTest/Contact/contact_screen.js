import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import firebase from 'react-native-firebase';
import FooterBar from '../../../components/footer/FooterBar';
import mainStyles from '../../../assets/style_sheets/main/main';
import BackConfirmDialog from '../../../components/shared/back_confirm_dialog';
import SchoolListView from '../../../components/schools/school_list';
import Goal from '../../../components/GameHistory/Goal/Goal';

import realm from '../../../db/schema';
import User from '../../../utils/user';
import Sidekiq from '../../../utils/models/sidekiq';
import schoolList from '../../../data/json/universities';
import characteristicList from '../../../data/json/characteristic_jobs';
import ScrollableHeader from '../../../components/scrollable_header';
import keyword from '../../../data/analytics/keyword';
import { reset } from '../../StackNav/RootNavigation';

export default class ContactScreen extends Component {
  constructor(props) {
    super(props);

    this._initState();
    this._backHandler();
  }

  _initState() {
    let user = User.getCurrent();
    let game = user.games[user.games.length - 1];
    let currentGroup = characteristicList.find((obj) => obj.id == game.characteristicId);
    let currentJob = currentGroup.careers.find((career) => career.code == game.mostFavorableJobCode);
    let schools = schoolList.filter((school, pos) => {
      return currentJob.schools.includes(school.code)
    });
    if(currentJob.unknown_schools)
      schools.push({universityName: currentJob.unknown_schools});

    this.state = {
      user: user,
      game: game,
      schools: schools,
      currentJob: currentJob
    };

    this.props.navigation.setParams({
      _handleBack: this._handleBack.bind(this),
      goNext: this._goNext.bind(this)
    });
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
    this._closeDialog();
  }

  _closeDialog() {
    this.setState({confirmDialogVisible: false});
    reset({ routeName: 'CareerCounsellorScreen' });
  }

  _onNo() {
    this._closeDialog();
  }

  _goNext() {
    // firebase.analytics().logEvent(keyword.CAREER_ASSESSMENT_FINISHED);
    this._handleSubmit();
  }

  _buildData() {
    return {
      uuid: this.state.game.uuid,
      step: 'ContactScreen',
      isDone: true
    };
  }

  _handleSubmit() {
    realm.write(() => {
      realm.create('Game', this._buildData(), true);
      Sidekiq.create(this.state.game.uuid, 'Game');

      this._closeDialog();
    });
  }

  _renderContent() {
    if (!this.state.schools.length && !this.state.currentJob.unknown_schools) {
      return (null)
    }

    return (
      <View style={{paddingBottom: 12}}>
        <Text style={[mainStyles.sectionText, {marginTop: 16}]}>
          ដើម្បីសិក្សាមុខជំនាញឱ្យត្រូវទៅនឹងមុខរបរដែលអ្នកបានជ្រើសរើស អ្នកអាចជ្រើសរើសគ្រឹះស្ថានសិក្សាដែលមានរាយនាមដូចខាងក្រោម៖
        </Text>

        <SchoolListView navigation={this.props.navigation} data={this.state.schools}/>
      </View>
    )
  }

  _renderReason() {
    return (
      <View>
        <Text style={{flex: 1}}>
          <AwesomeIcon name='quote-left' color='#1976d2' size={14} />
          <Text> {this.state.game.reason} </Text>
          <AwesomeIcon name='quote-right' color='#1976d2' size={14} />
        </Text>
      </View>
    )
  }

  _renderAllContent = () => {
    return (
      <View>
        <Goal game={this.state.game}/>
        { this._renderContent() }
      </View>
    )
  }

  render() {
    let title = 'ព័ត៌មានសាលា និងទំនាក់ទំនង';
    return (
      <View style={{flex: 1}}>
        <ScrollableHeader
          renderContent={ this._renderAllContent }
          title={title}
          largeTitle={title}
        />

        <FooterBar icon='done' text='រួចរាល់' onPress={() => this._goNext()} />

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
      </View>
    )
  };
}
