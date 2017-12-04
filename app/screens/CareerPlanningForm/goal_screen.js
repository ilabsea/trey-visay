import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  PermissionsAndroid,
  Image,
} from 'react-native';

import {
  ThemeProvider,
  Icon,
} from 'react-native-material-ui';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import Sound from 'react-native-sound';
import { AudioRecorder, AudioUtils } from 'react-native-audio';

import labelStyles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';

import realm from '../../schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';

export default class GoalScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'ដាក់គោលដៅមួយ និងមូលហេតុ',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>ដាក់គោលដៅមួយ និងមូលហេតុ</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => goBack()} style={{marginHorizontal: 16}}>
                      <Icon name='close' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>,
    }
  };

  state = {
    currentTime: 0.0,
    recording: false,
    stoppedRecording: false,
    finished: false,
    audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
    hasPermission: undefined,
  };

  _renderFooter() {
    return(
      <View style={shareStyles.footerWrapper}>
        <TouchableOpacity onPress={this._goNext.bind(this)} style={shareStyles.btnNext}>
          <Text style={shareStyles.btnText}>បន្តទៀត</Text>
          <Icon name='keyboard-arrow-right' color='#fff' size={24} />
        </TouchableOpacity>
      </View>
    )
  }

  _goNext() {
    this._handleSubmit();
  }

  _handleSubmit() {
    // realm.write(() => {
    //   realm.create('Career', this._buildData(), true);
    //   this.props.navigation.navigate('SubjectScreen');
    // });
    this.props.navigation.navigate('ContactScreen');
  }

  _renderContent() {
    return(
      <View style={labelStyles.box}>
        <Text style={labelStyles.subTitle}>តើអ្នកនឹងកំណត់គោលដៅបែបណាដើម្បីក្លាយជា{!!this.props.navigation.state.params && this.props.navigation.state.params.career}? មូលហេតុអ្វី?</Text>

        <View>
          <Text>
            ឧទាហរណ៍: ខ្ញុំនឹងខិតខំរៀន....................... ដោយសារតែ.......................
          </Text>
        </View>

        { this._renderRecordSound() }
      </View>
    )
  }

  prepareRecordingPath(audioPath){
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      AudioEncodingBitRate: 32000
    });
  }

  componentDidMount() {
    this._checkPermission().then((hasPermission) => {
      this.setState({ hasPermission });

      if (!hasPermission) return;

      this.prepareRecordingPath(this.state.audioPath);

      AudioRecorder.onProgress = (data) => {
        this.setState({currentTime: Math.floor(data.currentTime)});
      };

      AudioRecorder.onFinished = (data) => {
        // Android callback comes in the form of a promise instead.
        if (Platform.OS === 'ios') {
          this._finishRecording(data.status === "OK", data.audioFileURL);
        }
      };
    });
  }

  _checkPermission() {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    const rationale = {
      'title': 'Microphone Permission',
      'message': 'AudioExample needs access to your microphone so you can record audio.'
    };

    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
      .then((result) => {
        console.log('Permission result:', result);
        return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
      });
  }

  _renderButtonMicrophone() {
    let btn = { width: 74, height: 74, borderRadius: 37, borderWidth: 0, backgroundColor: '#e94b35' };

    return (
      <TouchableHighlight style={[styles.button, btn]} onPress={this._record.bind(this)}>
        <View>
          { !this.state.recording && <AwesomeIcon name='microphone' color='#fff' size={24} /> }
          { this.state.recording && <AwesomeIcon name='pause' color='#fff' size={24} /> }
        </View>
      </TouchableHighlight>
    );
  }

  _renderButtonPlay() {
    let isActive = this.state.currentTime > 0 && !this.state.recording

    return this._renderButton('play', () => {this._play()}, isActive)
  }

  _renderButtonStop() {
    return this._renderButton('stop', () => {this._stop()}, this.state.recording)
  }

  _renderButton(name, onPress, isActive) {
    let style = isActive ? styles.activeButtonText : styles.disabledButtonText;
    let iconColor = isActive ? '#000' : '#bdbdbd';

   return (
     <TouchableHighlight style={[styles.button, style]} onPress={onPress}>
       <AwesomeIcon name={name} size={16} color={iconColor} />
     </TouchableHighlight>
   );
  }

  async _pause() {
    if (!this.state.recording) {
      console.warn('Can\'t pause, not recording!');
      return;
    }

    this.setState({stoppedRecording: true, recording: false});

    try {
      const filePath = await AudioRecorder.pauseRecording();

      // Pause is currently equivalent to stop on Android.
      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async _stop() {
    if (!this.state.recording) {
      console.warn('Can\'t stop, not recording!');
      return;
    }

    this.setState({stoppedRecording: true, recording: false});

    try {
      const filePath = await AudioRecorder.stopRecording();

      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath);
      }
      return filePath;
    } catch (error) {
      console.error(error);
    }
  }

  async _play() {
    if (this.state.recording) {
      await this._stop();
    }

    // These timeouts are a hacky workaround for some issues with react-native-sound.
    // See https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(() => {
      var sound = new Sound(this.state.audioPath, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });

      setTimeout(() => {
        sound.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }, 100);
    }, 100);
  }

  async _record() {
    if (this.state.recording) {
      console.warn('Already recording!');
      return;
    }

    if (!this.state.hasPermission) {
      console.warn('Can\'t record, no permission granted!');
      return;
    }

    if(this.state.stoppedRecording){
      this.prepareRecordingPath(this.state.audioPath);
    }

    this.setState({recording: true});

    try {
      const filePath = await AudioRecorder.startRecording();
    } catch (error) {
      console.error(error);
    }
  }

  _finishRecording(didSucceed, filePath) {
    this.setState({ finished: didSucceed });
    console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath}`);
  }

  _renderRecordSound() {
    let date = new Date(null);
    date.setSeconds(this.state.currentTime);
    let time = date.toISOString().substr(11, 8);

    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Text style={labelStyles.subTitle}>សូមធ្វើការថតសម្លេង</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center', padding: 20}}>
          <Image
            style={{width: 150, height: 150}}
            source={require('../../assets/images/microphone.png')}/>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={styles.progressText}>{time}</Text>
        </View>

        <View style={styles.controls}>
          {this._renderButtonPlay()}
          {this._renderButtonMicrophone() }
          {this._renderButtonStop() }
        </View>
      </View>
    )
  }

  render() {
    return(
      <ThemeProvider uiTheme={{}}>
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <View style={{margin: 16, flex: 1}}>
              { this._renderContent() }
            </View>
          </ScrollView>

          { this._renderFooter() }
        </View>
      </ThemeProvider>
    );
  };
}

var styles = StyleSheet.create({
  container: {
    paddingVertical: 20
  },
  controls: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  progressText: {
    paddingTop: 50,
    fontSize: 50,
  },
  button: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 28,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    borderWidth: 2,
  },
  disabledButtonText: {
    borderColor: '#bdbdbd'
  },
  activeButtonText: {
    borderColor: "#000"
  }
});
