import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Picker,
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

import DatePicker from 'react-native-datepicker';
import InputTextContainer from '../components/input_text_container';

const SCHOOL_NAMES = [
  "សាលាជំនាន់ថ្មីវិទ្យាល័យព្រះស៊ីសុវត្ថិ", "វិទ្យាល័យជាស៊ីមព្រែកអញ្ចាញ", "វិទ្យាល័យព្រែកលៀប",
  "វិទ្យាល័យហ៊ុនសែនកំពង់ចាម", "អនុវិទ្យាល័យគោកព្រីង", "វិទ្យាល័យសម្តេចតេជោហ៊ុនសែនសណ្តែក",
  "វិទ្យាល័យហោណាំហុងព្រៃញា", "វិទ្យាល័យល្វា", "វិទ្យាល័យហ.សពាមជីកង",
  "អនុវិទ្យាល័យហ.សទួលសុភី", "វិទ្យាល័យហ.សក្រូចឆ្មារ", "វិទ្យាល័យសម្តេចហ៊ុនសែនប៉ើសពីរ",
  "វិទ្យាល័យប៊ុនរ៉ានីហ៊ុនសែនអម្ពវ័នជំនីក", "វិទ្យាល័យជីហែ", "វិទ្យាល័យក្រុមព្រះមហាលាភ"];

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
      formError[field] = ["can't be blank"];
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

  _renderPersonalInfo() {
    return (
      <View style={[styles.container, {margin: 16, backgroundColor: '#fff'}]}>
        <InputTextContainer
          onChangeText={((text) => this._setUserState('fullName', text)).bind(this)}
          label='ឈ្មោះពេញ'
          value={this.state.user.fullName}
          errors={this.state.errors.fullName} />

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>ឈ្មោះគណនី</Text>
          <TextInput
            style={styles.inputText}
            value={this.state.user.username}
            editable={false} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>ភេទ</Text>
          <Picker
            selectedValue={this.state.user.sex}
            onValueChange={(itemValue, itemIndex) => this._setUserState('sex', itemValue)}>
            <Picker.Item label="ស្រី" value="ស្រី" />
            <Picker.Item label="ប្រុស" value="ប្រុស" />
            <Picker.Item label="ផ្សេងៗ" value="ផ្សេងៗ" />
          </Picker>
        </View>

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

        <InputTextContainer
          onChangeText={((text) => this._setUserState('nationality', text)).bind(this)}
          label='សញ្ជាតិ'
          value={this.state.user.nationality}
          errors={this.state.errors.nationality} />

        <InputTextContainer
          onChangeText={((text) => this._setUserState('phoneNumber', text)).bind(this)}
          label='លេខទូរស័ព្ទ'
          value={this.state.user.phoneNumber}
          keyboardType='phone-pad' />

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>រៀនថ្នាក់ទី</Text>
          <Picker
            selectedValue={this.state.user.grade}
            onValueChange={(itemValue, itemIndex) => this._setUserState('grade', itemValue)}>
            <Picker.Item label="ថ្នាក់ទី9" value="9" />
            <Picker.Item label="ថ្នាក់ទី10" value="10" />
            <Picker.Item label="ថ្នាក់ទី11" value="11" />
            <Picker.Item label="ថ្នាក់ទី12" value="12" />
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>រៀននៅសាលា</Text>
          <Picker
            selectedValue={this.state.user.schoolName}
            onValueChange={(itemValue, itemIndex) => this._setUserState('schoolName', itemValue)}>
            { SCHOOL_NAMES.map((name, i) => (
              <Picker.Item key={i} label={name} value={name} />
            ))}
          </Picker>

          <InputTextContainer
            onChangeText={((text) => this._setUserState('address', text)).bind(this)}
            label='អាស័យដ្ឋានបច្ចុប្បន្ន'
            value={this.state.user.address}
            errors={this.state.errors.address} />
        </View>
      </View>
    )
  }
}
