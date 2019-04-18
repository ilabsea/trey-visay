import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Sound from 'react-native-sound';
import FooterBar from '../../components/FooterBar';

import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';
import BackConfirmDialog from '../../components/shared/back_confirm_dialog';

import realm from '../../schema';
import User from '../../utils/user';
import Sidekiq from '../../utils/models/sidekiq';
import App from '../../utils/app';
import schoolList from '../../data/json/schools';
import Images from '../../assets/images';
import characteristicList from '../../data/json/characteristic_jobs';

export default class ContactScreen extends Component {
  componentWillMount() {
    this._initState();
    this._backHandler();
  }

  componentWillUnmount() {
    if (!!this.sound) {
      this.sound.stop();
      this.sound.release();
    }
  }

  _initState() {
    let user = User.getCurrent();
    let game = user.games[user.games.length - 1];
    let currentGroup = characteristicList.find((obj) => obj.id == game.characteristicId);
    let currentJob = currentGroup.careers.find((career) => career.id == game.mostFavorableJobId);
    let schools = schoolList.filter((school, pos) => { return currentJob.schools.includes(school.id) });

    this.state = {
      user: user,
      game: game,
      time: '',
      isPlaying: false,
      schools: schools,
      currentJob: currentJob
    };

    this.sound = new Sound(this.state.game.voiceRecord, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      }

      let date = new Date(null);
      date.setSeconds(Math.ceil(this.sound.getDuration()));
      let time = date.toISOString().substr(11, 8);
      this.setState({time: time});
    });

    this.props.navigation.setParams({_handleBack: this._handleBack.bind(this)});
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
    this.setState({confirmDialogVisible: false});
    this.props.navigation.dispatch({
      type: 'Navigation/RESET',
      index: 0,
      key: null,
      actions: [{
        type: 'Navigation/NAVIGATE',
        routeName:'CareerCounsellorScreen'
      }]
    });
  }

  _onNo() {
    this.setState({confirmDialogVisible: false});
    this.props.navigation.dispatch({
      type: 'Navigation/RESET',
      index: 0,
      key: null,
      actions: [{
        type: 'Navigation/NAVIGATE',
        routeName:'CareerCounsellorScreen'
      }]
    });
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
      this.props.navigation.dispatch({
        type: 'Navigation/RESET',
        index: 0,
        actions: [{
          type: 'Navigation/NAVIGATE',
          routeName:'CareerCounsellorScreen'
        }]
      });
    });
  }

  _renderContent() {
    if (!this.state.schools.length && !this.state.currentJob.unknown_schools) {
      return (null)
    }

    return (
      <View style={{marginTop: 20}}>
        <Text>ដើម្បីសិក្សាមុខជំនាញឲ្យត្រូវទៅនឹងមុខរបរដែលអ្នកបានជ្រើសរើស អ្នកអាចជ្រើសរើសគ្រឹះស្ថានសិក្សាដែលមានរាយនាមដូចខាងក្រោម៖</Text>

        { !!this.state.currentJob.unknown_schools &&
          <View style={styles.box}>
            <Text style={styles.subTitle}>{this.state.currentJob.unknown_schools}</Text>
          </View>
        }

        { this.state.schools.map((school, i) => {
          { return(this._renderSchool(school, i)) }
        })}
      </View>
    )
  }

  _renderSchool(school, i) {
    let logo = require('../../assets/images/schools/default.png');
    if (school.logoName) {
      logo = Images[school.logoName];
    }

    return (
      <TouchableOpacity
        style={[styles.box, {flexDirection: 'row'}]}
        onPress={() => {this.props.navigation.navigate('InstitutionDetail', {school: school})}}
        key={i}>

        <View>
          <Image source={logo} style={{width: 100, height: 100}} />
        </View>

        <View style={{flex: 1, marginLeft: 16}}>
          <Text style={styles.subTitle}>{school.universityName}</Text>

          <View style={{flexDirection: 'row'}}>
            <AwesomeIcon name='building-o' color='#1976d2' size={20} />
            <Text style={{marginLeft: 8}}>{school.category}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <AwesomeIcon name='map-marker' color='#1976d2' size={24} />
            <Text style={{marginLeft: 8}}>{school.address}</Text>
          </View>
        </View>

        <View style={{justifyContent: 'center'}}>
          <AwesomeIcon name='angle-right' size={24} color='#bbb' />
        </View>
      </TouchableOpacity>
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

  _renderVoiceRecord() {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{marginRight: 16, marginTop: -25}}>
          { !this.state.isPlaying &&
            <TouchableOpacity onPress={() => this._play()}>
              <MaterialIcon style={styles.icon} name='play-circle-outline' size={40} color='#4caf50'/>
            </TouchableOpacity>
          }

          { this.state.isPlaying &&
            <TouchableOpacity onPress={() => this._stop()}>
              <MaterialIcon style={styles.icon} name='pause-circle-outline' size={40} color='#e94b35'/>
            </TouchableOpacity>
          }
        </View>

        <Text style={styles.textTime}>{this.state.time}</Text>
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
        <Text>ដាក់គោលដៅមួយ និងមូលហេតុ</Text>

        <View style={styles.box}>
          <Text style={styles.subTitle}>{this.state.game.goalCareer}</Text>

          { !!this.state.game.reason && this._renderReason()}
          { !!this.state.game.voiceRecord && this._renderVoiceRecord()}

        </View>
      </View>
    )
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={{margin: 16, flex: 1}}>
            { this._renderGoal() }
            { this._renderContent() }
          </View>
        </ScrollView>

        <FooterBar icon='done' text='រួចរាល់' onPress={this._goNext.bind(this)} />

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
      </View>
    );
  };
}
