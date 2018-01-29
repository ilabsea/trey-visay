import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Picker,
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
        realm.create('User', this.state.user, true);
        realm.create('Sidekiq', { paramUuid: this.state.user.uuid, tableName: 'User' }, true)
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
        { this._renderRadioGroup({stateName: 'isDomesticViolence', label: 'តើក្នុងគ្រួសាររបស់សិស្សមានការប្រើប្រាស់នូវអពើហិង្សាដែរឬទេ?'}) }
        { this._renderRadioGroup({stateName: 'isSmoking', label: 'តើមានសមាជិកណាមួយក្នុងគ្រួសារសិស្សមានជក់បារីដែរឬទេ?'}) }
        { this._renderRadioGroup({stateName: 'isAlcoholic', label: 'តើមានសមាជិកណាមួយក្នុងគ្រួសារសិស្សមានញៀនសុរាទេ?'}) }
        { this._renderRadioGroup({stateName: 'isDrug', label: 'តើមានសមាជិកណាមួយក្នុងគ្រួសារសិស្សមានញៀនគ្រឿងញៀនដែរឬទេ?'}) }
        { this._renderPicker({label: 'តើប្អូនមានប្រភេទផ្ទះបែបណា?', stateName: 'houseType', options: houseTypes}) }
        { this._renderPicker({label: 'តើគ្រួសារប្អូនមានចំណូលប្រចាំខប្រហែលែប៉ុន្មាន?', stateName: 'collectiveIncome', options: collectiveIncomes}) }
      </View>
    )
  }
}
