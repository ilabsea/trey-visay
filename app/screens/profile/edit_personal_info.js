import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Picker,
  Platform
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import IOSPicker from 'react-native-ios-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Utils
import realm from '../../schema';
import User from '../../utils/user';
import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';

import DatePicker from 'react-native-datepicker';
import InputTextContainer from '../../components/input_text_container';
import StatusBar from '../../components/status_bar';
import PickerSpecific from '../../components/picker/PickerSpecific';
import Grades from '../../data/json/grades.json';
import highSchoolList from '../../data/json/high_schools';

let formError = {};
const schools = highSchoolList.map((obj) => { return {label: obj.name, value: obj.id}});
const grades = Grades;

export default class EditPersonalInfo extends Component {

  constructor(props) {
    super(props)
    this.state = { user: '', errors: {} };
  }

  componentWillMount() {
    this.props.navigation.setParams({
      handleSubmit: this.handleSubmit.bind(this),
      _handleBack: this._handleBack.bind(this)
    });
    let user = User.getCurrent();
    user = Object.assign({}, user, {sex: user.sex || 'ស្រី', nationality: user.nationality || 'ខ្មែរ',
                                    grade: '9', highSchoolId: user.highSchoolId || '1',
                                    houseType: user.houseType || 'ផ្ទះឈើ',
                                    collectiveIncome: user.collectiveIncome || '0-25ម៉ឺន'})
    this.setState({user: user});
  }

  _handleBack() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar />
        <KeyboardAwareScrollView>
          {this._renderPersonalInfo()}

        </KeyboardAwareScrollView>
        <Toast ref='toast' positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
       </View>
    )
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
    fields = [ 'fullName', 'dateOfBirth', 'nationality', 'address' ];
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
        realm.create('User', this._buildData(), true);
        realm.create('Sidekiq', { paramUuid: this.state.user.uuid, tableName: 'User' }, true)
        this.props.navigation.state.params.refresh();
        this.props.navigation.goBack();
      });
    } catch (e) {
      alert(e);
    }
  }

  _buildData() {
    return {
      uuid: this.state.user.uuid,
      fullName: this.state.user.fullName,
      username: this.state.user.username,
      sex: this.state.user.sex,
      photo: this.state.user.photo,
      cover: this.state.user.cover,
      dateOfBirth: this.state.user.dateOfBirth,
      phoneNumber: this.state.user.phoneNumber,
      nationality: this.state.user.nationality,
      highSchoolId: this.state.user.highSchoolId,
      grade: this.state.user.grade,
      address: this.state.user.address
    }
  }

  _setUserState(field, value) {
    let user = {...this.state.user};
    user[field] = value;
    this.setState({...this.state, user: user});
  }

  _renderPersonalInfo() {
    return (
      <View style={[styles.container, {backgroundColor: '#fff'}]}>
        { this._renderInputTextContainer({stateName: 'fullName', label: 'ឈ្មោះពេញ'}) }
        { this._renderInputTextContainer({stateName: 'username', label: 'ឈ្មោះគណនី'}) }
        { this._renderPicker({label: 'ភេទ', stateName: 'sex', options: [{label: 'ស្រី', value: 'ស្រី'}, {label: 'ប្រុស', value: 'ប្រុស'}, {label: 'ផ្សេងៗ', value: 'ផ្សេងៗ'}]}) }
        { this._renderDatePicker() }
        { this._renderInputTextContainer({stateName: 'nationality', label: 'សញ្ជាតិ', nextFocusInput: 'phoneNumberInput'}) }
        { this._renderInputTextContainer({stateName: 'phoneNumber', label: 'លេខទូរស័ព្ទ', nextFocusInput: 'addressInput', keyboardType: 'phone-pad'}) }
        { this._renderPicker({label: 'រៀនថ្នាក់ទី', stateName: 'grade', options: grades}) }
        { this._renderPicker({label: 'រៀននៅសាលា', stateName: 'highSchoolId', options: schools})}
        { this._renderInputTextContainer({stateName: 'address', label: 'អាស័យដ្ឋានបច្ចុប្បន្ន'}) }
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
