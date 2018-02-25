import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import {
  ThemeProvider,
  Icon,
} from 'react-native-material-ui';

// Utils
import realm from '../../schema';
import User from '../../utils/user';
import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';

import InputTextContainer from '../../components/input_text_container';

let formError = {};

export default class EditFamilyInfo extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack } = navigation;

    return {
      title: 'កែសម្រួល',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>កែសម្រួល</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => goBack()} style={{marginHorizontal: 16}}>
                      <Icon name='close' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>,
      headerRight: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity style={headerStyles.actionWrapper} onPress={() => navigation.state.params.handleSubmit()}>
                      <Icon name="done" color='#fff' size={24} />
                      <Text style={headerStyles.saveText}>រក្សាទុក</Text>
                    </TouchableOpacity>
                   </ThemeProvider>,
    }
  };

  constructor(props) {
    super(props)
    this.state = { user: '', errors: {} };
  }

  componentDidMount() {
    this.props.navigation.setParams({handleSubmit: this.handleSubmit.bind(this)});
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    this.setState({user: user});
  }

  render() {
    return (
      <ScrollView>
        {this._renderFamilyInfo()}
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
      return ToastAndroid.show('សូមបំពេញព័ត៌មានខាងក្រោមជាមុនសិន...!', ToastAndroid.SHORT);
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
    return (
      <InputTextContainer
        onChangeText={((text) => this._setUserState(params.stateName, text)).bind(this)}
        label={params.label}
        value={this.state.user[params.stateName]}
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
