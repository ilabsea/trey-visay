import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Picker,
  TouchableOpacity,
  Platform,
  TouchableHighlight
} from 'react-native';

import DatePicker from 'react-native-datepicker';
import Collapsible from 'react-native-collapsible';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import Toast, { DURATION } from 'react-native-easy-toast';
import IOSPicker from 'react-native-ios-picker';

// Utils
import realm from '../../schema';
import User from '../../utils/user';
import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import StatusBar from '../../components/status_bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Components
import RadioGroupContainer from '../../components/radio_group_container';
import InputTextContainer from '../../components/input_text_container';
import SaveButton from '../../components/save_button';

import FamilySituation from '../../data/json/family_situation.json';

let formError = {};

const CONTENTS = [
  { header: 'ព័ត៌មានផ្ទាល់ខ្លួន', body: '_renderPersonalInfo' },
  { header: 'ស្ថានភាពគ្រួសារ', body: '_renderFamilySituation' }
];

export default class ProfileForm extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'បំពេញប្រវត្តិរូបសង្ខេប',
      headerStyle: headerStyles.headerStyle,
      headerTitleStyle: headerStyles.headerTitleStyle,
      headerRight: (<SaveButton navigation={navigation}/>),
    }
  }

  _handleSubmit;
  state;

  constructor(props) {
    super(props);
    this._handleSubmit = this.props.navigation.setParams({ handleSubmit: this.handleSubmit.bind(this) });
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    user = Object.assign({}, user, { sex: 'ស្រី', nationality: 'ខ្មែរ',
                                    houseType: 'ផ្ទះឈើ', collectiveIncome: '0-25ម៉ឺន' })

    this.state = {
      user: user,
      errors: {},
      collapsed0: false,
      collapsed1: true,
      confirmDialogVisible: false,
    }
  }

  componentWillMount() {
    this._handleSubmit;
  }

  _skip() {
    try {
      realm.write(() => {
        realm.create('User', { uuid: this.state.user.uuid }, true);
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
                <Text style={{color: '#4caf50', fontWeight: 'bold'}}>រំលង</Text>
              </TouchableOpacity>

              <Text> ឬ </Text>
              <TouchableOpacity onPress={() => this.setState({confirmDialogVisible: true})}>
                <Text style={{color: '#4caf50', fontWeight: 'bold'}}>ចាកចេញពីគណនី</Text>
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
      <View style={{flex: 1}}>
        <StatusBar />
        <KeyboardAwareScrollView>
          { this._renderContent() }
        </KeyboardAwareScrollView>

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

        <Toast ref="toast"/>

      </View>
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
        <TouchableHighlight onPress={this._toggleExpanded.bind(this, collapsedSection)} underlayColor="#F7FAF7">
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
    fields = [ 'fullName', 'dateOfBirth', 'nationality', 'address'];
    for (var i = 0; i < fields.length; i++) {
      this.checkRequire(fields[i]);
    }

    return Object.keys(formError).length == 0;
  }

  _openErrorCollapsed() {
    let section1 = ['fullName', 'dateOfBirth', 'nationality', 'address'];
    let errors = Object.keys(formError);
    let foundInSection1 = errors.some(r=> section1.includes(r));
    if (foundInSection1) {
      this.setState({collapsed0: false})
    }

    this.setState({collapsed1: false})
  }

  handleSubmit() {
    if (!this.isValidForm()) {
      this._openErrorCollapsed();
      return this.refs.toast.show('សូមបំពេញព័ត៌មានខាងក្រោមជាមុនសិន...!', DURATION.SHORT);
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
    return (
      <View>
        { this._renderInputTextContainer({stateName: 'fullName', label: 'ឈ្មោះពេញ', nextFocusInput: 'usernameInput'}) }
        { this._renderInputTextContainer({stateName: 'username', label: 'ឈ្មោះគណនី'}) }
        { this._renderPicker({label: 'ភេទ', stateName: 'sex', options: [{label: 'ស្រី', value: 'ស្រី'}, {label: 'ប្រុស', value: 'ប្រុស'}, {label: 'ផ្សេងៗ', value: 'ផ្សេងៗ'}]}) }
        { this._renderDatePicker() }
        { this._renderInputTextContainer({stateName: 'nationality', label: 'សញ្ជាតិ', nextFocusInput: 'phoneNumberInput'}) }
        { this._renderInputTextContainer({stateName: 'phoneNumber', label: 'លេខទូរស័ព្ទ', nextFocusInput: 'gradeInput', keyboardType: 'phone-pad'}) }
        { this._renderInputTextContainer({stateName: 'grade', label: 'រៀនថ្នាក់ទី', nextFocusInput: 'highSchoolIdInput'}) }
        { this._renderInputTextContainer({stateName: 'highSchoolId', label: 'រៀននៅសាលា', nextFocusInput: 'addressInput'}) }
        { this._renderInputTextContainer({stateName: 'address', label: 'អាស័យដ្ឋានបច្ចុប្បន្ន'}) }
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
        { this._renderRadioGroup({stateName: 'isDivorce', label: FamilySituation.isDivorce, options: [{ label: 'គ្មានទេ', value: false }, { label: 'លែងលះ', value: true }]}) }
        { this._renderRadioGroup({stateName: 'isDisable', label: FamilySituation.isDisable }) }
        { this._renderRadioGroup({stateName: 'isDomesticViolence', label: FamilySituation.isDomesticViolence }) }
        { this._renderRadioGroup({stateName: 'isSmoking', label: FamilySituation.isSmoking }) }
        { this._renderRadioGroup({stateName: 'isAlcoholic', label: FamilySituation.isAlcoholic }) }
        { this._renderRadioGroup({stateName: 'isDrug', label: FamilySituation.isDrug }) }
        { this._renderPicker({label: FamilySituation.houseType , stateName: 'houseType', options: houseTypes}) }
        { this._renderPicker({label: FamilySituation.collectiveIncome , stateName: 'collectiveIncome', options: collectiveIncomes}) }
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
