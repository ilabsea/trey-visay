import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  ThemeProvider,
  Icon,
} from 'react-native-material-ui';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Sound from 'react-native-sound';

import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';

import realm from '../../schema';
import User from '../../utils/user';
import schoolList from '../../data/json/schools';
import Images from '../../assets/images';

export default class GameHistoryScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'Game History',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>តេស្តលើកទី {state.params.num}</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => goBack()} style={{marginHorizontal: 16}}>
                      <Icon name='arrow-back' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>,
    }
  };

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
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    let game = user.games.filtered('uuid=="' + this.props.navigation.state.params.gameUuid + '"')[0];

    this.state = {
      user: user,
      game: game,
      time: '',
      isPlaying: false,
      gameUuid: this.props.navigation.state.params.gameUuid,
    };

    if (!game.voiceRecord) { return }

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
    let schools = schoolList.slice(0, 3);

    return (
      <View style={{marginTop: 20}}>
        <Text>ពត៌មានសាលា និង ទំនាក់ទំនង</Text>
        { schools.map((school, i) => {
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
        onPress={() => {this.props.navigation.navigate('InstitutionDetail', {id: school.id})}}
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

        <Text style={{fontSize: 34}}>{this.state.time}</Text>
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
        <Text>មុខរបរដែលបានជ្រើសរើស</Text>

        <View style={styles.box}>
          <Text style={styles.subTitle}>{this.state.game.goalCareer}</Text>
          <Text style={{fontSize: 14, color: '#bdbdbd'}}>ការដាក់គោលដៅ និងមូលហេតុ</Text>

          { !!this.state.game.reason && this._renderReason() }
          { !!this.state.game.voiceRecord && this._renderVoiceRecord() }

        </View>
      </View>
    )
  }

  _renderButton(label, screenName) {
    return (
      <TouchableOpacity
        style={[styles.box, {marginTop: 0, marginBottom: 8, flexDirection: 'row', alignItems: 'center'}]}
        onPress={() => this.props.navigation.navigate(screenName, {gameUuid: this.state.gameUuid})}
        >
        <Image source={require('../../assets/images/list.png')} style={{width: 60, height: 60, marginRight: 16}} />
        <Text style={[styles.subTitle, {flex: 1}]}>{label}</Text>
        <AwesomeIcon name='angle-right' size={24}/>
      </TouchableOpacity>
    )
  }

  _renderTest1Trigger() {
    return (
      <View style={{marginBottom: 16}}>
        <Text>ធ្វើតេស្តដំណាក់កាលទី 1</Text>

        { this._renderButton('ស្វែងយល់អំពីខ្លួនឯង', 'PersonalUnderstandingReport') }
      </View>
    )
  }

  _renderTest2Trigger() {
    return (
      <View style={{marginBottom: 16}}>
        <Text>ធ្វើតេស្តដំណាក់កាលទី 2</Text>

        { this._renderButton('បំពេញមុខវិជ្ជា', 'SubjectReport') }
        { this._renderButton('ជ្រើសរើសមុខរបរផ្អែកលើគុណតម្លៃ', 'ValueReport') }
        { this._renderButton('ជ្រើសរើសមុខរបរផ្អែកលើបុគ្គលិកលក្ខណះ', 'PersonalityReport') }
      </View>
    )
  }

  render() {
    return(
      <ThemeProvider uiTheme={{}}>
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <View style={{margin: 16, flex: 1}}>
              { this._renderTest1Trigger() }
              { this._renderTest2Trigger() }
              { this._renderGoal() }
              { this._renderContent() }
            </View>
          </ScrollView>
        </View>
      </ThemeProvider>
    );
  };
}
