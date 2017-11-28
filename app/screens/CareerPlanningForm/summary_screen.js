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

import CheckboxGroup from 'react-native-checkbox-group';

import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';

import realm from '../../schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';
import personalityJobs from '../../data/json/personality_jobs';

let careers = [];

export default class PersonalityJobsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'ជ្រើសរើស២មុខរបរចេញពីតារាងសង្ខេបលទ្ធផល',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>ជ្រើសរើស២មុខរបរចេញពីតារាងសង្ខេបលទ្ធផល</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => goBack()} style={{marginHorizontal: 16}}>
                      <Icon name='close' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>,
      headerRight: (<TouchableOpacity style={headerStyles.actionWrapper}>
                      <Text style={headerStyles.saveText}>{state.params && state.params.total || 0} / 2</Text>
                    </TouchableOpacity>),
    }
  };

  _formatDataForCheckbox(id) {
    let jobs = personalityJobs[id].careers;
    let arr = [];

    for(let i = 0; i < jobs.length; i++) {
      arr.push({ value: jobs[i].id, label: jobs[i].title })
    }
    return arr;
  }

  _handleChecked(value) {
    careers = value
    this.props.navigation.setParams({total: careers.length});

    if (careers.length > 2) {
      return alert('You must select 2 careers only!');
    }
  }

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
    let total = careers.length;
    if (total != 2) {
      return alert('You must select 2 careers only!');
    }

    this._handleSubmit();
  }

  _handleSubmit() {
    // realm.write(() => {
    //   realm.create('Career', this._buildData(), true);
    //   this.props.navigation.navigate('SubjectScreen');
    // });
    this.props.navigation.navigate('RecommendationScreen');
  }

  _buildData() {
    // let career_ids = this._totalSelected() + '';
    // return {
    //   uuid: '123',
    //   // uuid: uuidv4(),
    //   userUuid: User.getID(),
    //   careerByFavorite: career_ids
    // };
  }

  _renderContent() {
    let checkboxes = [
      { value: '1', label: 'វិស្វករ​កសិកម្ម' },
      { value: '2', label: 'វិស្វករបរិស្ថាន' },
      { value: '3', label: 'ទន្តពេទ្យ' },
      { value: '4', label: 'អ្នកសម្តែងសិល្បៈឬតារាសម្តែង' },
      { value: '5', label: 'អ្នកនិពន្ធ' },
      { value: '6', label: 'អ្នករចនាគេហទំព័រ' },
      { value: '7', label: 'អ្នកបើយន្តហោះ' },
      { value: '8', label: 'វិស្វករ' },
      { value: '9', label: 'អ្នកគ្រប់គ្រងកន្លែងកម្សាន្ត' },
    ];

    return(
      <View style={styles.box}>
        <Text style={styles.subTitle}>ចូរជ្រើសរើស ២មុខរបរដែលអ្នកពេញចិត្តបំផុត</Text>

        <View>
          <CheckboxGroup
            callback={(selected) => {this._handleChecked(selected)}}
            iconColor={"#4caf50"}
            iconSize={30}
            checkedIcon="ios-checkbox-outline"
            uncheckedIcon="ios-square-outline"
            checkboxes={checkboxes}
            labelStyle={{
              color: '#333',
              fontSize: 20,
              marginLeft: 10
            }}
            rowStyle={{
              flexDirection: 'row'
            }}
            rowDirection={"column"}
          />
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
