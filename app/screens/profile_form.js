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
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
  Icon
} from 'react-native-material-ui';

import DatePicker from 'react-native-datepicker';

import realm from '../schema';
import RadioGroupContainer from '../components/radio_group_container';
import InputTextContainer from '../components/input_text_container';

let formError = {};

class ProfileForm extends React.Component {
  // https://github.com/react-community/react-navigation/issues/145
  // static navigationOptions = ({ navigation }) => {
  //   const { state } = navigation;

  //   return {
  //     title: 'បំពេញប្រវត្តិរូបសង្ខេប',
  //     headerRight: <Button title="Save" onPress={() => state.params.handleSubmit()} />,
  //   };
  // };

  constructor(props) {
    super(props)
    this.state = {
      uuid: '123',
      fullName: '',
      password: '1234',
      username: 'sokly_heng',
      sex: 'female',
      dateOfBirth: '',
      phoneNumber: '',
      nationality: 'ខ្មែរ',
      schoolName: '',
      grade: '',
      address: '',
      // *family information
      fatherName: '',
      fatherOccupation: '',
      motherName: '',
      motherOccupation: '',
      guidance: '',
      parentContactNumber: '',
      numberOfFamilyMember: '',
      numberOfSisters: '',
      numberOfBrothers: '',
      // * family Situation
      isDivorce: false,
      isDisable: false,
      isDomesticViolence: false,
      isSmoking: false,
      isAlcoholic: false,
      isDrug: false,
      houseType: 'wooden_house',
      collectiveIncome: '0-250_000',
      errors: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildData = this.buildData.bind(this);
    this.isValidForm = this.isValidForm.bind(this);
    this.checkRequire = this.checkRequire.bind(this);
  }

  componentDidMount() {
    // this.props.navigation.setParams({ handleSubmit: this.handleSubmit });
  }

  render() {
    return (
      <ThemeProvider uiTheme={{}}>
        <ScrollView style={styles.scrollContainer}>
          {this._renderHeader()}
          <View style={styles.container}>
            {this._renderPersonalInfo()}
            {this._renderFamilyInfo()}
            {this._renderFamilySituation()}
          </View>
        </ScrollView>
      </ThemeProvider>
    )
  }

  checkRequire(field) {
    if (!this.state[field].length) {
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

  handleSubmit() {
    if (!this.isValidForm()) { return; }

    try {
      realm.write(() => {
        realm.create('User', this.buildData(), true);
        alert(JSON.stringify(realm.objects('User')[realm.objects('User').length - 1]));
      });
    } catch (e) {
      alert(e);
    }
  }

  buildData() {
    let data = Object.assign({}, this.state);
    delete data.errors;
    data.numberOfFamilyMember = parseInt(this.state.numberOfFamilyMember);
    data.numberOfBrothers     = parseInt(this.state.numberOfBrothers);
    data.numberOfSisters      = parseInt(this.state.numberOfSisters);
    return data;
  }

  _renderHeader() {
    return(
      <Toolbar
        centerElement="បំពេញប្រវត្តិរូបសង្ខេប"
        rightElement={
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={this.handleSubmit}>
            <Icon name="done" color='#fff' size={24} />
            <Text style={styles.saveText}>រក្សាទុក</Text>
          </TouchableOpacity>
        }
      />
    )
  }

  _renderPersonalInfo() {
    return (
      <View style={styles.box}>
        <Text style={styles.subTitle}>ព័ត៌មានផ្ទាល់ខ្លួន</Text>

        <InputTextContainer
          onChangeText={((text) => this.setState({fullName: text})).bind(this)}
          label='fullName'
          value={this.state.fullName}
          errors={this.state.errors.fullName}
        ></InputTextContainer>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>User name</Text>
          <TextInput
            style={styles.inputText}
            value={this.state.username}
            editable={false}
          />
        </View>

        <RadioGroupContainer
          options={[{ label: 'Female', value: 'female' }, { label: 'Male', value: 'male' }, { label: 'Other', value: 'other' }]}
          onPress={((text) => this.setState({sex: text})).bind(this)}
          value={this.state.sex}
          label='Gender'
        ></RadioGroupContainer>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Date of birth</Text>
          <DatePicker
            style={{width: 200}}
            date={this.state.dateOfBirth}
            mode="date"
            androidMode='spinner'
            placeholder="select date"
            format="DD-MMM-YYYY"
            onDateChange={(date) => {this.setState({dateOfBirth: date})}}
          />
          <Text style={styles.errorText}>{this.state.errors.dateOfBirth}</Text>
        </View>

        <InputTextContainer
          onChangeText={((text) => this.setState({phoneNumber: text})).bind(this)}
          label='phoneNumber'
          value={this.state.phoneNumber}
          keyboardType='phone-pad'
        ></InputTextContainer>

        <InputTextContainer
          onChangeText={((text) => this.setState({nationality: text})).bind(this)}
          label='nationality'
          value={this.state.nationality}
          errors={this.state.errors.nationality}
        ></InputTextContainer>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>schoolName</Text>
          <Picker
            selectedValue={this.state.schoolName}
            onValueChange={(itemValue, itemIndex) => this.setState({schoolName: itemValue})}>
            <Picker.Item label="សាលាជំនាន់ថ្មីវិទ្យាល័យព្រះស៊ីសុវត្ថិ" value="សាលាជំនាន់ថ្មីវិទ្យាល័យព្រះស៊ីសុវត្ថិ" />
            <Picker.Item label="វិទ្យាល័យជាស៊ីមព្រែកអញ្ចាញ" value="វិទ្យាល័យជាស៊ីមព្រែកអញ្ចាញ" />
            <Picker.Item label="វិទ្យាល័យព្រែកលៀប" value="វិទ្យាល័យព្រែកលៀប" />
            <Picker.Item label="វិទ្យាល័យហ៊ុនសែនកំពង់ចាម" value="វិទ្យាល័យហ៊ុនសែនកំពង់ចាម" />
            <Picker.Item label="អនុវិទ្យាល័យគោកព្រីង" value="អនុវិទ្យាល័យគោកព្រីង" />
            <Picker.Item label="វិទ្យាល័យសម្តេចតេជោហ៊ុនសែនសណ្តែក" value="វិទ្យាល័យសម្តេចតេជោហ៊ុនសែនសណ្តែក" />
            <Picker.Item label="វិទ្យាល័យហោណាំហុងព្រៃញា" value="វិទ្យាល័យហោណាំហុងព្រៃញា" />
            <Picker.Item label="វិទ្យាល័យល្វា" value="វិទ្យាល័យល្វា" />
            <Picker.Item label="វិទ្យាល័យហ.សពាមជីកង" value="វិទ្យាល័យហ.សពាមជីកង" />
            <Picker.Item label="អនុវិទ្យាល័យហ.សទួលសុភី" value="អនុវិទ្យាល័យហ.សទួលសុភី" />
            <Picker.Item label="វិទ្យាល័យហ.សក្រូចឆ្មារ" value="វិទ្យាល័យហ.សក្រូចឆ្មារ" />
            <Picker.Item label="វិទ្យាល័យសម្តេចហ៊ុនសែនប៉ើសពីរ" value="វិទ្យាល័យសម្តេចហ៊ុនសែនប៉ើសពីរ" />
            <Picker.Item label="វិទ្យាល័យប៊ុនរ៉ានីហ៊ុនសែនអម្ពវ័នជំនីក" value="វិទ្យាល័យប៊ុនរ៉ានីហ៊ុនសែនអម្ពវ័នជំនីក" />
            <Picker.Item label="វិទ្យាល័យជីហែ" value="វិទ្យាល័យជីហែ" />
            <Picker.Item label="វិទ្យាល័យក្រុមព្រះមហាលាភ" value="វិទ្យាល័យក្រុមព្រះមហាលាភ" />
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Grade</Text>
          <Picker
            selectedValue={this.state.grade}
            onValueChange={(itemValue, itemIndex) => this.setState({grade: itemValue})}>
            <Picker.Item label="ថ្នាក់ទី9" value="9" />
            <Picker.Item label="ថ្នាក់ទី10" value="10" />
            <Picker.Item label="ថ្នាក់ទី11" value="11" />
            <Picker.Item label="ថ្នាក់ទី12" value="12" />
          </Picker>
        </View>

        <InputTextContainer
          onChangeText={((text) => this.setState({address: text})).bind(this)}
          label='address'
          value={this.state.address}
          errors={this.state.errors.address}
        ></InputTextContainer>

      </View>
    )
  }

  _renderFamilyInfo() {
    return (
      <View style={styles.box}>
        <Text style={styles.subTitle}>ព័ត៌មានគ្រួសារ</Text>

        <InputTextContainer
          onChangeText={((text) => this.setState({fatherName: text})).bind(this)}
          label='fatherName'
          value={this.state.fatherName}
          errors={this.state.errors.fatherName}
        ></InputTextContainer>

        <InputTextContainer
          onChangeText={((text) => this.setState({fatherOccupation: text})).bind(this)}
          label='fatherOccupation'
          value={this.state.fatherOccupation}
          errors={this.state.errors.fatherOccupation}
        ></InputTextContainer>

        <InputTextContainer
          onChangeText={((text) => this.setState({motherName: text})).bind(this)}
          label='motherName'
          value={this.state.motherName}
          errors={this.state.errors.motherName}
        ></InputTextContainer>

        <InputTextContainer
          onChangeText={((text) => this.setState({motherOccupation: text})).bind(this)}
          label='motherOccupation'
          value={this.state.motherOccupation}
          errors={this.state.errors.motherOccupation}
        ></InputTextContainer>

        <InputTextContainer
          onChangeText={((text) => this.setState({guidance: text})).bind(this)}
          label='guidance'
          value={this.state.guidance}
          errors={this.state.errors.guidance}
        ></InputTextContainer>

        <InputTextContainer
          onChangeText={((text) => this.setState({parentContactNumber: text})).bind(this)}
          label='parentContactNumber'
          value={this.state.parentContactNumber}
          keyboardType='phone-pad'
        ></InputTextContainer>

        <InputTextContainer
          onChangeText={((text) => this.setState({numberOfFamilyMember: text})).bind(this)}
          label='numberOfFamilyMember'
          value={this.state.numberOfFamilyMember}
          errors={this.state.errors.numberOfFamilyMember}
          keyboardType='numeric'
        ></InputTextContainer>

        <InputTextContainer
          onChangeText={((text) => this.setState({numberOfSisters: text})).bind(this)}
          label='numberOfSisters'
          value={this.state.numberOfSisters}
          errors={this.state.errors.numberOfSisters}
          keyboardType='numeric'
        ></InputTextContainer>

        <InputTextContainer
          onChangeText={((text) => this.setState({numberOfBrothers: text})).bind(this)}
          label='numberOfBrothers'
          value={this.state.numberOfBrothers}
          errors={this.state.errors.numberOfBrothers}
          keyboardType='numeric'
        ></InputTextContainer>
      </View>
    )
  }

  _renderFamilySituation() {
    return (
      <View style={styles.box}>
        <Text style={styles.subTitle}>ស្ថានភាពគ្រួសារ</Text>

        <RadioGroupContainer
          options={[{ label: 'No', value: false }, { label: 'Yes', value: true }]}
          onPress={((text) => this.setState({isDivorce: text})).bind(this)}
          value={this.state.isDivorce}
          label='isDivorce'
        ></RadioGroupContainer>

        <RadioGroupContainer
          options={[{ label: 'No', value: false }, { label: 'Yes', value: true }]}
          onPress={((text) => this.setState({isDisable: text})).bind(this)}
          value={this.state.isDisable}
          label='isDisable'
        ></RadioGroupContainer>

        <RadioGroupContainer
          options={[{ label: 'No', value: false }, { label: 'Yes', value: true }]}
          onPress={((text) => this.setState({isDomesticViolence: text})).bind(this)}
          value={this.state.isDomesticViolence}
          label='isDomesticViolence'
        ></RadioGroupContainer>

        <RadioGroupContainer
          options={[{ label: 'No', value: false }, { label: 'Yes', value: true }]}
          onPress={((text) => this.setState({isSmoking: text})).bind(this)}
          value={this.state.isSmoking}
          label='isSmoking'
        ></RadioGroupContainer>

        <RadioGroupContainer
          options={[{ label: 'No', value: false }, { label: 'Yes', value: true }]}
          onPress={((text) => this.setState({isAlcoholic: text})).bind(this)}
          value={this.state.isAlcoholic}
          label='isAlcoholic'
        ></RadioGroupContainer>

        <RadioGroupContainer
          options={[{ label: 'No', value: false }, { label: 'Yes', value: true }]}
          onPress={((text) => this.setState({isDrug: text})).bind(this)}
          value={this.state.isDrug}
          label='isDrug'
        ></RadioGroupContainer>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>houseType</Text>
          <Picker
            selectedValue={this.state.houseType}
            onValueChange={(itemValue, itemIndex) => this.setState({houseType: itemValue})}>
            <Picker.Item label="ផ្ទះឈើ" value="wooden_house" />
            <Picker.Item label="ផ្ទះថ្ម" value="concrete_house" />
            <Picker.Item label="ផ្ទះស័ង្កសី" value="zinc_house" />
            <Picker.Item label="ផ្ទះស្លឹក" value="leaf_house" />
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>collectiveIncome per month (គិតជារៀល)</Text>
          <Picker
            selectedValue={this.state.collectiveIncome}
            onValueChange={(itemValue, itemIndex) => this.setState({collectiveIncome: itemValue})}>
            <Picker.Item label="ក្រោម 25ម៉ឺន" value="0-250_000" />
            <Picker.Item label="ចន្លោះ 25ម៉ឺន-50ម៉ឺន" value="250_000-50_0000" />
            <Picker.Item label="ចន្លោះ 50ម៉ឺន-75ម៉ឺន" value="500_000R-750_000" />
            <Picker.Item label="ចន្លោះ 75ម៉ឺន-1លាន" value="750_000-1000_000" />
            <Picker.Item label="លើសពី 1លាន" value="Above_1M" />
          </Picker>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
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
    marginBottom: 16,
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

export default ProfileForm;
