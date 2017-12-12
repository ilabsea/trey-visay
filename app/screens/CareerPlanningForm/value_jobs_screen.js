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
import valueJobs from '../../data/json/value_jobs';

let careers = [];

export default class ValueJobsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'ជ្រើសរើស៣មុខរបរចេញពីគុណតម្លៃរបស់អ្នក',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>ជ្រើសរើស៣មុខរបរចេញពីគុណតម្លៃរបស់អ្នក</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => goBack()} style={{marginHorizontal: 16}}>
                      <Icon name='close' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>,
      headerRight: (<TouchableOpacity style={headerStyles.actionWrapper}>
                      <Text style={headerStyles.saveText}>{state.params && state.params.total || 0} / 3</Text>
                    </TouchableOpacity>),
    }
  };

  _renderCheckBoxes() {
    let groupNumber = this.props.navigation.state.params.groupNumber;
    let value = valueJobs[groupNumber];
    let title = value.text;
    let description = value.description;
    let checkboxes = this._formatDataForCheckbox(groupNumber);

    return(
      <View style={styles.box}>
        <Text style={styles.subTitle}>{title}</Text>
        <Text>{description}</Text>

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
              fontSize: 16,
              marginLeft: 10
            }}
            rowStyle={{
              flexDirection: 'row',
              borderTopWidth: 0.5,
              borderColor: '#ccc',
              paddingVertical: 8,
            }}
            rowDirection={"column"}
          />
        </View>
      </View>
    )
  }

  _formatDataForCheckbox(id) {
    let jobs = valueJobs[id].careers;
    let arr = [];

    for(let i = 0; i < jobs.length; i++) {
      arr.push({ value: jobs[i].id, label: jobs[i].title })
    }
    return arr;
  }

  _handleChecked(value) {
    careers = value
    this.props.navigation.setParams({total: careers.length});

    if (careers.length > 3) {
      return alert('You must select 3 careers only!');
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
    if (total != 3) {
      return alert('You must select 3 careers only!');
    }

    this._handleSubmit();
  }

  _handleSubmit() {
    // realm.write(() => {
    //   realm.create('Career', this._buildData(), true);
    //   this.props.navigation.navigate('SubjectScreen');
    // });
    this.props.navigation.navigate('PersonalityScreen');
  }

  render() {
    return(
      <ThemeProvider uiTheme={{}}>
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <View style={{margin: 16}}>
              { this._renderCheckBoxes() }
            </View>
          </ScrollView>
        </View>
      </ThemeProvider>
    );
  };
}
