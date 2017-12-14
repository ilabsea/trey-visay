import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  ThemeProvider,
  Icon,
} from 'react-native-material-ui';

import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';

import realm from '../../schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';
import personalityJobs from '../../data/json/personality_jobs';

let group = {
  group0: [],
  group1: [],
  group2: [],
};

export default class PersonalityScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'បំពេញបុគ្គលិកលក្ខណៈ',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>បំពេញបុគ្គលិកលក្ខណៈ</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => goBack()} style={{marginHorizontal: 16}}>
                      <Icon name='close' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>,
      headerRight: (<View style={headerStyles.actionWrapper}>
                      <Text style={headerStyles.saveText}>Total Jobs: {state.params && state.params.total || 0}</Text>
                    </View>)
    }
  };

  state = {
    jobs: [],
    currentGroup: '',
  }

  _refreshState(jobs) {
    group['group' + this.state.currentGroup] = jobs
    this._refreshTotalJobs();
  }

  _refreshTotalJobs() {
    let arr = [];

    for (i = 0; i < 3; i++) {
      arr = arr.concat(group['group' + i]);
    }

    this.setState({jobs: arr});
    // this.props.navigation.setParams({total: arr.length});
  }

  _renderFooter() {
    return(
      <View style={shareStyles.footerWrapper}>
        <TouchableOpacity onPress={this._goNext.bind(this)} style={shareStyles.btnNext}>
          <Text style={shareStyles.btnText}>Total jobs: {this.state.jobs.length} បន្តទៀត</Text>
          <Icon name='keyboard-arrow-right' color='#fff' size={24} />
        </TouchableOpacity>
      </View>
    )
  }

  _goNext() {
    this._checkValidation();
  }

  _checkValidation() {
    if (this.state.jobs.length < 3) {
      return alert('Please select careers at least 3 from any value');
    }

    this._handleSubmit();
  }

  _handleSubmit() {
    realm.write(() => {
      realm.create('Game', this._buildData(), true);
      // alert(JSON.stringify(realm.objects('Game')[realm.objects('Game').length -1]));
      this.props.navigation.navigate('SummaryScreen');
    });
  }

  _buildData() {
    let data = this.state.jobs.map((value) => {
      return { value: value };
    })

    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    let obj =  {
      // uuid: uuidv4()
      uuid: '123',
      personalityCareers: data,
      step: 'SummaryScreen'
    }

    return obj;
  }

  _renderPersonality(groupNumber) {
    let group = personalityJobs[groupNumber];
    let title = group.text;
    let description = group.description;

    return (
      <TouchableOpacity
        onPress={() => this._goToPersonalityJobsScreen(groupNumber)}
        style={styles.box}>
        <Text style={styles.subTitle}>{title}</Text>
        <Text>{description}</Text>
      </TouchableOpacity>
    )
  }

  _goToPersonalityJobsScreen(groupNumber) {
    this.setState({currentGroup: groupNumber})
    this.props.navigation.navigate('PersonalityJobsScreen', { groupNumber: groupNumber, refresh: this._refreshState.bind(this), selectedCareers: this.state.jobs})
  }

  render() {
    return(
      <ThemeProvider uiTheme={{}}>
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <View style={{margin: 16}}>
              { this._renderPersonality(0) }
              { this._renderPersonality(1) }
              { this._renderPersonality(2) }
            </View>

          </ScrollView>
          { this._renderFooter() }
        </View>
      </ThemeProvider>
    );
  };
}
