import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';

import { NavigationActions } from 'react-navigation';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Sound from 'react-native-sound';
import { Divider } from 'react-native-elements';
import FooterBar from '../../../components/footer/FooterBar';
import { FontSetting } from "../../../assets/style_sheets/font_setting";
import { Colors } from '../../../assets/style_sheets/main/colors';
import mainStyles from '../../../assets/style_sheets/main/main';
import BackConfirmDialog from '../../../components/shared/back_confirm_dialog';
import SchoolListView from '../../../components/schools/school_list';

import realm from '../../../db/schema';
import User from '../../../utils/user';
import Sidekiq from '../../../utils/models/sidekiq';
import schoolList from '../../../data/json/universities';
import Images from '../../../assets/images';
import characteristicList from '../../../data/json/characteristic_jobs';
import ScrollableHeader from '../../../components/scrollable_header';

export default class ContactScreen extends Component {
  constructor(props) {
    super(props);

    this._initState();
    this._backHandler();
  }

  componentWillUnmount() {
    if (!!this.sound) {
      this.sound.stop();
      this.sound.release();
    }
  }

  componentDidMount() {
    if (!this.state.game.voiceRecord) { return }

    this.sound = new Sound(this.state.game.voiceRecord, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      }

      let date = new Date(null);
      date.setSeconds(Math.ceil(this.sound.getDuration()));
      let time = date.toISOString().substr(11, 8);

      this.setState({time: time});
    });
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
      time: '',
      isPlaying: false,
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
    this.props.navigation.reset([NavigationActions.navigate({ routeName: 'CareerCounsellorScreen' })])
  }

  _onNo() {
    this._closeDialog();
  }

  _goNext() {
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
      <View >
        <Text style={[mainStyles.sectionText, {paddingHorizontal: 20, marginTop: 16}]}>ដើម្បីសិក្សាមុខជំនាញឲ្យត្រូវទៅនឹងមុខរបរដែលអ្នកបានជ្រើសរើស អ្នកអាចជ្រើសរើសគ្រឹះស្ថានសិក្សាដែលមានរាយនាមដូចខាងក្រោម៖</Text>

         <SchoolListView navigation={this.props.navigation} data={this.state.schools}/>
      </View>
    )
  }

  async _play() {
    // These timeouts are a hacky workaround for some issues with react-native-sound.
    // See https://github.com/zmxv/react-native-sound/issues/89.
    this.setState({isPlaying: true});

    setTimeout(() => {
      this.sound.play((success) => {
        if (success) {
          console.log('successfully finished playing');
          this.setState({isPlaying: false});
        } else {
          console.log('playback failed due to audio decoding errors');
          this.sound.reset();
        }
      });
    }, 100);
  }

  async _stop() {
    this.sound.stop();
    this.setState({isPlaying: false});
  }

  _handlePlaying() {
    if (this.state.isPlaying) {
      return this._stop();
    }
    this._play();
  }

  _renderVoiceRecord() {
    return (
      <View style={[mainStyles.box, {marginTop: 13, flexDirection: 'row', alignItems: 'center', padding: 10, overflow: 'hidden'}]}>
        <TouchableOpacity onPress={() => this._handlePlaying()}>
          { this.state.isPlaying &&
            <MaterialIcon style={styles.icon} name='pause-circle-filled' size={48} color='#e94b35'/>
          }
          {
            !this.state.isPlaying &&
            <MaterialIcon style={styles.icon} name='play-circle-filled' size={48} color='rgb(24,118,211)'/>
          }
        </TouchableOpacity>

        <View style={{flex: 1, paddingHorizontal: 10}}>
          <Text>លេង</Text>
          <Text style={{lineHeight: 20}}>{ this.state.time }</Text>
        </View>
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

  _renderGoal() {
    return (
      <View>
        <Text style={[mainStyles.instructionText, {marginTop: 24}]}>
          ដាក់គោលដៅមួយ និងមូលហេតុ
        </Text>

        <View style={[mainStyles.box, {marginTop: 0}]}>
          <Text style={styles.boxHeader}>ចម្លើយរបស់អ្នក</Text>
          <Text style={mainStyles.text}>{this.state.game.goalCareer}</Text>
          { !!this.state.game.reason && this._renderReason()}
        </View>

        { !!this.state.game.voiceRecord && this._renderVoiceRecord()}
      </View>
    )
  }

  _renderAllContent = () => {
    return (
      <View>
        { this._renderGoal() }
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
          renderNavigation={ () => {} }
          title={title}
          largeTitle={title}
        />

        <FooterBar icon='done' text='រួចរាល់' onPress={this._goNext.bind(this)} />

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

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70
  },
  schoolAddress: {
    marginLeft: 8,
    fontSize: FontSetting.sub_title
  },
  icon: {
    height: 50,
    lineHeight: 50
  },
  boxHeader: {
    marginHorizontal: -16,
    marginTop: -16,
    paddingHorizontal: 16,
    paddingVertical: 5,
    backgroundColor: 'rgba(24, 118, 211, 0.2)',
    color: Colors.blue,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  }
})
