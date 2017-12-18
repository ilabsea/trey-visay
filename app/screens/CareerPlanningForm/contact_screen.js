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
          <Text style={shareStyles.btnText}>បញ្ចប់</Text>
          <Icon name='keyboard-arrow-right' color='#fff' size={24} />
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
    // let schools = [
    //   { name: 'សកលវិទ្យាល័យ បញ្ញាសាស្រ្តកម្ពុជា', logo: require('../../assets/images/schools/1.png'), address: 'ផ្លូវលេខ ១៨៤, មហាវិថី ព្រះនរត្តម ក្រុងភ្នំពេញ', phoneNumber: '087 777 970', website: 'www.puc.edu.kh' },
    //   { name: 'សកលវិទ្យាល័យកម្ពុជា', logo: require('../../assets/images/schools/2.png'), address: 'វិថីណ័រប្រីត (១០១៩) សង្កាត់ទឹកថ្លា ខ័ណ្ឌសែនសុខ រាជធានីភ្នំពេញ', phoneNumber: '023 993 276 / 060 3333 46 / 093 777 576 / 069 521 111', website: 'www.uc.edu.kh' },
    //   { name: 'សកលវិទ្យាល័យវិទ្យាសាស្រ្តសុខាភិបាល', logo: require('../../assets/images/schools/3.png'), address: 'ផ្លូវលេខ ១៨៤, មហាវិថី ព្រះនរត្តម ក្រុងភ្នំពេញ', phoneNumber: '093 278 899', website: 'www.uhs.edu.kh' },
    //   { name: 'សាកលវិទ្យាល័យចំរើនពហុបច្ចេកវិទ្យា', logo: require('../../assets/images/schools/4.png'), address: 'អគា១៥៤, ផ្លូវ១៣២, សង្កាត់ ទឹកល្អក់១ ខ័ណ្ឌទួលគោក រាជធានីភ្នំពេញ', phoneNumber: '061 800 023', website: 'www.cup.edu.kh' },
    //   { name: 'សាកលវិទ្យាល័យសេដ្ឋកិច្ចនិងហិរញ្ញវត្ថុ', logo: require('../../assets/images/schools/5.png'), address: 'អគា៦៨, ផ្លូវ ៥២៨,២៩១, សង្កាត់ បឹងកក់១, ខ័ណ្ឌទួលគោក, ភ្នំពេញ', phoneNumber: '010 516 887', website: 'www.uef.edu.kh' },
    // ]
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
    if (school.logo) {
      logo = { uri: school.logo };
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

          <View style={{flexDirection: 'row'}}>
            <AwesomeIcon name='phone' color='#1976d2' size={24} />
            <Text style={{marginLeft: 8}}>{school.phoneNumbers.join('; ')}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <AwesomeIcon name='globe' color='#1976d2' size={24} />
            <Text style={{marginLeft: 8}}>{school.websiteOrFacebook.join('; ')}</Text>
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
      <View>
        <Text>{this.state.game.reason}</Text>
      </View>
    )
  }

  _renderGoal() {
    return (
      <View>
        <Text>មុខរបរដែលបានជ្រើសរើស</Text>

        <View style={styles.box}>
          <Text style={styles.subTitle}>{this.state.game.goalCareer}</Text>
          <Text>ការដាក់គោលដៅ និងមូលហេតុ</Text>

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
