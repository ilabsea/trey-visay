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

import BackButton from '../../components/shared/back_button';
import ButtonList from '../../components/list/button_list';
import OneList from '../../components/list/one_list';
import SchoolListView from '../../components/schools/school_list';
import { FontSetting } from "../../assets/style_sheets/font_setting";

import realm from '../../db/schema';
import User from '../../utils/user';
import schoolList from '../../data/json/universities';
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
    let currentJob = currentGroup.careers.find((career) => career.code == game.mostFavorableJobCode);
    let schools = schoolList.filter((school, pos) => {
      return currentJob.schools.includes(school.code)
    });
    
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
      this.props.navigation.dispatch({type: 'Navigation/RESET', routeName: 'ContactScreen', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'CareerCounsellorScreen'}]});
    });
  }

  _renderContent() {
    if (!this.state.schools.length && !this.state.currentJob.unknown_schools) {
      return (null)
    }

    return (
      <View>
        <Text style={mainStyles.sectionText}>ដើម្បីសិក្សាមុខជំនាញឲ្យត្រូវទៅនឹងមុខរបរដែលអ្នកបានជ្រើសរើស អ្នកអាចជ្រើសរើសគ្រឹះស្ថានសិក្សាដែលមានរាយនាមដូចខាងក្រោម៖</Text>

        <SchoolListView navigation={this.props.navigation} data={this.state.schools}/>
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
      <ButtonList
        onPress={() => {
          this.props.navigation.navigate(screenName, {
            gameUuid: this.state.gameUuid
          })
        }}
        title={label} />
    )
  }

  _renderTest1Trigger() {
    return (
      <View>
        <Text style={[mainStyles.sectionText, {marginBottom: -24}]}>ធ្វើតេស្តដំណាក់កាលទី 1</Text>
        <OneList onPress={() => {
            this.props.navigation.navigate('PersonalUnderstandingReport', {
              gameUuid: this.state.gameUuid
            })
          }} text='ស្វែងយល់អំពីខ្លួនឯង'/>
      </View>
    )
  }

  _renderTest2Trigger() {
    return (
      <View>
        <Text style={mainStyles.sectionText}>ធ្វើតេស្តដំណាក់កាលទី 2</Text>
        <View style={mainStyles.box}>
          { this._renderButton('ការបំពេញមុខវិជ្ជា', 'SubjectReport') }
          { this._renderButton('ការបំពេញបុគ្គលិកលក្ខណៈ', 'StudentPersonalityReport') }
          { this._renderButton('ការជ្រើសរើសមុខរបរផ្អែកលើបុគ្គលិកលក្ខណៈ', 'PersonalityReport') }
          { this._renderButton('ការផ្តល់អនុសាសន៍', 'RecommendationReport') }
        </View>
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
