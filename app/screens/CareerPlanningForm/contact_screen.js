import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
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

export default class ContactScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'ពត៍មានសាលា និងទំនាក់ទំនង',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>ពត៍មានសាលា លេខទំនាក់ទំនង</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => goBack()} style={{marginHorizontal: 16}}>
                      <Icon name='close' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>,
    }
  };

  componentWillMount() {
    this._initState();
  }

  _initState() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    let game = user.games[user.games.length - 1];

    this.state = {
      user: user,
      game: game,
      time: '',
      isPlaying: false,
    };
  }

  _renderFooter() {
    return(
      <View style={shareStyles.footerWrapper}>
        <TouchableOpacity onPress={ this._goNext.bind(this) } style={shareStyles.btnNext}>
          <Text style={[shareStyles.btnText, {marginRight: 10}]}>រួចរាល់</Text>
          <Icon name='done' color='#fff' size={24} />
        </TouchableOpacity>
      </View>
    )
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
            <AwesomeIcon name='map-marker' color='#1976d2' size={24} />
            <Text style={{marginLeft: 8}}>{school.address}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _renderVoiceRecord() {
    var sound = new Sound(this.state.game.voiceRecord, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      }

      let date = new Date(null);
      date.setSeconds(Math.ceil(sound.getDuration()));
      let time = date.toISOString().substr(11, 8);
      this.setState({time: time});
    });

    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{marginRight: 16}}>
          { !this.state.isPlaying &&
            <TouchableOpacity onPress={() => {}}>
              <MaterialIcon name='play-circle-outline' size={40} color='#4caf50'/>
            </TouchableOpacity>
          }

          { this.state.isPlaying &&
            <TouchableOpacity onPress={() => {}}>
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

          { !!this.state.game.reason && this._renderReason()}
          { !!this.state.game.voiceRecord && this._renderVoiceRecord()}

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
              { this._renderGoal() }
              { this._renderContent() }
            </View>
          </ScrollView>

          { this._renderFooter() }
        </View>
      </ThemeProvider>
    );
  };
}
