import React, {Component} from 'react';
import {
  Text,
  View,
  Picker,
} from 'react-native';

import styles from '../../assets/style_sheets/profile_form';
import DatePicker from 'react-native-datepicker';
import PickerSpecific from '../../components/picker/PickerSpecific';
import grades from '../../data/json/grades.json';
import provinces from '../../data/json/address/provinces.json';
import communes from '../../data/json/address/communes.json';
import districts from '../../data/json/address/districts.json';
import highSchools from '../../data/json/address/highSchools.json';

import { Icon, Item, Form, Input } from 'native-base';
import SexOptions from '../../components/account/sex_options';

export default class FormScreen extends Component {
  _setUserState(field, value) {
    this.props._setUserState(field, value);
  }

  _getDistricts(){
    let provinceCode = this.props.user.provinceCode;
    return districts.filter((district) => district.parent_code == provinceCode);
  }

  _getCommunes(){
    let districtCode = this.props.user.districtCode;
    return communes.filter((commune) => commune.parent_code == districtCode);
  }

  _getHighSchools(){
    let districtCode = this.props.user.districtCode;
    return highSchools.filter((highSchool) => highSchool.parent_code == districtCode);
  }

  _renderContent = () => {
    let noValue = [{ "code": "", "label": "គ្មានតម្លៃ" }]

    return (
      <View>
        { this._renderFullName() }
        <SexOptions user={this.props.user} setUserState={(pro, value) => this._setUserState(pro, value)} />
        { this._renderDatePicker() }
        { this._renderPhoneNumber() }
        { this._renderPicker({label: 'រៀនថ្នាក់ទី', stateName: 'grade', options: grades}) }
        { this._renderPicker({label: 'ខេត្ត/ក្រុង', stateName: 'provinceCode',
          options: noValue.concat(provinces) })}
        { this._renderPicker({label: 'ស្រុក/ខណ្ឌ', stateName: 'districtCode',
            options: noValue.concat(this._getDistricts()) })}
        { this._renderPicker({label: 'ឃុំ/សង្កាត់', stateName: 'communeCode',
            options: noValue.concat(this._getCommunes()) })}
        { this._renderPicker({label: 'រៀននៅសាលា', stateName: 'highSchoolCode',
            options: noValue.concat(this._getHighSchools()) })}
      </View>
    )
  }

  _renderFullName() {
    return (
      <View style={{marginBottom: 16}}>
        <Item regular>
          <Icon active name='md-person' />
          <Input
            onChangeText={(text) => this._setUserState('fullName', text)}
            returnKeyType='next'
            autoCorrect={false}
            value={this.props.user.fullName}
            placeholderTextColor='rgba(0,0,0,0.7)'
            placeholder='ឈ្មោះពេញ'/>
        </Item>

        { !!this.props.errors.fullName && <Text style={styles.errorText}>{this.props.errors.fullName}</Text> }
      </View>
    )
  }

  _renderPhoneNumber() {
    return (
      <View>
        <Item regular>
          <Icon active name='call' />
          <Input
            onChangeText={(text) => this._setUserState('phoneNumber', text)}
            returnKeyType='next'
            autoCorrect={false}
            value={this.props.user.phoneNumber}
            keyboardType='phone-pad'
            placeholderTextColor='rgba(0,0,0,0.7)'
            placeholder='លេខទូរស័ព្ទ'/>
        </Item>
      </View>
    )
  }

  _renderDatePicker(){
    return(
      <View style={styles.inputContainer}>
        <Text style={styles.labelColor}>ថ្ងៃខែឆ្នាំកំណើត</Text>
        <DatePicker
          style={{width: 200}}
          date={this.props.user.dateOfBirth}
          mode="date"
          androidMode='spinner'
          placeholder="select date"
          format="DD-MMM-YYYY"
          confirmBtnText="យល់ព្រម"
          cancelBtnText="បោះបង់"
          maxDate={new Date()}
          onDateChange={(date) => {this._setUserState('dateOfBirth', date)}} />
        <Text style={styles.errorText}>{this.props.errors.dateOfBirth}</Text>
      </View>
    )
  }

  _renderPicker(params={}) {
    return (
      <PickerSpecific
        data={params}
        user={this.props.user}
        onValueChange={(itemValue, itemIndex) => this._setUserState(params.stateName, itemValue) } />
    )
  }

  render() {
    return (this._renderContent());
  }
}
