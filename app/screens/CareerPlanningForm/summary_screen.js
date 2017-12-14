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

// import CheckboxGroup from 'react-native-checkbox-group';
import CheckboxGroup from '../../components/checkbox_group';

import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';

import realm from '../../schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';
import valueJobs from '../../data/json/value_jobs';
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

  allCareers = [];

  componentWillMount() {
    let c1 = valueJobs.map((v) => { return v.careers; });
    let c2 = personalityJobs.map((v) => { return v.careers; });

    allCareers = c1.concat(c2);
    allCareers = allCareers.reduce((a, b) => { return a.concat(b); });

    let game = realm.objects('Game').filtered('uuid="' + 123 + '"')[0];
    let arr = game.valueCareers.map((obj) => obj.value)
    arr = arr.concat(game.personalityCareers.map((obj) => obj.value))
    let selectedCareers = allCareers.filter((item, pos) => { return arr.includes(item.id) });

    this.state = {
      selectedCareers: this._formatDataForCheckbox(selectedCareers),
      game: game
    }
  }

  _formatDataForCheckbox(jobs) {
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
    let list = this.state.game.recommendations;
    let recommendations = allCareers.filter((item, pos) => { return careers.includes(item.id) });

    realm.write(() => {
      realm.delete(this.state.game.recommendations);
      list.push({ careerUuid: recommendations[0].id, careerName: recommendations[0].title, recommendation: 'យើងសង្ឈឹមថា ប្អូនៗបំពេញកម្រងសំណួរនេះឡើងវិញដោយពិចារណាយ៉ាងល្អិតល្អន់ និងអាចកំណត់ជ្រើសរើសមុខរបរមួយដែលខ្លួនពេញចិត្ត។ ក្នុងនាមយើងជាយុវជនម្នាក់ត្រូវមានភាពក្លាហានក្នុងការបង្កើតក្ដីសុបិន្តឲ្យបានធំទូលាយនិងវែងឆ្ងាយ ប្រសើរជាងបុគ្គលដែលរស់នៅដែលគ្មានគោលដៅច្បាស់លាស់។'});
      list.push({ careerUuid: recommendations[1].id, careerName: recommendations[1].title, recommendation: 'យើងសង្ឈឹមថា ប្អូនៗបំពេញកម្រងសំណួរនេះឡើងវិញដោយពិចារណាយ៉ាងល្អិតល្អន់ និងអាចកំណត់ជ្រើសរើសមុខរបរមួយដែលខ្លួនពេញចិត្ត។ ក្នុងនាមយើងជាយុវជនម្នាក់ត្រូវមានភាពក្លាហានក្នុងការបង្កើតក្ដីសុបិន្តឲ្យបានធំទូលាយនិងវែងឆ្ងាយ ប្រសើរជាងបុគ្គលដែលរស់នៅដែលគ្មានគោលដៅច្បាស់លាស់។'});
      // alert(JSON.stringify(this.state.game));
      this.props.navigation.navigate('RecommendationScreen');
    });
  }

  _renderContent() {
    return(
      <View style={styles.box}>
        <Text style={styles.subTitle}>ចូរជ្រើសរើស ២មុខរបរដែលអ្នកពេញចិត្តបំផុត</Text>

        <View>
          <CheckboxGroup
            onSelect={(selected) => {this._handleChecked(selected)}}
            items={this.state.selectedCareers}
            style={{
              icon: {
                color: '#4caf50',
                size: 30
              },
              container: {
                flexDirection: 'row',
                borderTopWidth: 0.5,
                borderColor: '#ccc',
                paddingVertical: 8,
              },
              label: {
                color: '#333',
                fontSize: 16,
                marginLeft: 10
              }
            }}
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
