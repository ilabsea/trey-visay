import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import Sound from 'react-native-sound';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { Colors } from '../../../assets/style_sheets/main/colors';
import mainStyles from '../../../assets/style_sheets/main/main';
import { Divider } from 'react-native-elements';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

class Goal extends Component{
  constructor(props){
    super(props);
    this.state = {
      isPlaying: false,
      time: ''
    };
  }

  componentWillUnmount() {
    if (!!this.sound) {
      this.sound.stop();
      this.sound.release();
    }
  }

  componentDidMount() {
    if (!this.props.game.voiceRecord) { return }

    this.sound = new Sound(this.props.game.voiceRecord, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      }

      let date = new Date(null);
      date.setSeconds(Math.ceil(this.sound.getDuration()));
      let time = date.toISOString().substr(11, 8);

      this.setState({time: time});
    });
  }


  async _play() {
    this.setState({isPlaying: true});

    setTimeout(() => {
      this.sound.play((success) => {
        if (success) {
          this.setState({isPlaying: false});
        } else {
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
    let iconName = this.state.isPlaying ? 'pause-circle-filled' : 'play-circle-filled';
    let iconColor = this.state.isPlaying ? '#e94b35' : 'rgb(24,118,211)';

    return (
      <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: -4}}>
        <TouchableOpacity onPress={() => this._handlePlaying() }>
          <MaterialIcon
            style={{height: 52, lineHeight: 52}}
            name={iconName} size={50} color={iconColor}/>
        </TouchableOpacity>

        <View style={{flexDirection: 'column', marginLeft: 8}}>
          <Text style={mainStyles.text}>លេង</Text>
          <Text style={mainStyles.subTitle}>{this.state.time}</Text>
        </View>
      </View>
    )
  }

  render(){
    return(
      <View>
        <View style={[mainStyles.blueTitleBox]}>
          <AwesomeIcon name='globe' color={Colors.blue} size={24} />
          <Text style={[mainStyles.title, { paddingLeft: 8 }]}>
            គោលដៅរបស់អ្នក
          </Text>
        </View>

        <View style={[mainStyles.subTitleBox, {height: 64}]}>
          <Text style={ mainStyles.text }>{this.props.game.goalCareer}</Text>
        </View>

        <View style={mainStyles.blueTitleBox}>
          <AwesomeIcon name='microphone' color={Colors.blue} size={24} />
          <Text style={[mainStyles.title, { paddingLeft: 8 }]}>មូលហេតុរបស់អ្នក</Text>
        </View>

        <View style={mainStyles.subTitleBox}>
          { !!this.props.game.reason &&
            <View>
              <Text>{this.props.game.reason}</Text>
            </View>
          }

          { !!this.props.game.reason &&
            !!this.props.game.voiceRecord &&
            <Divider style={{marginVertical: 12, marginHorizontal: -16}}/>
          }

          { !!this.props.game.voiceRecord && this._renderVoiceRecord() }
        </View>
      </View>
    )
  }

}

export default Goal;
