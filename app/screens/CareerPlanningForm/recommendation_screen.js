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

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';

import realm from '../../schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';
import RadioGroup from '../../components/radio_group';

let careers = [];

export default class RecommendationScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'ការណែនាំ',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>ការណែនាំ</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => goBack()} style={{marginHorizontal: 16}}>
                      <Icon name='close' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>,
    }
  };

  state = {
    currentJob: ''
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
    this._handleSubmit();
  }

  _handleSubmit() {
    // realm.write(() => {
    //   realm.create('Career', this._buildData(), true);
    //   this.props.navigation.navigate('SubjectScreen');
    // });
    this.props.navigation.navigate('GoalScreen', {career: this.state.currentJob});
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

  _renderRadioGroups() {
    let options = [
      { value: 'វិស្វករ​កសិកម្ម', label: 'យើងសង្ឈឹមថា ប្អូនៗបំពេញកម្រងសំណួរនេះឡើងវិញដោយពិចារណាយ៉ាងល្អិតល្អន់ និងអាចកំណត់ជ្រើសរើសមុខរបរមួយដែលខ្លួនពេញចិត្ត។ ក្នុងនាមយើងជាយុវជនម្នាក់ត្រូវមានភាពក្លាហានក្នុងការបង្កើតក្ដីសុបិន្តឲ្យបានធំទូលាយនិងវែងឆ្ងាយ ប្រសើរជាងបុគ្គលដែលរស់នៅដែលគ្មានគោលដៅច្បាស់លាស់។' },
      { value: 'អ្នករចនាគេហទំព័រ', label: 'យើងសង្ឈឹមថា ប្អូនៗបំពេញកម្រងសំណួរនេះឡើងវិញដោយពិចារណាយ៉ាងល្អិតល្អន់ និងអាចកំណត់ជ្រើសរើសមុខរបរមួយដែលខ្លួនពេញចិត្ត។ ក្នុងនាមយើងជាយុវជនម្នាក់ត្រូវមានភាពក្លាហានក្នុងការបង្កើតក្ដីសុបិន្តឲ្យបានធំទូលាយនិងវែងឆ្ងាយ ប្រសើរជាងបុគ្គលដែលរស់នៅដែលគ្មានគោលដៅច្បាស់លាស់។' }
    ];

    return (
      <View style={styles.box}>
        <RadioForm formHorizontal={false} animation={true}>
          { options.map((obj, i) => {
            return (
              <View key={i} style={{borderBottomWidth: 0.5, paddingHorizontal: 16, marginBottom: 16}}>
                <Text style={styles.subTitle}>{obj.value}</Text>

                <RadioButton labelHorizontal={true}>
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={this.state.currentJob == obj.value}
                    onPress={(text) => this.setState({currentJob: text})}
                    buttonSize={10}
                    buttonOuterSize={20}
                    buttonColor={'#4caf50'}
                  />

                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={(text) => this.setState({currentJob: text})}
                    labelStyle={{fontSize: 16, lineHeight: 25, fontFamily: 'Kantumruy',}}
                    labelWrapStyle={{marginRight: 20, paddingVertical: 10}}
                  />
                </RadioButton>
              </View>
            )
          })}
        </RadioForm>
      </View>
    )
  }

  render() {
    return(
      <ThemeProvider uiTheme={{}}>
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <View style={{margin: 16, flex: 1}}>
              { this._renderRadioGroups() }
            </View>
          </ScrollView>

          { this._renderFooter() }
        </View>
      </ThemeProvider>
    );
  };
}
