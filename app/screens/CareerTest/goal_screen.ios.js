import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Platform,
  PermissionsAndroid,
  Image,
  BackHandler
} from 'react-native';

import Toast, { DURATION } from 'react-native-easy-toast';
import { NavigationActions } from 'react-navigation';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Sound from 'react-native-sound';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AudioRecorder, AudioUtils } from 'react-native-audio';

import BackConfirmDialog from '../../components/shared/back_confirm_dialog';
import FooterBar from '../../components/footer/FooterBar';
import mainStyles from '../../assets/style_sheets/main/main';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';

import realm from '../../db/schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';

export default class GoalScreen extends Component {
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

  _initState() {
    let user = User.getCurrent();
    let game = user.games[user.games.length - 1];

    this.setState({
      currentTime: 0.0,
      recording: false,
      stoppedRecording: false,
      finished: false,
      audioPath: AudioUtils.DocumentDirectoryPath + '/' + uuidv4() + '.aac',
      hasPermission: undefined,
      showRecordVoiceSection: false,
      showButton: true,
      user: user,
      game: game,
      reasonText: game.reason,
      voiceRecord: ''
    });

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
    realm.write(() => {
      realm.create('Game', this._buildData('GoalScreen'), true);
      this._closeDialog();
    });
  }

  _closeDialog() {
    this.setState({confirmDialogVisible: false});
    this.props.navigation.reset([NavigationActions.navigate({ routeName: 'AssessmentScreen' }), NavigationActions.navigate({ routeName: 'CareerCounsellorScreen' })], 1)
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.game);
      this._closeDialog();
    });
  }

  _goNext() {
    if (!this.state.reasonText && !this.state.voiceRecord) {
      return this.refs.toast.show('សូូមបំពេញគោលដៅរបស់អ្នកជាអក្សរ ឬក៏ថតជាសំលេង!', DURATION.SHORT);
    }

    this._handleSubmit();
  }

  _buildData(step) {
    let obj = {
      uuid: this.state.game.uuid,
      reason: this.state.reasonText,
      voiceRecord: this.state.voiceRecord,
      step: step || 'ContactScreen',
    };

    return obj;
  }

  _handleSubmit() {
    realm.write(() => {
      realm.create('Game', this._buildData(), true);
      this.props.navigation.navigate('ContactScreen');
    });
  }

  _renderInstruction() {
    return (
      <Text style={[mainStyles.box, {padding: 16}]}>
        បន្ទាប់ពីប្អូនជ្រើសរើសមុខរបរមួយរួចហើយ។ ចូរប្អូនរៀបរាប់ បន្ថែមពីមូលហេតុដែលប្អូនបានជ្រើសរើសមុខរបរនោះ ដោយគិតអំពី៖
        ចំនុចខ្លាំងដែល ប្អូនបានជ្រើសរើសចេញពីបុគ្គលិក លក្ខណៈ ដើម្បីឆ្លុះបញ្ចាំងពីគោលបំណងមួយដែលមានន័យ ពេញលេញ។
        វាកាន់តែប្រសើរ ប្រសិនបើប្អូនសរសេរពីសារប្រយោជន៍នៃគោលបំណងនោះ ដែលបង្ហាញពី
        ការជួយ ផ្តល់ឲ្យ ចែករំលែក ឬស្ម័គ្រចិត្ត ដែលបំរើឲ្យ ប្រយោជន៍រួម (សហគមន៍/សង្គម យុវជន កុមារ ឬគ្រួសារជាដើម) ជាជាងប្រយោជន៍បុគ្គល ។
      </Text>
    )
  }

  _renderContent() {
    let btn = { borderWidth: 0, backgroundColor: '#e94b35' };

    return(
      <View>
        <View style={mainStyles.instructionContainer}>
          <MaterialIcon name='stars' color='#e94b35' size={24} style={{marginRight: 8}} />
          <Text style={[mainStyles.text, {flex:1}]}>
            អ្នកអាចដាក់គោលដៅ និងមូលហេតុដោយការសរសេរ ឬក៏ថតជាសំលេង!
          </Text>
        </View>

        { this._renderInstruction() }

        <View style={[mainStyles.box, {padding: 16}]}>
          <Text>តើអ្នកនឹងប្រកបមុខរបរអ្វីនាពេលអនាគត? មូលហេតុអ្វី?</Text>
          <Text>
            <Text style={{fontWeight: 'bold'}}>ឧទាហរណ៍៖ </Text>
            ខ្ញុំនឹងធ្វើជាស្ថាបត្យករដ៏ពូកែម្នាក់ ក្នុងក្រុមហ៊ុនឯកជនមួយនៅទីក្រុងភ្នំពេញ ពេលខ្ញំបញ្ចប់ការសិក្សាថ្នាក់បរិញ្ញាបត្រក្នុងឆ្នាំ២០២២។
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'flex-end', marginTop: 24}}>
            <TextInput
              style={[styles.inputText, {flex: 1, textAlignVertical: 'top', height: 100}]}
              onChangeText={(text) => this.setState({reasonText: text})}
              value={this.state.reasonText}
              placeholder='សរសេរចម្លើយ...'
              placeholderTextColor='rgba(0,0,0,0.6)'
              multiline={true}
              numberOfLines={4}
              autoFocus={true}
            />

            { this.state.showButton &&
              <TouchableHighlight style={[styles.button, btn]} onPress={() => {this.setState({showRecordVoiceSection: true, showButton: false})}}>
                { <AwesomeIcon name='microphone' color='#fff' size={24} /> }
              </TouchableHighlight>
            }
          </View>

          { this.state.showRecordVoiceSection && this._renderRecordSound() }
        </View>
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

    this.setState({stoppedRecording: true, recording: false, voiceRecord: this.state.audioPath});

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
      this.sound = new Sound(this.state.audioPath, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });

      setTimeout(() => {
        this.sound.play((success) => {
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
      <View>
        <View style={{alignItems: 'center'}}>
          <Text style={mainStyles.text}>សូមធ្វើការថតសម្លេង</Text>
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
      <View style={{flex: 1}}>
        <KeyboardAwareScrollView style={{flex: 1}}>
          { this._renderContent() }
        </KeyboardAwareScrollView>

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
        <Toast ref='toast' positionValue={Platform.OS == 'ios' ? 120 : 140}/>
      </View>
    );
  };
}

var styles = StyleSheet.create({
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
    padding: Platform.OS === 'ios' ? 15 : 20,
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
