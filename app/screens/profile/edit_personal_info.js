import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Picker,
  Platform
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';

// Utils
import realm from '../../db/schema';
import User from '../../utils/user';
import Sidekiq from '../../utils/models/sidekiq';
import styles from '../../assets/style_sheets/profile_form';
import DatePicker from 'react-native-datepicker';
import StatusBar from '../../components/shared/status_bar';
import PickerSpecific from '../../components/picker/PickerSpecific';
import grades from '../../data/json/grades.json';
import provinces from '../../data/json/address/provinces.json';
import communes from '../../data/json/address/communes.json';
import districts from '../../data/json/address/districts.json';
import highSchools from '../../data/json/address/highSchools.json';

import { Container, Content, Icon, Item, Form, Input } from 'native-base';
import FooterBar from '../../components/footer/FooterBar';
import SexOptions from '../../components/account/sex_options';

let formError = {};

export default class EditPersonalInfo extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'កែតម្រូវប្រវត្តិរូបសង្ខេប',
    headerLeft: (
      <TouchableOpacity onPress={() => { navigation.state.params._handleBack()}} style={{marginHorizontal: 16}}>
        <Icon name='arrow-back' style={{color: '#fff'}} size={24} />
      </TouchableOpacity>
    ),
    headerRight: null
  });

  constructor(props) {
    super(props)

    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    user = Object.assign({}, user, { sex: user.sex || 'ស្រី', grade: user.grade || '9' })

    this.state = { user: user, errors: {} };
    this.props.navigation.setParams({
      handleSubmit: this.handleSubmit.bind(this),
      _handleBack: this._handleBack.bind(this)
    });
  }

  _handleBack() {
    this.props.navigation.goBack();
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
        realm.create('User', this._buildData(), true);
        Sidekiq.create(this.state.user.uuid, 'User');
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
      sex: this.state.user.sex,
      photo: this.state.user.photo,
      cover: this.state.user.cover,
      dateOfBirth: this.state.user.dateOfBirth,
      phoneNumber: this.state.user.phoneNumber,
      highSchoolCode: this.state.user.highSchoolCode,
      provinceCode: this.state.user.provinceCode,
      districtCode: this.state.user.districtCode,
      communeCode: this.state.user.communeCode,
      grade: this.state.user.grade,
    }
  }

  _setUserState(field, value) {
    let user = {...this.state.user};
    user[field] = value;
    this.setState({...this.state, user: user});
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

  _renderContent = () => {
    let noValue = [{ "code": "", "label": "គ្មានតម្លៃ" }]

    return (
      <View style={[styles.container]}>
        { this._renderFullName() }
        <SexOptions user={this.state.user} />
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
            value={this.state.user.fullName}
            placeholderTextColor='rgba(0,0,0,0.7)'
            placeholder='ឈ្មោះពេញ'/>
        </Item>

        { !!this.state.errors.fullName && <Text style={styles.errorText}>{this.state.errors.fullName}</Text> }
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
            value={this.state.user.phoneNumber}
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

  _renderPicker(params={}) {
    return (
      <PickerSpecific
        data={params}
        user={this.state.user}
        onValueChange={(itemValue, itemIndex) => this._setUserState(params.stateName, itemValue) } />
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar />
        <Container>
          <Content>
            { this._renderContent() }
          </Content>

          <Toast ref='toast' positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
          <FooterBar icon='keyboard-arrow-right' text='រក្សាទុក' onPress={() => this.handleSubmit()} />
        </Container>
      </View>
    );
  }
}
