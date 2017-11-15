import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import CheckboxGroup from 'react-native-checkbox-group';
import { CheckBox } from 'react-native-elements'

import {
  ThemeProvider,
  Icon,
} from 'react-native-material-ui';

import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';

let groups = {
  group1: [],
  group2: [],
  group3: [],
  group4: [],
  group5: [],
  group6: [],
  group7: [],
  group8: [],
  group9: [],
  group10: [],
  group11: [],
  group12: [],
  group13: [],
  group14: [],
  group15: [],
  group16: [],
}

export default class CareerPlanningForm extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'ជ្រើសរើស៣មុខរបរ',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>ជ្រើសរើស៣មុខរបរ</Text>,
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

  _renderCheckBoxes(title, checkboxes, group) {
    return(
      <View style={styles.box}>
        <Text style={styles.subTitle}>{title}</Text>

        <View>
          <CheckboxGroup
            callback={(selected) => {this._handleChecked(group, selected)}}
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

  _handleChecked(group, value) {
    let obj = {};
    obj[group] = value;
    groups[group] = value;

    this.setState(obj);
    this._countSelected();
  }

  _countSelected() {
    let total = this._totalSelected().length;
    this.props.navigation.setParams({total: total});

    if(total > 3) {
      alert('only 3 is allowed')
    }
  }

  _totalSelected() {
    let arr = [];

    for (i = 1; i < 17; i++) {
      arr = arr.concat(groups['group'+i]);
    }

    return arr;
  }

  _renderAgricultureAndResources() {
    let title = 'ផ្នែកកសិកម្ម និងធនធានធម្មជាតិ';
    let checkboxes = [
      { value: '1_1', label: 'វិស្វករ​កសិកម្ម'},
      { value: '1_2', label: 'អ្នកវិទ្យាសាស្រ្តផ្នែកសត្វ'},
      { value: '1_3', label: 'អ្នកបង្វឹកសត្វ'},
      { value: '1_4', label: 'អ្នកខួងដី ឬគ្រឹះក្នុងកិច្ចការសំណង់'},
      { value: '1_5', label: 'វិស្វករបរិស្ថាន'},
      { value: '1_6', label: 'អ្នកបច្ចេកទេសផ្នែកនេសាទ'},
      { value: '1_7', label: 'អ្នកវិទ្យាសាស្រផ្នែកម្ហូបអាហារ'},
      { value: '1_8', label: 'អ្នកឯកទេសផ្នែកព្រៃឈើ'},
      { value: '1_9', label: 'ឧទ្យាននុរក្ស (អ្នកការពារឧទ្យាន)'},
      { value: '1_10', label: 'អ្នកឯកទេសថ្នាំសម្លាប់សត្វល្អិត'},
      { value: '1_11', label: 'វិស្វករប្រេងកាត'},
      { value: '1_12', label: 'អ្នកឯកទេសផ្នែកគុណភាពដី'},
      { value: '1_13', label: 'ពេទ្យសត្វ'},
      { value: '1_14', label: 'អ្នកថែរក្សាសួនសត្វ'},
      { value: '1_15', label: 'អ្នកថែទាំកសិដ្ឋានចិញ្ចឹមសត្វ'},
    ];

    return this._renderCheckBoxes(title, checkboxes, 'group1');
  }

  _renderConstruction() {
    let title = 'ផ្នែកស្ថាប័ត្យកម្ម និងសំណង់';
    let checkboxes = [
      { value: '2_1', label: 'ស្ថាបត្យករ'},
      { value: '2_2', label: 'អ្នកឯកទេសផ្នែករៀបឥដ្ឋសំណង់'},
      { value: '2_3', label: 'អ្នកត្រួតពិនិត្យអគារ'},
      { value: '2_4', label: 'អ្នកបញ្ជាគ្រឿងចក្រឈូសឆាយ'},
      { value: '2_5', label: 'អ្នកឯកទេសផ្នែកគ្រឿងឈើ(ជាងឈើ)'},
      { value: '2_6', label: 'អ្នកគ្រប់គ្រងការសាងសង់'},
      { value: '2_7', label: 'អ្នកបញ្ជាម៉ាស៊ីនស្ទូច'},
      { value: '2_8', label: 'អ្នកបច្ចេកទេសអគ្គិសនី'},
      { value: '2_9', label: 'អ្នកបច្ចេកទេសម៉ាស៊ីនត្រជាក់'},
      { value: '2_10', label: 'អ្នកដំឡើងបរិក្ខាប្រើប្រាស់ក្នុងផ្ទះ'},
      { value: '2_11', label: 'អ្នកឯកទេសផ្នែកលាបថ្នាំ'},
      { value: '2_12', label: 'អ្នកឯទេសតបណ្តាញទុយោទឹក'},
      { value: '2_13', label: 'អ្នកឯកទេសផ្នែកប្រក់ដំបូល'},
      { value: '2_14', label: 'អ្នកបច្ចេកទេសវាស់ស្ទង់'},
      { value: '2_15', label: 'អ្នកបច្ចេកទេសកាត់ និងរៀបថ្ម'},
    ];

    return this._renderCheckBoxes(title, checkboxes, 'group2');
  }

  _renderArtAndCommunication() {

  }

  _renderTradeAndAdministration() {

  }

  _renderEducationAndTraining() {

  }

  _renderFinancialAndInsurance() {

  }

  _renderPublicAdministration() {

  }

  _renderHealthScience() {

  }

  _renderHospitalityTourismAndEntertainment() {

  }

  _renderServicesForPublic() {

  }

  _renderInformatics() {

  }

  _renderLegalAndPublicSafety() {

  }

  _renderManufacturing() {

  }

  _renderRetailWholesaleAndServices() {

  }

  _renderScienceResearchEngineeringAndMathematics() {

  }

  _renderShippingDistributionAndManagement() {

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
    let total = this._totalSelected().length;
    if (total != 3) {
      return alert('You must select 3 careers only!');
    }

    this._handleSubmit();
  }

  _handleSubmit() {
    alert('_handleSubmit');
  }

  render() {
    return(
      <ThemeProvider uiTheme={{}}>
        <ScrollView>
          <View style={{margin: 16}}>
            { this._renderAgricultureAndResources() }
            { this._renderConstruction() }
            { this._renderArtAndCommunication() }
            { this._renderTradeAndAdministration() }
            { this._renderEducationAndTraining() }
            { this._renderFinancialAndInsurance() }
            { this._renderPublicAdministration() }
            { this._renderHealthScience() }
            { this._renderHospitalityTourismAndEntertainment() }
            { this._renderServicesForPublic() }
            { this._renderInformatics() }
            { this._renderLegalAndPublicSafety() }
            { this._renderManufacturing() }
            { this._renderRetailWholesaleAndServices() }
            { this._renderScienceResearchEngineeringAndMathematics() }
            { this._renderShippingDistributionAndManagement() }
          </View>

          { this._renderFooter() }
        </ScrollView>
      </ThemeProvider>
    );
  };
}
