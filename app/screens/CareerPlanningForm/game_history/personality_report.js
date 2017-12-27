import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';

import {
  ThemeProvider,
} from 'react-native-material-ui';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import headerStyles from '../../../assets/style_sheets/header';
import shareStyles from '../../../assets/style_sheets/profile_form';
import StatusBar from '../../../components/status_bar';
import personalityJobs from '../../../data/json/personality_jobs';
import realm from '../../../schema';
import User from '../../../utils/user';

export default class PersonalityReport extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'ជ្រើសរើសមុខរបរផ្អែកលើបុគ្គលិកលក្ខណៈ',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>ជ្រើសរើសមុខរបរផ្អែកលើបុគ្គលិកលក្ខណៈ</Text>,
      headerStyle: headerStyles.headerStyle,
      headerTintColor: '#fff'
    }
  };

  componentWillMount() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    let game = user.games.filtered('uuid=="' + this.props.navigation.state.params.gameUuid + '"')[0];
    let allCareers = [];
    let personalityCareers = game.personalityCareers.map(career => career.value);

    for (let i=0; i<personalityJobs.length; i++) {
      allCareers = allCareers.concat(personalityJobs[i].careers);
    }

    let jobs = allCareers.filter(career => personalityCareers.includes(career.id));

    this.state = {
      user: user,
      game: game,
      jobs: jobs,
    }
  }

  _renderContent() {
    return (
      <View style={shareStyles.box}>
        <Text style={shareStyles.subTitle}>មុខរបរ</Text>

        { this.state.jobs.map((job, i) => {
          return (
            <View key={i} style={{flexDirection: 'row', alignItems: 'center', marginVertical: 8}}>
              <AwesomeIcon name='check-circle' size={24} color='#4caf50' style={{marginRight: 8}} />
              <Text style={{fontFamily: 'KantumruyBold'}}>{job.title}</Text>
            </View>
          )
        })}
      </View>
    )
  }

  render() {
    return (
      <ThemeProvider uiTheme={{}}>
        <View style={{flex: 1}}>
          <StatusBar />

          <ScrollView style={{flex: 1}}>
            <View style={{margin: 16, flex: 1}}>
              { this._renderContent() }
            </View>
          </ScrollView>
        </View>
      </ThemeProvider>
    )
  }
}
