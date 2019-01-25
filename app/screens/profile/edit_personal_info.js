import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
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
import Grades from '../../data/json/grades.json';

let formError = {};
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
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    user = Object.assign({}, user, {sex: user.sex || 'ស្រី', nationality: user.nationality || 'ខ្មែរ',
                                    grade: '9', houseType: user.houseType || 'ផ្ទះឈើ',
                                    collectiveIncome: user.collectiveIncome || '0-25ម៉ឺន'})
    this.setState({user: user});
  }

  _handleBack() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <KeyboardAwareScrollView>
        {this._renderPersonalInfo()}

        <Toast ref='toast'/>
      </KeyboardAwareScrollView>
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
      <View style={[styles.container, {margin: 16, backgroundColor: '#fff'}]}>
        { this._renderInputTextContainer({stateName: 'fullName', label: 'ឈ្មោះពេញ'}) }
        { this._renderInputTextContainer({stateName: 'username', label: 'ឈ្មោះគណនី'}) }
        { this._renderPicker({label: 'ភេទ', stateName: 'sex', options: [{label: 'ស្រី', value: 'ស្រី'}, {label: 'ប្រុស', value: 'ប្រុស'}, {label: 'ផ្សេងៗ', value: 'ផ្សេងៗ'}]}) }
        { this._renderDatePicker() }
        { this._renderInputTextContainer({stateName: 'nationality', label: 'សញ្ជាតិ', nextFocusInput: 'phoneNumberInput'}) }
        { this._renderInputTextContainer({stateName: 'phoneNumber', label: 'លេខទូរស័ព្ទ', nextFocusInput: 'gradeInput', keyboardType: 'phone-pad'}) }
        { this._renderPicker({label: 'រៀនថ្នាក់ទី', stateName: 'grade', options: grades}) }
        { this._renderInputTextContainer({stateName: 'highSchoolId', label: 'រៀននៅសាលា', nextFocusInput: 'addressInput'}) }
        { this._renderInputTextContainer({stateName: 'address', label: 'អាស័យដ្ឋានបច្ចុប្បន្ន'}) }
      </View>
    )
  }

  _renderDatePicker(){
    return(
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>ថ្ងៃខែឆ្នាំកំណើត</Text>
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
        name={params.label}
        placeholder={placeholder}
        value={value}
        errors={this.state.errors[params.stateName]}
        keyboardType={params.keyboardType || 'default' }
        inputRef={(input) => this[params.stateName + 'Input'] = input}
        onSubmitEditing={() => !!params.nextFocusInput && this[params.nextFocusInput].focus()}
        returnKeyType='next'
        style={ params.style || {} }/>
    )
  }

  _renderPicker(params={}) {
    let PickerSpecific = Platform.OS === 'ios' ?
        IOSPicker :
        Picker;
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{params.label}</Text>
        <PickerSpecific
          mode={Platform.OS === 'ios' ? 'modal' : 'dialog'}
          selectedValue={this.state.user[params.stateName]}
          onValueChange={(itemValue, itemIndex) => this._setUserState(params.stateName, itemValue)}>
          { params.options.map((obj, i) => {
            { return (<Picker.Item key={i} label={obj.label} value={obj.value} />) }
          }) }
        </PickerSpecific>
      </View>
    )
  }
}
