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

import { Colors } from '../../assets/style_sheets/main/colors';
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

  _renderSchool() {
    if (!this.state.schools.length && !this.state.currentJob.unknown_schools) {
      return (null)
    }

    return (
      <View>
        <Text style={mainStyles.sectionText}>គ្រឹះស្ថានសិក្សា</Text>
        <View style={mainStyles.box}>
          <ButtonList
            onPress={() => {
              this.props.navigation.navigate('SchoolListScreen', {
                schools: this.state.schools
              })
            }}
            icon={{color: Colors.blue, src: require('../../assets/icons/result/white-building.png')}}
            title='គ្រឹះស្ថានសិក្សា' />
        </View>
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
        <View style={{marginRight: 8 }}>
          { !this.state.isPlaying &&
            <TouchableOpacity onPress={() => this._play() }>
              <MaterialIcon name='pause-circle-filled' size={48} color={Colors.blue}/>
            </TouchableOpacity>
          }

          { this.state.isPlaying &&
            <TouchableOpacity onPress={() => this._stop()}>
              <MaterialIcon name='play-circle-filled' size={60} color={Colors.blue}/>
            </TouchableOpacity>
          }
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text style={mainStyles.text}>លេង</Text>
          <Text style={mainStyles.subTitle}>{this.state.time}</Text>
        </View>
      </View>
    )
  }

  _renderGoal() {
    return (
      <View>
        <Text style={mainStyles.sectionText}>ការដាក់គោលដៅ និងមូលហេតុ</Text>

        <View>
          <View style={[mainStyles.blueTitleBox, {marginTop: 0}]}>
            <AwesomeIcon name='globe' color={Colors.blue} size={24} />
            <Text style={[mainStyles.title, { paddingLeft: 8 }]}>គោលដៅរបស់អ្នក</Text>
          </View>
          <View style={[mainStyles.subTitleBox, {height: 64}]}>
            <Text style={ mainStyles.text }>{this.state.game.goalCareer}</Text>
          </View>

          <View style={mainStyles.blueTitleBox}>
            <AwesomeIcon name='microphone' color={Colors.blue} size={24} />
            <Text style={[mainStyles.title, { paddingLeft: 8 }]}>មូលហេតុរបស់អ្នក</Text>
          </View>
          <View style={mainStyles.subTitleBox}>
            { this.state.game.reason &&
              <View>
                <Text>{this.state.game.reason}</Text>
                <Divider style={{marginLeft: -20, marginRight: -20}}/>
              </View>
            }
            { this.state.game.voiceRecord && this._renderVoiceRecord() }
          </View>

        </View>
      </View>
    )
  }

  _renderButton(label, screenName, icon) {
    return (
      <ButtonList
        icon={icon}
        onPress={() => {
          this.props.navigation.navigate(screenName, {
            gameUuid: this.state.gameUuid
          })
        }}
        hasLine={true}
        title={label} />
    )
  }

  _renderTest1Trigger() {
    let icon = {color: Colors.blue, src: require('../../assets/icons/result/white-user.png')};
    return (
      <View>
        <Text style={mainStyles.sectionText}>ធ្វើតេស្តដំណាក់កាលទី 1</Text>
        <View style={mainStyles.box}>
          { this._renderButton('ស្វែងយល់អំពីខ្លួនឯង', 'PersonalUnderstandingReport', icon) }
        </View>
      </View>
    )
  }

  _renderTest2Trigger() {
    let subjectIcon = {color: Colors.blue, src: require('../../assets/icons/result/white-book.png')};
    let personalityIcon = {color: Colors.blue, src: require('../../assets/icons/result/white-user.png')};
    let choiceIcon = {color: Colors.blue, src: require('../../assets/icons/result/white-suitcase.png')};
    let recommendationIcon = {color: Colors.blue, src: require('../../assets/icons/result/white-comment.png')};
    return (
      <View>
        <Text style={mainStyles.sectionText}>ធ្វើតេស្តដំណាក់កាលទី 2</Text>
        <View style={mainStyles.box}>
          { this._renderButton('ការបំពេញមុខវិជ្ជា', 'SubjectReport', subjectIcon) }
          { this._renderButton('ការបំពេញបុគ្គលិកលក្ខណៈ', 'StudentPersonalityReport', personalityIcon) }
          { this._renderButton('ការជ្រើសរើសមុខរបរផ្អែកលើបុគ្គលិកលក្ខណៈ', 'PersonalityReport', choiceIcon) }
          { this._renderButton('ការផ្តល់អនុសាសន៍', 'RecommendationReport', recommendationIcon) }
        </View>
      </View>
    )
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <ScrollView>
          { this._renderGoal() }
          { this._renderSchool() }
          { this._renderTest1Trigger() }
          { this._renderTest2Trigger() }
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
