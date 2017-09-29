import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Button,
  Picker,
  Switch
} from 'react-native';

import realm from '../schema';
import RadioGroupContainer from '../components/radio_group_container';
import InputTextContainer from '../components/input_text_container';

class ProfileForm extends React.Component {
  static navigationOptions = {
    title: 'ប្រវត្តិរូបសង្ខេប',
  };

  constructor(props) {
    super(props)
    this.state = {
      fullName: 'Sokly Heng',
      userName: 'sokly_heng',
      sex: '',
      dateOfBirth: '',
      phoneNumber: '',
      nationality: '',
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
      isDivorce: 0,
      isDisable: 0,
      isDomesticViolence: 0,
      isSmoking: 0,
      isAlcoholic: 0,
      isDrug: 0,
      houseType: '',
      collectiveIncome: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildData = this.buildData.bind(this);
  }

  handleSubmit() {
  }

  buildData() {
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          {/*personal_information----------------------------*/}
          <Text style={styles.subTitle}>Personal information</Text>

          <View style={styles.row}>
            <View style={styles.leftColumn}>

              <InputTextContainer
                onChangeText={((text) => this.setState({fullName: text, userName: text.split(' ').join('_')})).bind(this)}
                label='fullName'
                value={this.state.fullName}
              ></InputTextContainer>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Gender</Text>
                <Picker
                  selectedValue={this.state.sex}
                  onValueChange={(itemValue, itemIndex) => this.setState({sex: itemValue})}>
                  <Picker.Item label="Female" value="female" />
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Other" value="other" />
                  <Picker.Item label="Rather not say" value="rather_not_say" />
                </Picker>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Date of birth</Text>
              </View>

              <InputTextContainer
                onChangeText={((text) => this.setState({phoneNumber: text})).bind(this)}
                label='phoneNumber'
                value={this.state.phoneNumber}
              ></InputTextContainer>

              <InputTextContainer
                onChangeText={((text) => this.setState({Nationality: text})).bind(this)}
                label='Nationality'
                value={this.state.Nationality}
              ></InputTextContainer>

              <InputTextContainer
                onChangeText={((text) => this.setState({schoolName: text})).bind(this)}
                label='schoolName'
                value={this.state.schoolName}
              ></InputTextContainer>

              <InputTextContainer
                onChangeText={((text) => this.setState({grade: text})).bind(this)}
                label='grade'
                value={this.state.grade}
              ></InputTextContainer>

              <InputTextContainer
                onChangeText={((text) => this.setState({address: text})).bind(this)}
                label='address'
                value={this.state.address}
              ></InputTextContainer>

            </View>

            <View style={styles.rightColumn}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>User name</Text>
                <TextInput
                  style={styles.inputText}
                  value={this.state.userName}
                  editable={false}
                />
              </View>
            </View>
          </View>

          {/*family_information----------------------------*/}

          <Text style={styles.subTitle}>Family information</Text>

          <View style={styles.row}>
            <View style={styles.leftColumn}>
              <InputTextContainer
                onChangeText={((text) => this.setState({fatherName: text})).bind(this)}
                label='fatherName'
                value={this.state.fatherName}
              ></InputTextContainer>

              <InputTextContainer
                onChangeText={((text) => this.setState({fatherOccupation: text})).bind(this)}
                label='fatherOccupation'
                value={this.state.fatherOccupation}
              ></InputTextContainer>

              <InputTextContainer
                onChangeText={((text) => this.setState({motherName: text})).bind(this)}
                label='motherName'
                value={this.state.motherName}
              ></InputTextContainer>

              <InputTextContainer
                onChangeText={((text) => this.setState({motherOccupation: text})).bind(this)}
                label='motherOccupation'
                value={this.state.motherOccupation}
              ></InputTextContainer>

              <InputTextContainer
                onChangeText={((text) => this.setState({guidance: text})).bind(this)}
                label='guidance'
                value={this.state.guidance}
              ></InputTextContainer>

              <InputTextContainer
                onChangeText={((text) => this.setState({parentContactNumber: text})).bind(this)}
                label='parentContactNumber'
                value={this.state.parentContactNumber}
                keyboardType='numeric'
              ></InputTextContainer>

              <InputTextContainer
                onChangeText={((text) => this.setState({numberOfFamilyMember: text})).bind(this)}
                label='numberOfFamilyMember'
                value={this.state.numberOfFamilyMember}
                keyboardType='numeric'
              ></InputTextContainer>

              <InputTextContainer
                onChangeText={((text) => this.setState({numberOfSisters: text})).bind(this)}
                label='numberOfSisters'
                value={this.state.numberOfSisters}
                keyboardType='numeric'
              ></InputTextContainer>

              <InputTextContainer
                onChangeText={((text) => this.setState({numberOfBrothers: text})).bind(this)}
                label='numberOfBrothers'
                value={this.state.numberOfBrothers}
                keyboardType='numeric'
              ></InputTextContainer>
            </View>
            <View style={styles.rightColumn}>
            </View>
          </View>

          {/*family_situaion----------------------------*/}

          <Text style={styles.subTitle}>Family Situation</Text>

          <View style={styles.row}>
            <View style={styles.leftColumn}>

              <RadioGroupContainer
                options={[{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }]}
                onPress={((text) => this.setState({isDivorce: text})).bind(this)}
                value={this.state.isDivorce}
              ></RadioGroupContainer>

              <RadioGroupContainer
                options={[{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }]}
                onPress={((text) => this.setState({isDisable: text})).bind(this)}
                value={this.state.isDisable}
              ></RadioGroupContainer>

              <RadioGroupContainer
                options={[{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }]}
                onPress={((text) => this.setState({isDomesticViolence: text})).bind(this)}
                value={this.state.isDomesticViolence}
              ></RadioGroupContainer>

              <RadioGroupContainer
                options={[{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }]}
                onPress={((text) => this.setState({isSmoking: text})).bind(this)}
                value={this.state.isSmoking}
              ></RadioGroupContainer>

              <RadioGroupContainer
                options={[{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }]}
                onPress={((text) => this.setState({isAlcoholic: text})).bind(this)}
                value={this.state.isAlcoholic}
              ></RadioGroupContainer>

              <RadioGroupContainer
                options={[{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }]}
                onPress={((text) => this.setState({isDrug: text})).bind(this)}
                value={this.state.isDrug}
              ></RadioGroupContainer>

              <InputTextContainer
                onChangeText={((text) => this.setState({houseType: text})).bind(this)}
                label='houseType'
                value={this.state.houseType}
              ></InputTextContainer>

              <InputTextContainer
                onChangeText={((text) => this.setState({collectiveIncome: text})).bind(this)}
                label='collectiveIncome'
                value={this.state.collectiveIncome}
              ></InputTextContainer>

            </View>
            <View style={styles.rightColumn}>
            </View>
          </View>
        </ScrollView>

        <View style={styles.submitWrapper}>
          <Button
            style={styles.submit}
            onPress={this.handleSubmit}
            title="Submit"
            accessibilityLabel="Create Account"
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 24,
    marginBottom: 24,
    marginTop: 24,
    paddingRight: 24,
  },
  row: {
    flexDirection: 'row'
  },
  leftColumn: {
    flex: 2
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 20
  },
  submitWrapper: {
    marginTop: 30,
    padding: 24,
    paddingTop: 0
  },
  inputText: {
    height: 40,
    paddingLeft: 5,
    paddingRight: 5
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 'bold'
  },
  inputContainer: {
    padding: 2,
    marginTop: 18,
    marginBottom: 18
  },
})

export default ProfileForm;
