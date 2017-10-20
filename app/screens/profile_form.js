import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Button,
  Picker,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
  Icon
} from 'react-native-material-ui';

import DatePicker from 'react-native-datepicker';
import Collapsible from 'react-native-collapsible';

// Utils
import realm from '../schema';
import User from '../utils/user';

// Components
import RadioGroupContainer from '../components/radio_group_container';
import InputTextContainer from '../components/input_text_container';

let formError = {};

const CONTENTS = [
  {header: 'ព័ត៌មានផ្ទាល់ខ្លួន', body: '_renderPersonalInfo'},
  {header: 'ព័ត៌មានគ្រួសារ', body: '_renderFamilyInfo'},
  {header: 'ស្ថានភាពគ្រួសារ', body: '_renderFamilySituation'}];

const SCHOOL_NAMES = [
  "សាលាជំនាន់ថ្មីវិទ្យាល័យព្រះស៊ីសុវត្ថិ", "វិទ្យាល័យជាស៊ីមព្រែកអញ្ចាញ", "វិទ្យាល័យព្រែកលៀប",
  "វិទ្យាល័យហ៊ុនសែនកំពង់ចាម", "អនុវិទ្យាល័យគោកព្រីង", "វិទ្យាល័យសម្តេចតេជោហ៊ុនសែនសណ្តែក",
  "វិទ្យាល័យហោណាំហុងព្រៃញា", "វិទ្យាល័យល្វា", "វិទ្យាល័យហ.សពាមជីកង",
  "អនុវិទ្យាល័យហ.សទួលសុភី", "វិទ្យាល័យហ.សក្រូចឆ្មារ", "វិទ្យាល័យសម្តេចហ៊ុនសែនប៉ើសពីរ",
  "វិទ្យាល័យប៊ុនរ៉ានីហ៊ុនសែនអម្ពវ័នជំនីក", "វិទ្យាល័យជីហែ", "វិទ្យាល័យក្រុមព្រះមហាលាភ"];

export default class ProfileForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      errors: {},
      collapsed0: false,
      collapsed1: true,
      collapsed2: true,
    }
  }

  componentDidMount() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    user = Object.assign({}, user, {sex: 'ស្រី', nationality: 'ខ្មែរ', grad: '9',
                                    schoolName: 'សាលាជំនាន់ថ្មីវិទ្យាល័យព្រះស៊ីសុវត្ថិ',
                                    houseType: 'ផ្ទះឈើ', collectiveIncome: '0-25ម៉ឺន'})
    this.setState({user: user});
  }

  render() {
    return (
      <ThemeProvider uiTheme={{}}>
        <ScrollView>
          {!!this.state.user &&
            <View>
              {this._renderHeader()}

              <View style={styles.container}>
                { CONTENTS.map((obj, i) => {
                  return( <View key={i}>{this._renderSection(obj, i)}</View>)
                })}

                <Button
                  title="ចាកចេញ"
                  color='red'
                  onPress={this.logout.bind(this)}
                />
              </View>
            </View>
          }
        </ScrollView>
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

  logout() {
    User.logout();
    this.props.navigation.navigate('Login');
  }

  _toggleExpanded(collapsedIndex) {
    let obj = {};
    obj[collapsedIndex] = !this.state[collapsedIndex];
    this.setState(obj);
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
  }

  handleSubmit() {
    if (!this.isValidForm()) {
      this._openErrorCollapsed();
      return;
    }

    try {
      realm.write(() => {
        realm.create('User', this.buildData(), true);
        this.props.navigation.navigate('Home');
        alert(JSON.stringify(realm.objects('User')[realm.objects('User').length - 1]));
      });
    } catch (e) {
      alert(e);
    }
  }

  buildData() {
    let user = Object.assign({}, this.state.user);
    user.numberOfFamilyMember = parseInt(user.numberOfFamilyMember);
    user.numberOfBrothers     = parseInt(user.numberOfBrothers);
    user.numberOfSisters      = parseInt(user.numberOfSisters);
    return user;
  }

  _renderHeader() {
    return(
      <Toolbar
        centerElement="បំពេញប្រវត្តិរូបសង្ខេប"
        rightElement={
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={this.handleSubmit.bind(this)}>
            <Icon name="done" color='#fff' size={24} />
            <Text style={styles.saveText}>រក្សាទុក</Text>
          </TouchableOpacity>
        }
      />
    )
  }

  _renderPersonalInfo() {
    return (
      <View>
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

  _renderFamilyInfo() {
    return (
      <View>
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
            value={this.state.user.numberOfFamilyMember || ''}
            errors={this.state.errors.numberOfFamilyMember}
            keyboardType='numeric'
            style={{flex: 1}}/>

          <InputTextContainer
            onChangeText={((text) => this._setUserState('numberOfSisters', text)).bind(this)}
            label='ចំនួនបងប្អូនស្រី'
            value={this.state.user.numberOfSisters || ''}
            errors={this.state.errors.numberOfSisters}
            keyboardType='numeric'
            style={{flex: 1}}/>

          <InputTextContainer
            onChangeText={((text) => this._setUserState('numberOfBrothers', text)).bind(this)}
            label='ចំនួនបងប្អូនប្រុស'
            value={this.state.user.numberOfBrothers || ''}
            errors={this.state.errors.numberOfBrothers}
            keyboardType='numeric'
            style={{flex: 1}}/>
        </View>
      </View>
    )
  }

  _renderFamilySituation() {
    return (
      <View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputText: {
    height: 40,
    paddingLeft: 5,
    paddingRight: 5,
    maxWidth: 500
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  inputContainer: {
    padding: 2,
    marginTop: 18,
    marginBottom: 18,
    maxWidth: 500
  },
  errorText: {
    color: 'rgb(221,44,0)',
    fontSize: 12,
    lineHeight: 14
  },
  saveText: {
    color: '#fff',
    marginLeft: 10,
    marginRight: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
  box: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
    backgroundColor: '#fff'
  },
})
