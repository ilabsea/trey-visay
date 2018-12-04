import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Picker
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';

// Utils
import realm from '../../schema';
import User from '../../utils/user';
import styles from '../../assets/style_sheets/profile_form';

import RadioGroupContainer from '../../components/radio_group_container';


let formError = {};

export default class EditFamilySituation extends Component {
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

  _handleBack() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <ScrollView>
        {this._renderFamilySituation()}
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
      isDivorce: this.state.user.isDivorce,
      isDisable: this.state.user.isDisable,
      isDomesticViolence: this.state.user.isDomesticViolence,
      isSmoking: this.state.user.isSmoking,
      isAlcoholic: this.state.user.isAlcoholic,
      isDrug: this.state.user.isDrug,
      houseType: this.state.user.houseType,
      collectiveIncome: this.state.user.collectiveIncome
    }
  }

  _setUserState(field, value) {
    let user = {...this.state.user};
    user[field] = value;
    this.setState({...this.state, user: user});
  }

  _renderRadioGroup(params = {}) {
    return (
      <RadioGroupContainer
        options={ params.options || [{ label: 'គ្មានទេ', value: false }, { label: 'មាន', value: true }]}
        onPress={((text) => this._setUserState(params.stateName, text)).bind(this)}
        value={this.state.user[params.stateName]}
        label={params.label} />
    )
  }

  _renderPicker(params={}) {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{params.label}</Text>
        <Picker
          selectedValue={this.state.user[params.stateName]}
          onValueChange={(itemValue, itemIndex) => this._setUserState(params.stateName, itemValue)}>
          { params.options.map((obj, i) => {
            { return (<Picker.Item key={i} label={obj.label} value={obj.value} />) }
          }) }
        </Picker>
      </View>
    )
  }

  _renderFamilySituation() {
    let houseTypes = [
      { label: 'ផ្ទះឈើ', value: 'ផ្ទះឈើ' },
      { label: 'ផ្ទះឈើលើថ្មក្រោម', value: 'ផ្ទះឈើលើថ្មក្រោម' },
      { label: 'ផ្ទះថ្ម', value: 'ផ្ទះថ្ម' },
      { label: 'ផ្ទះស័ង្កសី', value: 'ផ្ទះស័ង្កសី' },
      { label: 'ផ្ទះស្លឹក', value: 'ផ្ទះស្លឹក' },
    ];

    let collectiveIncomes = [
      { label: 'ក្រោម 25ម៉ឺន', value: '0-25ម៉ឺន' }, { label: 'ចន្លោះ 25ម៉ឺន-50ម៉ឺន', value: '25ម៉ឺន-50ម៉ឺន' },
      { label: 'ចន្លោះ 50ម៉ឺន-75ម៉ឺន', value: '50ម៉ឺន-75ម៉ឺន' }, { label: 'ចន្លោះ 75ម៉ឺន-1លាន', value: '75ម៉ឺន-1លាន' },
      { label: 'លើស1លាន', value: 'លើស1លាន' }];

    return (
      <View style={[styles.container, {margin: 16, backgroundColor: '#fff'}]}>
        { this._renderRadioGroup({stateName: 'isDivorce', label: 'តើឪពុកម្តាយរបស់ប្អូនមានការលែងលះដែរឬទេ?', options: [{ label: 'គ្មានទេ', value: false }, { label: 'លែងលះ', value: true }]}) }
        { this._renderRadioGroup({stateName: 'isDisable', label: 'តើមានសមាជិកណាម្នាក់មានពិការភាពដែរឬទេ?'}) }
        { this._renderRadioGroup({stateName: 'isDomesticViolence', label: 'តើក្នុងគ្រួសាររបស់ប្អូន មានអំពើហឹង្សាដែរឬទេ?'}) }
        { this._renderRadioGroup({stateName: 'isSmoking', label: 'តើមានសមាជិកណាមួយក្នុងគ្រូសារប្អូន ជក់បារីដែរឬទេ?'}) }
        { this._renderRadioGroup({stateName: 'isAlcoholic', label: 'តើមានសមាជិកណាមួយក្នុងគ្រូសារប្អូន ញៀនសុរាដែរឬទេ?'}) }
        { this._renderRadioGroup({stateName: 'isDrug', label: 'តើមានសមាជិកណាមួយក្នុងគ្រូសារប្អូន ប្រើប្រាស់គ្រឿងញៀនដែរឬទេ?'}) }
        { this._renderPicker({label: 'តើប្អូនមានប្រភេទផ្ទះបែបណា?', stateName: 'houseType', options: houseTypes}) }
        { this._renderPicker({label: 'តើគ្រួសាររបស់ប្អូនរកប្រាក់ចំណូលជាមធ្យមប្រហែលប៉ុន្មាន ក្នុង១ខែ?', stateName: 'collectiveIncome', options: collectiveIncomes}) }
      </View>
    )
  }
}
