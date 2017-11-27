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

export default class ContactScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'ពត៍មានសាលា លេខទំនាក់ទំនង',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>ពត៍មានសាលា លេខទំនាក់ទំនង</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => goBack()} style={{marginHorizontal: 16}}>
                      <Icon name='close' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>,
    }
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
    return(
      <View style={styles.box}>
        <Text style={styles.subTitle}>សកលវិទ្យាល័យ បញ្ញាសាស្រ្តកម្ពុជា</Text>

        <View>
          <Text>
            ផ្លូវលេខ ១៨៤, មហាវិថី ព្រះនរត្តម ក្រុងភ្នំពេញ
          </Text>
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
