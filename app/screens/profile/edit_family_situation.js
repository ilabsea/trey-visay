import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Picker,
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

import RadioGroupContainer from '../../components/radio_group_container';

let formError = {};

export default class EditFamilySituation extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack } = navigation;

    return {
      title: 'កែសម្រួល',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>កែសម្រួល</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => goBack()} style={{marginLeft: 16}}>
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
        {this._renderFamilySituation()}
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

  _renderFamilySituation() {
    return (
      <View style={[styles.container, {margin: 16, backgroundColor: '#fff'}]}>
        <RadioGroupContainer
          options={[{ label: 'គ្មានទេ', value: false }, { label: 'លែងលះ', value: true }]}
          onPress={((text) => this._setUserState('isDivorce', text)).bind(this)}
          value={this.state.user.isDivorce}
          label='តើឪពុកម្តាយរបស់ប្អូនមានការលែងលះដែរឬទេ?' />

        <RadioGroupContainer
          options={[{ label: 'គ្មានទេ', value: false }, { label: 'មាន', value: true }]}
          onPress={((text) => this._setUserState('isDisable', text)).bind(this)}
          value={this.state.user.isDisable}
          label='តើមានសមាជិកណាម្នាក់មានពិការភាពដែរឬទេ?' />

        <RadioGroupContainer
          options={[{ label: 'គ្មានទេ', value: false }, { label: 'មាន', value: true }]}
          onPress={((text) => this._setUserState('isDomesticViolence', text)).bind(this)}
          value={this.state.user.isDomesticViolence}
          label='តើក្នុងគ្រួសាររបស់សិស្សមានការប្រើប្រាស់នូវអពើហិង្សាដែរឬទេ?' />

        <RadioGroupContainer
          options={[{ label: 'គ្មានទេ', value: false }, { label: 'មាន', value: true }]}
          onPress={((text) => this._setUserState('isSmoking', text)).bind(this)}
          value={this.state.user.isSmoking}
          label='តើមានសមាជិកណាមួយក្នុងគ្រួសារសិស្សមានជក់បារីដែរឬទេ?' />

        <RadioGroupContainer
          options={[{ label: 'គ្មានទេ', value: false }, { label: 'មាន', value: true }]}
          onPress={((text) => this._setUserState('isAlcoholic', text)).bind(this)}
          value={this.state.user.isAlcoholic}
          label='តើមានសមាជិកណាមួយក្នុងគ្រួសារសិស្សមានញៀនសុរាទេ?' />

        <RadioGroupContainer
          options={[{ label: 'គ្មានទេ', value: false }, { label: 'មាន', value: true }]}
          onPress={((text) => this._setUserState('isDrug', text)).bind(this)}
          value={this.state.user.isDrug}
          label='តើមានសមាជិកណាមួយក្នុងគ្រួសារសិស្សមានញៀនគ្រឿងញៀនដែរឬទេ?' />

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>តើប្អូនមានប្រភេទផ្ទះបែបណា?</Text>
          <Picker
            selectedValue={this.state.user.houseType}
            onValueChange={(itemValue, itemIndex) => this._setUserState('houseType', itemValue)}>
            <Picker.Item label="ផ្ទះឈើ" value="ផ្ទះឈើ" />
            <Picker.Item label="ផ្ទះថ្ម" value="ផ្ទះថ្ម" />
            <Picker.Item label="ផ្ទះស័ង្កសី" value="ផ្ទះស័ង្កសី" />
            <Picker.Item label="ផ្ទះស្លឹក" value="ផ្ទះស្លឹក" />
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>តើគ្រួសារប្អូនមានចំណូលប្រចាំខែប៉ុន្មាន? (គិតជារៀល)</Text>
          <Picker
            selectedValue={this.state.user.collectiveIncome}
            onValueChange={(itemValue, itemIndex) => this._setUserState('collectiveIncome', itemValue)}>
            <Picker.Item label="ក្រោម 25ម៉ឺន" value="0-25ម៉ឺន" />
            <Picker.Item label="ចន្លោះ 25ម៉ឺន-50ម៉ឺន" value="25ម៉ឺន-50ម៉ឺន" />
            <Picker.Item label="ចន្លោះ 50ម៉ឺន-75ម៉ឺន" value="50ម៉ឺន-75ម៉ឺន" />
            <Picker.Item label="ចន្លោះ 75ម៉ឺន-1លាន" value="75ម៉ឺន-1លាន" />
            <Picker.Item label="លើស1លាន" value="លើស1លាន" />
          </Picker>
        </View>
      </View>
    )
  }
}
