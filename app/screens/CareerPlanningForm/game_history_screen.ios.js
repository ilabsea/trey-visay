import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Sound from 'react-native-sound';
import { Divider } from 'react-native-elements';

import mainStyles from '../../assets/style_sheets/main/main';

import BackButton from '../../components/back_button';
import { FontSetting } from "../../assets/style_sheets/font_setting";

import realm from '../../schema';
import User from '../../utils/user';
import schoolList from '../../data/json/schools';
import characteristicList from '../../data/json/characteristic_jobs';
import Images from '../../assets/images';

export default class GameHistoryScreen extends Component {
  componentWillMount() {
    this._initState();
  }

  componentWillUnmount() {
    if (!!this.sound) {
      this.sound.stop();
      this.sound.release();
    }
  }

  _initState() {
    let user = User.getCurrent();
    let game = user.games.filtered('uuid=="' + this.props.navigation.state.params.gameUuid + '"')[0];
    let currentGroup = characteristicList.find((obj) => obj.id == game.characteristicId);
    let currentJob = currentGroup.careers.find((career) => career.id == game.mostFavorableJobId);
    let schools = schoolList.filter((school, pos) => { return currentJob.schools.includes(school.id) });
    if(currentJob.unknown_schools)
      schools.push({universityName: currentJob.unknown_schools});

    this.setState({
      user: user,
      game: game,
      time: '',
      isPlaying: false,
      gameUuid: this.props.navigation.state.params.gameUuid,
      schools: schools,
      currentJob: currentJob
    });
    if (!game.voiceRecord) { return }
    console.log('this.state.game : ', game.voiceRecord);

    this.sound = new Sound(game.voiceRecord, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      }

      let date = new Date(null);
      date.setSeconds(Math.ceil(this.sound.getDuration()));
      let time = date.toISOString().substr(11, 8);
      this.setState({time: time});
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
      this.props.navigation.dispatch({type: 'Navigation/RESET', routeName: 'ContactScreen', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'CareerCounsellorStack'}]});
    });
  }

  _renderContent() {
    if (!this.state.schools.length && !this.state.currentJob.unknown_schools) {
      return (null)
    }

    return (
      <View>
        <Text style={mainStyles.sectionText}>ដើម្បីសិក្សាមុខជំនាញឲ្យត្រូវទៅនឹងមុខរបរដែលអ្នកបានជ្រើសរើស អ្នកអាចជ្រើសរើសគ្រឹះស្ថានសិក្សាដែលមានរាយនាមដូចខាងក្រោម៖</Text>

        <View style={mainStyles.box}>
          { this.state.schools.map((school, i) => {
            { return(this._renderSchool(school, i)) }
          })}
        </View>
      </View>
    )
  }

  _renderSchool(school, i) {
    let logo = require('../../assets/images/schools/default.png');
    if (school.logoName) {
      logo = Images[school.logoName];
    }

    return (
      <View>
        <TouchableOpacity
          style={mainStyles.btnList}
          onPress={() => { this.props.navigation.navigate('InstitutionDetail', {school: school})} }
          key={i}>

          <View>
            <Image source={logo} style={styles.image} />
          </View>

          <View style={{flex: 1, marginLeft: 16}}>
            <Text numberOfLines={1} style={mainStyles.title}>
              {school.universityName}
            </Text>

            <View style={{flexDirection: 'row'}}>
              <AwesomeIcon name='building-o' color='#1976d2' size={16} />
              <Text style={styles.schoolAddress}>{school.category || 'មិនមាន'}</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <AwesomeIcon name='map-marker' color='#1976d2' size={18} />
              <Text numberOfLines={2} style={styles.schoolAddress}>{school.address || 'មិនមាន'}</Text>
            </View>
          </View>

          <View style={{justifyContent: 'center'}}>
            <AwesomeIcon name='angle-right' size={24} color='#bbb' />
          </View>
        </TouchableOpacity>
        <Divider style={{marginLeft: 100}}/>
      </View>
    )
  }

  async _play() {
    this.setState({isPlaying: true});
    this.sound.play((success) => {
      if (success) {
        this.setState({isPlaying: false});
      } else {
        this.sound.reset();
      }
    });
  }

  async _stop() {
    this.sound.stop();
    this.setState({isPlaying: false});
  }

  _renderVoiceRecord() {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{marginRight: 16}}>
          { !this.state.isPlaying &&
            <TouchableOpacity onPress={() => this._play()}>
              <MaterialIcon name='play-circle-outline' size={40} color='#4caf50'/>
            </TouchableOpacity>
          }

          { this.state.isPlaying &&
            <TouchableOpacity onPress={() => this._stop()}>
              <MaterialIcon name='pause-circle-outline' size={40} color='#e94b35'/>
            </TouchableOpacity>
          }
        </View>

        <Text style={mainStyles.text}>{this.state.time}</Text>
      </View>
    )
  }

  _renderReason() {
    return (
      <View style={{flexDirection: 'row'}}>
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
        <Text style={mainStyles.sectionText}>ការដាក់គោលដៅ និងមូលហេតុ</Text>

        <View style={[mainStyles.box, {padding: 16}]}>
          <Text style={mainStyles.text}>{this.state.game.goalCareer}</Text>

          { !!this.state.game.reason && this._renderReason() }
          { !!this.state.game.voiceRecord && this._renderVoiceRecord() }

        </View>
      </View>
    )
  }

  _renderButton(label, screenName) {
    return (
      <View style={mainStyles.box}>
        <TouchableOpacity
          style={mainStyles.btnList}
          onPress={() => this.props.navigation.navigate(screenName, {gameUuid: this.state.gameUuid})}
          >
          <Image source={require('../../assets/images/list.png')} style={{width: 60, height: 60, marginRight: 16}} />
          <Text style={mainStyles.title}>{label}</Text>
          <AwesomeIcon name='angle-right' size={24} color='#bbb'/>
        </TouchableOpacity>
      </View>
    )
  }

  _renderTest1Trigger() {
    return (
      <View>
        <Text style={mainStyles.sectionText}>ធ្វើតេស្តដំណាក់កាលទី 1</Text>

        { this._renderButton('ស្វែងយល់អំពីខ្លួនឯង', 'PersonalUnderstandingReport') }
      </View>
    )
  }

  _renderTest2Trigger() {
    return (
      <View>
        <Text style={mainStyles.sectionText}>ធ្វើតេស្តដំណាក់កាលទី 2</Text>

        { this._renderButton('ការបំពេញមុខវិជ្ជា', 'SubjectReport') }
        { this._renderButton('ការបំពេញបុគ្គលិកលក្ខណៈ', 'StudentPersonalityReport') }
        { this._renderButton('ការជ្រើសរើសមុខរបរផ្អែកលើបុគ្គលិកលក្ខណៈ', 'PersonalityReport') }
        { this._renderButton('ការផ្តល់អនុសាសន៍', 'RecommendationReport') }
      </View>
    )
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          { this._renderTest1Trigger() }
          { this._renderTest2Trigger() }
          { this._renderGoal() }
          { this._renderContent() }
        </ScrollView>
      </View>
    );
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
  }
})
