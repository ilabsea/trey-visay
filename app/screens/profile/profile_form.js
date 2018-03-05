import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Picker,
  TouchableOpacity,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';

import {
  ThemeProvider,
  Icon
} from 'react-native-material-ui';

import DatePicker from 'react-native-datepicker';
import Collapsible from 'react-native-collapsible';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ConfirmDialog } from 'react-native-simple-dialogs';

// Utils
import realm from '../../schema';
import User from '../../utils/user';
import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import StatusBar from '../../components/status_bar';

// Components
import RadioGroupContainer from '../../components/radio_group_container';
import InputTextContainer from '../../components/input_text_container';

import highSchoolList from '../../data/json/high_schools';

let formError = {};

const CONTENTS = [
  { header: 'ព័ត៌មានផ្ទាល់ខ្លួន', body: '_renderPersonalInfo' },
  { header: 'ព័ត៌មានគ្រួសារ', body: '_renderFamilyInfo' },
  { header: 'ស្ថានភាពគ្រួសារ', body: '_renderFamilySituation' }
];

export default class ProfileForm extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'បំពេញប្រវត្តិរូបសង្ខេប',
      headerStyle: headerStyles.headerStyle,
      headerTitleStyle: headerStyles.headerTitleStyle,
      headerRight: (<ThemeProvider uiTheme={{}}>
                    <TouchableOpacity style={headerStyles.actionWrapper} onPress={() => navigation.state.params.handleSubmit()}>
                      <Icon name="done" color='#fff' size={24} />
                      <Text style={headerStyles.saveText}>រក្សាទុក</Text>
                    </TouchableOpacity>
                   </ThemeProvider>),
    }
  };

  componentWillMount() {
    this.props.navigation.setParams({handleSubmit: this.handleSubmit.bind(this)});

    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    user = Object.assign({}, user, {sex: 'ស្រី', nationality: 'ខ្មែរ', grade: '9',
                                    highSchoolId: '1',
                                    houseType: 'ផ្ទះឈើ', collectiveIncome: '0-25ម៉ឺន'})

    this.state = {
      user: user,
      errors: {},
      collapsed0: false,
      collapsed1: true,
      collapsed2: true,
      confirmDialogVisible: false,
    }
  }

  _skip() {
    try {
      realm.write(() => {
        realm.create('User', { uuid: this.state.user.uuid, highSchoolId: '14', grade: 'ផ្សេងៗ' }, true);
        realm.create('Sidekiq', { paramUuid: this.state.user.uuid, tableName: 'User' }, true)
        this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'Home'}]})
      });
    } catch (e) {
      alert(e);
    }
  }

  _renderContent() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', marginVertical: 16}}>
          <MaterialIcon name='stars' color='#e94b35' size={24} style={{marginRight: 8}} />
          <View style={{flex: 1}}>
            <Text>អ្នកត្រូវបំពេញពត៌មានផ្ទាល់ខ្លួនខាងក្រោមដើម្បីប្រើប្រាស់កម្មវិធី។ </Text>
            <View style={styles.inlineBlock}>
              <Text>ឬអ្នកចង់បំពេញនៅពេលក្រោយ? </Text>
              <TouchableOpacity onPress={() => this._skip()}>
                <Text style={{color: '#4caf50', fontFamily: 'KantumruyBold'}}>រំលង</Text>
              </TouchableOpacity>

              <Text> ឬ </Text>
              <TouchableOpacity onPress={() => this.setState({confirmDialogVisible: true})}>
                <Text style={{color: '#4caf50', fontFamily: 'KantumruyBold'}}>ចាកចេញពីគណនី</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        { !!this.state.user && CONTENTS.map((obj, i) => {
          return( <View key={i}>{this._renderSection(obj, i)}</View>)
        })}

      </View>
    )
  }

  _onYes() {
    User.logout();
    this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'Login'}], key: null});
  }

  _onNo() {
    this.setState({confirmDialogVisible: false});
  }

  render() {
    return (
      <ThemeProvider uiTheme={{}}>
        <View style={{flex: 1}}>
          <StatusBar />
          <ScrollView style={{flex: 1}}>
            { this._renderContent() }
          </ScrollView>

          <ConfirmDialog
            title="អ្នកពិតជាចង់ចាកចេញមែនទេ?"
            message="បើអ្នកចាកចេញពត័មានដែលអ្នកបានបំពេញនឹងមិនត្រូវបានរក្សារទុកឡើយ!"
            visible={this.state.confirmDialogVisible}
            onTouchOutside={() => this.setState({confirmDialogVisible: false})}
            positiveButton={{
              title: "ចាកចេញ",
              onPress: this._onYes.bind(this)
            }}
            negativeButton={{
              title: "អត់ទេ",
              onPress: this._onNo.bind(this)
            }}
          />

        </View>
      </ThemeProvider>
    )
  }

  _setUserState(field, value) {
    let user = {...this.state.user};
    user[field] = value;
    this.setState({...this.state, user: user});
  }

  _renderSection(obj, i) {
    let collapsedSection = 'collapsed' + i;
    return (
      <View style={styles.box}>
        <TouchableHighlight onPress={this._toggleExpanded.bind(this, collapsedSection)}>
          <Text style={styles.subTitle}>{obj.header}</Text>
        </TouchableHighlight>

        <Collapsible collapsed={this.state[collapsedSection]}>
          {this[obj.body]()}
        </Collapsible>
      </View>
    )
  }

  _toggleExpanded(collapsedIndex) {
    let obj = {};
    obj[collapsedIndex] = !this.state[collapsedIndex];
    this.setState(obj);
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
    fields = [ 'fullName', 'dateOfBirth', 'nationality', 'address', 'fatherName', 'fatherOccupation', 'motherName',
               'motherOccupation', 'guidance', 'numberOfFamilyMember','numberOfSisters','numberOfBrothers'];
    for (var i = 0; i < fields.length; i++) {
      this.checkRequire(fields[i]);
    }

    return Object.keys(formError).length == 0;
  }

  _openErrorCollapsed() {
    let section1 = ['fullName', 'dateOfBirth', 'nationality', 'address'];
    let section2 = ['fatherName', 'fatherOccupation', 'motherName', 'motherOccupation', 'guidance', 'numberOfFamilyMember','numberOfSisters','numberOfBrothers'];
    let errors = Object.keys(formError);
    let foundInSection1 = errors.some(r=> section1.includes(r));
    let foundInSection2 = errors.some(r=> section2.includes(r));
    if (foundInSection1) {
      this.setState({collapsed0: false})
    }
    if (foundInSection2) {
      this.setState({collapsed1: false})
    }

    this.setState({collapsed2: false})
  }

  handleSubmit() {
    if (!this.isValidForm()) {
      this._openErrorCollapsed();
      return ToastAndroid.show('សូមបំពេញព័ត៌មានខាងក្រោមជាមុនសិន...!', ToastAndroid.SHORT);
    }

    try {
      realm.write(() => {
        realm.create('User', this.state.user, true);
        realm.create('Sidekiq', { paramUuid: this.state.user.uuid, tableName: 'User' }, true)
        this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'Home'}]})
      });
    } catch (e) {
      alert(e);
    }
  }

  _renderPersonalInfo() {
    let schools = highSchoolList.map((obj) => { return {label: obj.name, value: obj.id}});
    let grades = [
      { label: 'ថ្នាក់ទី9', value: '9' }, { label: 'ថ្នាក់ទី10', value: '10' },
      { label: 'ថ្នាក់ទី11', value: '11' }, { label: 'ថ្នាក់ទី12', value: '12' },
      { label: 'ផ្សេងៗ', value: 'ផ្សេងៗ' }];

    return (
      <View>
        { this._renderInputTextContainer({stateName: 'fullName', label: 'ឈ្មោះពេញ'}) }
        { this._renderInputTextContainer({stateName: 'username', label: 'ឈ្មោះគណនី'}) }
        { this._renderPicker({label: 'ភេទ', stateName: 'sex', options: [{label: 'ស្រី', value: 'ស្រី'}, {label: 'ប្រុស', value: 'ប្រុស'}, {label: 'ផ្សេងៗ', value: 'ផ្សេងៗ'}]}) }

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>ថ្ងៃខែឆ្នាំកំណើត</Text>
          <DatePicker
            style={{width: 200}}
            date={this.state.user.dateOfBirth}
            mode="date"
            androidMode='spinner'
            placeholder="select date"
            format="DD-MMM-YYYY"
            maxDate={new Date()}
            onDateChange={(date) => {this._setUserState('dateOfBirth', date)}} />
          <Text style={styles.errorText}>{this.state.errors.dateOfBirth}</Text>
        </View>

        { this._renderInputTextContainer({stateName: 'nationality', label: 'សញ្ជាតិ', nextFocusInput: 'phoneNumberInput'}) }
        { this._renderInputTextContainer({stateName: 'phoneNumber', label: 'លេខទូរស័ព្ទ', nextFocusInput: 'addressInput', keyboardType: 'phone-pad'}) }
        { this._renderPicker({label: 'រៀនថ្នាក់ទី', stateName: 'grade', options: grades}) }
        { this._renderPicker({label: 'រៀននៅសាលា', stateName: 'highSchoolId', options: schools})}
        { this._renderInputTextContainer({stateName: 'address', label: 'អាស័យដ្ឋានបច្ចុប្បន្ន', nextFocusInput: 'fatherNameInput'}) }
      </View>
    )
  }

  _renderFamilyInfo() {
    return (
      <View>
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

  _renderFamilySituation() {
    let houseTypes = [
      { label: 'ផ្ទះឈើ', value: 'ផ្ទះឈើ' },
      { label: 'ផ្ទះឈើលើថ្មក្រោម', value: 'ផ្ទះឈើលើថ្មក្រោម' },
      { label: 'ផ្ទះថ្ម', value: 'ផ្ទះថ្ម' },
      { label: 'ផ្ទះស័ង្កសី', value: 'ផ្ទះស័ង្កសី' },
      { label: 'ផ្ទះស្លឹក', value: 'ផ្ទះស្លឹក' },
    ];

    let collectiveIncomes = [
      { label: 'ក្រោម 25ម៉ឺនរៀល', value: '0-25ម៉ឺន' }, { label: 'ចន្លោះ 25ម៉ឺន-50ម៉ឺនរៀល', value: '25ម៉ឺន-50ម៉ឺន' },
      { label: 'ចន្លោះ 50ម៉ឺន-75ម៉ឺនរៀល', value: '50ម៉ឺន-75ម៉ឺន' }, { label: 'ចន្លោះ 75ម៉ឺន-1លានរៀល', value: '75ម៉ឺន-1លាន' },
      { label: 'លើស1លានរៀល', value: 'លើស1លាន' }];

    return (
      <View>
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
}
