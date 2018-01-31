import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
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

import DatePicker from 'react-native-datepicker';
import InputTextContainer from '../../components/input_text_container';

const SCHOOL_NAMES = [
  "សាលាជំនាន់ថ្មីវិទ្យាល័យព្រះស៊ីសុវត្ថិ", "វិទ្យាល័យជាស៊ីមព្រែកអញ្ចាញ", "វិទ្យាល័យព្រែកលៀប",
  "វិទ្យាល័យហ៊ុនសែនកំពង់ចាម", "អនុវិទ្យាល័យគោកព្រីង", "វិទ្យាល័យសម្តេចតេជោហ៊ុនសែនសណ្តែក",
  "វិទ្យាល័យហោណាំហុងព្រៃញា", "វិទ្យាល័យល្វា", "វិទ្យាល័យហ.សពាមជីកង",
  "អនុវិទ្យាល័យហ.សទួលសុភី", "វិទ្យាល័យហ.សក្រូចឆ្មារ", "វិទ្យាល័យសម្តេចហ៊ុនសែនប៉ើសពីរ",
  "វិទ្យាល័យប៊ុនរ៉ានីហ៊ុនសែនអម្ពវ័នជំនីក", "វិទ្យាល័យជីហែ", "វិទ្យាល័យក្រុមព្រះមហាលាភ", "ផ្សេងៗ"];

let formError = {};

export default class EditPersonalInfo extends Component {
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
        {this._renderPersonalInfo()}
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
    fields = [ 'fullName', 'dateOfBirth', 'nationality', 'address' ];
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

  _renderPersonalInfo() {
    let schoolNames = SCHOOL_NAMES.map((name) => { return {label: name, value: name}});
    let grades = [
      { label: 'ថ្នាក់ទី9', value: '9' }, { label: 'ថ្នាក់ទី10', value: '10' },
      { label: 'ថ្នាក់ទី11', value: '11' }, { label: 'ថ្នាក់ទី12', value: '12' },
      { label: 'ផ្សេងៗ', value: 'ផ្សេងៗ' }];

    return (
      <View style={[styles.container, {margin: 16, backgroundColor: '#fff'}]}>
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
            onDateChange={(date) => {this._setUserState('dateOfBirth', date)}} />
          <Text style={styles.errorText}>{this.state.errors.dateOfBirth}</Text>
        </View>

        { this._renderInputTextContainer({stateName: 'nationality', label: 'សញ្ជាតិ', nextFocusInput: 'phoneNumberInput'}) }
        { this._renderInputTextContainer({stateName: 'phoneNumber', label: 'លេខទូរស័ព្ទ', nextFocusInput: 'addressInput', keyboardType: 'phone-pad'}) }
        { this._renderPicker({label: 'រៀនថ្នាក់ទី', stateName: 'grade', options: grades}) }
        { this._renderPicker({label: 'រៀននៅសាលា', stateName: 'schoolName', options: schoolNames})}
        { this._renderInputTextContainer({stateName: 'address', label: 'អាស័យដ្ឋានបច្ចុប្បន្ន'}) }
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
