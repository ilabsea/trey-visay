import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import Toast, { DURATION } from 'react-native-easy-toast';

// Utils
import realm from '../../schema';
import User from '../../utils/user';
import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import StatusBar from '../../components/shared/status_bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Components
import InputTextContainer from '../../components/input_text_container';
import SaveButton from '../../components/save_button';
import PickerSpecific from '../../components/picker/PickerSpecific';

import FamilySituation from '../../data/json/family_situation.json';
import grades from '../../data/json/grades.json';
import provinces from '../../data/json/address/provinces.json';
import communes from '../../data/json/address/communes.json';
import districts from '../../data/json/address/districts.json';
import highSchools from '../../data/json/address/highSchools.json';

let formError = {};

export default class ProfileForm extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'បំពេញប្រវត្តិរូបសង្ខេប',
      headerStyle: headerStyles.headerStyle,
      headerTitleStyle: headerStyles.headerTitleStyle,
      headerRight: (<SaveButton navigation={navigation}/>),
    }
  }

  constructor(props) {
    super(props);
    this._handleSubmit = this.props.navigation.setParams({
                            handleSubmit: this.handleSubmit.bind(this)
                          });
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    user = Object.assign({}, user, { sex: 'ស្រី', grade: '9'})

    this.state = {
      user: user,
      errors: {},
      confirmDialogVisible: false
    }
  }

  componentWillMount() {
    this._handleSubmit;
  }

  _skip() {
    try {
      realm.write(() => {
        realm.create('User', { uuid: this.state.user.uuid, highSchoolId: '14', grade: 'ផ្សេងៗ'}, true);
        realm.create('Sidekiq', { paramUuid: this.state.user.uuid, tableName: 'User' }, true)
        this.props.navigation.dispatch({
          type: 'Navigation/RESET',
          index: 0,
          actions: [{
            type: 'Navigation/NAVIGATE',
            routeName:'CareerCounsellorStack'
          }]
        })
      });
    } catch (e) {
      alert(e);
    }
  }

  _renderContent() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', marginVertical: 16}}>
          <MaterialIcon name='stars' color='#e94b35' size={24} style={{marginRight: 8}} />
          <View style={{flex: 1}}>
            <Text>អ្នកត្រូវបំពេញពត៌មានផ្ទាល់ខ្លួនខាងក្រោមដើម្បីប្រើប្រាស់កម្មវិធី។ </Text>
            <View style={styles.inlineBlock}>
              <Text>ឬអ្នកចង់បំពេញនៅពេលក្រោយ? </Text>
              <TouchableOpacity onPress={() => this._skip()}>
                <Text style={{color: '#4caf50', fontWeight: 'bold'}}>រំលង</Text>
              </TouchableOpacity>

              <Text> ឬ </Text>
              <TouchableOpacity onPress={() => this.setState({confirmDialogVisible: true})}>
                <Text style={{color: '#4caf50', fontWeight: 'bold'}}>ចាកចេញពីគណនី</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.box}>
          {this._renderPersonalInfo()}
        </View>

      </View>
    )
  }

  _onYes() {
    User.logout();
    this.props.navigation.dispatch({
      type: 'Navigation/RESET',
      index: 0,
      actions: [{ type: 'Navigation/NAVIGATE', routeName:'Login'}],
      key: null
    });
  }

  _onNo() {
    this.setState({confirmDialogVisible: false});
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar />
        <KeyboardAwareScrollView>
          { this._renderContent() }
        </KeyboardAwareScrollView>

        <ConfirmDialog
          title="អ្នកពិតជាចង់ចាកចេញមែនទេ?"
          message="បើអ្នកចាកចេញពត័មានដែលអ្នកបានបំពេញនឹងមិនត្រូវបានរក្សារទុកឡើយ!"
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          positiveButton={{
            title: "ចាកចេញ",
            onPress: this._onYes.bind(this),
            titleStyle: styles.dialogButtonText
          }}
          negativeButton={{
            title: "អត់ទេ",
            onPress: this._onNo.bind(this),
            titleStyle: styles.dialogButtonText
          }}
        />

        <Toast ref='toast' positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>

      </View>
    )
  }

  _setUserState(field, value) {
    let user = {...this.state.user};
    user[field] = value;
    this.setState({
      ...this.state,
      user: user
    });
  }

  checkRequire(field) {
    let value = this.state.user[field];
    if ( value == null || !value.length) {
      formError[field] = ["មិនអាចទទេបានទេ"];
    } else {
      delete formError[field];
    }
    this.setState({errors: formError})
  }

  isValidForm() {
    fields = [ 'fullName', 'dateOfBirth', 'provinceCode', 'districtCode', 'highSchoolCode'];
    for (var i = 0; i < fields.length; i++) {
      this.checkRequire(fields[i]);
    }

    return Object.keys(formError).length == 0;
  }

  handleSubmit() {
    if (!this.isValidForm()) {
      return this.refs.toast.show('សូមបំពេញព័ត៌មានខាងក្រោមជាមុនសិន...!', DURATION.SHORT);
    }

    try {
      realm.write(() => {
        realm.create('User', this.state.user, true);
        realm.create('Sidekiq', { paramUuid: this.state.user.uuid, tableName: 'User' }, true)
        this.props.navigation.dispatch({
          type: 'Navigation/RESET',
          index: 0,
          actions: [{
            type: 'Navigation/NAVIGATE',
            routeName:'CareerCounsellorStack'
          }]
        })
      });
    } catch (e) {
      alert(e);
    }
  }

  _getDistricts(){
    let provinceCode = this.state.user.provinceCode;
    return districts.filter((district) => district.parent_code == provinceCode);
  }

  _getCommunes(){
    let districtCode = this.state.user.districtCode;
    return communes.filter((commune) => commune.parent_code == districtCode);
  }

  _getHighSchools(){
    let districtCode = this.state.user.districtCode;
    return highSchools.filter((highSchool) => highSchool.parent_code == districtCode);
  }

  _renderPersonalInfo() {
    let sexOptions = [
      {label: 'ស្រី', value: 'ស្រី', code: 'ស្រី'},
      {label: 'ប្រុស', value: 'ប្រុស', code: 'ប្រុស'},
      {label: 'ផ្សេងៗ', value: 'ផ្សេងៗ', code: 'ផ្សេងៗ'}
    ]
    let noValue = [{ "code": "", "label": "គ្មានតម្លៃ" }]
    return (
      <View>
        { this._renderInputTextContainer({stateName: 'fullName', label: 'ឈ្មោះពេញ',
          nextFocusInput: 'usernameInput'}) }
        { this._renderPicker({label: 'ភេទ', stateName: 'sex',
          options: sexOptions})
        }
        { this._renderDatePicker() }
        { this._renderInputTextContainer({stateName: 'phoneNumber', label: 'លេខទូរស័ព្ទ',
          keyboardType: 'phone-pad'})
        }
        { this._renderPicker({label: 'រៀនថ្នាក់ទី', stateName: 'grade', options: grades}) }
        { this._renderPicker({label: 'ខេត្ត', stateName: 'provinceCode',
          options: noValue.concat(provinces) })}
        { this._renderPicker({label: 'ស្រុក', stateName: 'districtCode',
            options: noValue.concat(this._getDistricts()) })}
        { this._renderPicker({label: 'ឃុំ', stateName: 'communeCode',
            options: noValue.concat(this._getCommunes()) })}
        { this._renderPicker({label: 'រៀននៅសាលា', stateName: 'highSchoolCode',
            options: noValue.concat(this._getHighSchools()) })}
      </View>
    )
  }

  _renderDatePicker(){
    return(
      <View style={styles.inputContainer}>
        <Text style={styles.labelColor}>ថ្ងៃខែឆ្នាំកំណើត</Text>
        <DatePicker
          style={{width: 200}}
          date={this.state.user.dateOfBirth}
          mode="date"
          androidMode='spinner'
          placeholder="select date"
          format="DD-MMM-YYYY"
          confirmBtnText="យល់ព្រម"
          cancelBtnText="បោះបង់"
          maxDate={new Date()}
          onDateChange={(date) => {this._setUserState('dateOfBirth', date)}} />
        <Text style={styles.errorText}>{this.state.errors.dateOfBirth}</Text>
      </View>
    )
  }

  _renderInputTextContainer(params={}) {
    let placeholder='វាយ' + params.label + 'នៅទីនេះ';
    let value = this.state.user[params.stateName] ? this.state.user[params.stateName]: '';
    return (
      <InputTextContainer
        onChangeText={((text) => this._setUserState(params.stateName, text)).bind(this)}
        label={params.label}
        placeholder={placeholder}
        value={value}
        errors={this.state.errors[params.stateName]}
        keyboardType={params.keyboardType || 'default' }
        inputRef={(input) => this[params.stateName + 'Input'] = input}
        onSubmitEditing={() => !!params.nextFocusInput && this[params.nextFocusInput].focus()}
        returnKeyType='next'/>
    )
  }

  _renderPicker(params={}) {
    return (
      <PickerSpecific
        data={params}
        user={this.state.user}
        onValueChange={(itemValue, itemIndex) => this._setUserState(params.stateName, itemValue) } />
    )
  }
}
