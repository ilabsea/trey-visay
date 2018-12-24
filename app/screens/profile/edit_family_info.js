import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Toast, { DURATION } from 'react-native-easy-toast';

// Utils
import realm from '../../schema';
import User from '../../utils/user';
import styles from '../../assets/style_sheets/profile_form';

import InputTextContainer from '../../components/input_text_container';

let formError = {};

export default class EditFamilyInfo extends Component {
  constructor(props) {
    super(props)
    this.state = { user: '', errors: {} };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      handleSubmit: this.handleSubmit.bind(this),
      _handleBack: this._handleBack.bind(this)
    });
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    this.setState({user: user});
  }

  _handleBack(){
    this.props.navigation.goBack();
  }

  render() {
    return (
      <ScrollView>
        {this._renderFamilyInfo()}
        <Toast ref='toast'/>
      </ScrollView>
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
    fields = [ 'fatherName', 'fatherOccupation', 'motherName', 'motherOccupation', 'guidance', 'numberOfFamilyMember','numberOfSisters','numberOfBrothers'];
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
      fatherName: this.state.user.fatherName,
      fatherOccupation: this.state.user.fatherOccupation,
      motherName: this.state.user.motherName,
      motherOccupation: this.state.user.motherOccupation,
      guidance: this.state.user.guidance,
      parentContactNumber: this.state.user.parentContactNumber,
      numberOfFamilyMember: this.state.user.numberOfFamilyMember,
      numberOfSisters: this.state.user.numberOfSisters,
      numberOfBrothers: this.state.user.numberOfBrothers
    }
  }

  _setUserState(field, value) {
    let user = {...this.state.user};
    user[field] = value;
    this.setState({...this.state, user: user});
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

  _renderFamilyInfo() {
    return (
      <View style={[styles.container, {margin: 16, backgroundColor: '#fff'}]}>
        <View style={{flexDirection: 'row'}}>
          { this._renderInputTextContainer({stateName: 'fatherName', label: 'ឈ្មោះឪពុក', nextFocusInput: 'fatherOccupationInput', style: {flex: 1}}) }
          { this._renderInputTextContainer({stateName: 'fatherOccupation', label: 'មុខរបរ', nextFocusInput: 'motherNameInput', style: {flex: 1}}) }
        </View>

        <View style={{flexDirection: 'row'}}>
          { this._renderInputTextContainer({stateName: 'motherName', label: 'ម្តាយឈ្មោះ', nextFocusInput: 'motherOccupationInput', style: {flex: 1}}) }
          { this._renderInputTextContainer({stateName: 'motherOccupation', label: 'មុខរបរ', nextFocusInput: 'guidanceInput', style: {flex: 1}}) }
        </View>

        { this._renderInputTextContainer({stateName: 'guidance', label: 'អាណាព្យាបាល', nextFocusInput: 'parentContactNumberInput'}) }
        { this._renderInputTextContainer({stateName: 'parentContactNumber', label: 'លេខទូរស័ព្ទឪពុកម្តាយ', nextFocusInput: 'numberOfFamilyMemberInput', keyboardType: 'phone-pad'}) }

        <View style={{flexDirection: 'row'}}>
          { this._renderInputTextContainer({stateName: 'numberOfFamilyMember', label: 'ចំនួនសមាជិកគ្រួសារ', nextFocusInput: 'numberOfSistersInput', keyboardType: 'numeric', style: {flex: 1}}) }
          { this._renderInputTextContainer({stateName: 'numberOfSisters', label: 'ចំនួនបងប្អូនស្រី', nextFocusInput: 'numberOfBrothersInput', keyboardType: 'numeric', style: {flex: 1}}) }
          { this._renderInputTextContainer({stateName: 'numberOfBrothers', label: 'ចំនួនបងប្អូនប្រុស', keyboardType: 'numeric', style: {flex: 1}}) }
        </View>
      </View>
    )
  }
}
