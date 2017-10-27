import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  ThemeProvider,
  Icon,
} from 'react-native-material-ui';

// Utils
import realm from '../schema';
import User from '../utils/user';
import styles from '../assets/style_sheets/profile_form';
import headerStyles from '../assets/style_sheets/header';

import InputTextContainer from '../components/input_text_container';

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
      formError[field] = ["can't be blank"];
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
      return;
    }

    try {
      realm.write(() => {
        realm.create('User', this.state.user, true);
        this.props.navigation.state.params.refresh();
        this.props.navigation.goBack();
      });
    } catch (e) {
      alert(e);
    }
  }

  _setUserState(field, value) {
    let user = {...this.state.user};
    user[field] = value;
    this.setState({...this.state, user: user});
  }

  _renderFamilyInfo() {
    return (
      <View style={[styles.container, {margin: 16, backgroundColor: '#fff'}]}>
        <View style={{flexDirection: 'row'}}>
          <InputTextContainer
            onChangeText={((text) => this._setUserState('fatherName', text)).bind(this)}
            label='ឈ្មោះឪពុក'
            value={this.state.user.fatherName}
            errors={this.state.errors.fatherName}
            style={{flex: 1}}/>

          <InputTextContainer
            onChangeText={((text) => this._setUserState('fatherOccupation', text)).bind(this)}
            label='មុខរបរ'
            value={this.state.user.fatherOccupation}
            errors={this.state.errors.fatherOccupation}
            style={{flex: 1}}/>
        </View>

        <View style={{flexDirection: 'row'}}>
          <InputTextContainer
            onChangeText={((text) => this._setUserState('motherName', text)).bind(this)}
            label='ម្តាយឈ្មោះ'
            value={this.state.user.motherName}
            errors={this.state.errors.motherName}
            style={{flex: 1}}/>

          <InputTextContainer
            onChangeText={((text) => this._setUserState('motherOccupation', text)).bind(this)}
            label='មុខរបរ'
            value={this.state.user.motherOccupation}
            errors={this.state.errors.motherOccupation}
            style={{flex: 1}}/>
        </View>

        <InputTextContainer
          onChangeText={((text) => this._setUserState('guidance', text)).bind(this)}
          label='អាណាព្យាបាល'
          value={this.state.user.guidance}
          errors={this.state.errors.guidance}/>

        <InputTextContainer
          onChangeText={((text) => this._setUserState('parentContactNumber', text)).bind(this)}
          label='លេខទូរស័ព្ទឪពុកម្តាយ'
          value={this.state.user.parentContactNumber}
          keyboardType='phone-pad'/>

        <View style={{flexDirection: 'row'}}>
          <InputTextContainer
            onChangeText={((text) => this._setUserState('numberOfFamilyMember', text)).bind(this)}
            label='ចំនួនសមាជិកគ្រួសារ'
            value={this.state.user.numberOfFamilyMember + ''}
            errors={this.state.errors.numberOfFamilyMember}
            keyboardType='numeric'
            style={{flex: 1}}/>

          <InputTextContainer
            onChangeText={((text) => this._setUserState('numberOfSisters', text)).bind(this)}
            label='ចំនួនបងប្អូនស្រី'
            value={this.state.user.numberOfSisters + ''}
            errors={this.state.errors.numberOfSisters}
            keyboardType='numeric'
            style={{flex: 1}}/>

          <InputTextContainer
            onChangeText={((text) => this._setUserState('numberOfBrothers', text)).bind(this)}
            label='ចំនួនបងប្អូនប្រុស'
            value={this.state.user.numberOfBrothers + ''}
            errors={this.state.errors.numberOfBrothers}
            keyboardType='numeric'
            style={{flex: 1}}/>
        </View>
      </View>
    )
  }
}
