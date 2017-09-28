import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Button,
  Picker
} from 'react-native';

import realm from '../schema';
import NumberInput from '../components/number_input';

class ProfileForm extends React.Component {
  static navigationOptions = {
    title: 'ប្រវត្តិរូបសង្ខេប',
  };

  constructor(props) {
    super(props)
    this.state = {
      fullName: '',
      userName: '',
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
      isDivorce: '',
      isDisable: '',
      isDomesticViolence: '',
      isSmoking: '',
      isAlcoholic: '',
      isDrug: '',
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
          <Text style={styles.subTitle}>Personal information</Text>

          <View style={styles.row}>
            <View style={styles.leftColumn}>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Full name</Text>
                <TextInput
                  style={styles.inputText}
                  onChangeText={(text) => this.setState({fullName: text, userName: text.split(' ').join('_')})}
                  value={this.state.fullName}
                />
              </View>

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

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Phone number</Text>
                <TextInput
                  style={styles.inputText}
                  keyboardType='numeric'
                  onChangeText={(text) => this.setState({phoneNumber: text})}
                  value={this.state.phoneNumber}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Nationality</Text>
                <TextInput
                  style={styles.inputText}
                  onChangeText={(text) => this.setState({nationality: text})}
                  value={this.state.nationality}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>School name</Text>
                <TextInput
                  style={styles.inputText}
                  onChangeText={(text) => this.setState({schoolName: text})}
                  value={this.state.schoolName}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Grade</Text>
                <TextInput
                  style={styles.inputText}
                  onChangeText={(text) => this.setState({grade: text})}
                  value={this.state.grade}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Address</Text>
                <TextInput
                  style={styles.inputText}
                  onChangeText={(text) => this.setState({address: text})}
                  value={this.state.address}
                />
              </View>
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

          <Text style={styles.subTitle}>Family information</Text>

          <View style={styles.row}>
            <View style={styles.leftColumn}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Father name</Text>
                <TextInput
                  style={styles.inputText}
                  onChangeText={(text) => this.setState({fatherName: text})}
                  value={this.state.fatherName}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Father occupation</Text>
                <TextInput
                  style={styles.inputText}
                  onChangeText={(text) => this.setState({fatherOccupation: text})}
                  value={this.state.fatherOccupation}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Mother name</Text>
                <TextInput
                  style={styles.inputText}
                  onChangeText={(text) => this.setState({motherName: text})}
                  value={this.state.motherName}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Mother occupation</Text>
                <TextInput
                  style={styles.inputText}
                  onChangeText={(text) => this.setState({motherOccupation: text})}
                  value={this.state.motherOccupation}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Guidance</Text>
                <TextInput
                  style={styles.inputText}
                  onChangeText={(text) => this.setState({guidance: text})}
                  value={this.state.guidance}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Parent Contact Number</Text>
                <TextInput
                  style={styles.inputText}
                  keyboardType='numeric'
                  onChangeText={(text) => this.setState({parentContactNumber: text})}
                  value={this.state.parentContactNumber}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Number of family member</Text>
                <TextInput
                  style={styles.inputText}
                  keyboardType='numeric'
                  onChangeText={(text) => this.setState({numberOfFamilyMember: text})}
                  value={this.state.numberOfFamilyMember}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Number of sisters</Text>
                <TextInput
                  style={styles.inputText}
                  keyboardType='numeric'
                  onChangeText={(text) => this.setState({numberOfSisters: text})}
                  value={this.state.numberOfSisters}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Number of brothers</Text>
                <TextInput
                  style={styles.inputText}
                  keyboardType='numeric'
                  onChangeText={(text) => this.setState({numberOfBrothers: text})}
                  value={this.state.numberOfBrothers}
                />
              </View>
            </View>
            <View style={styles.rightColumn}>
            </View>
          </View>

          <Text style={styles.subTitle}>Family Situation</Text>
          <View style={styles.row}>
            <View style={styles.leftColumn}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>isDivorce</Text>
                <TextInput
                  style={styles.inputText}
                  onChangeText={(text) => this.setState({isDivorce: text})}
                  value={this.state.isDivorce}
                />
              </View>
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
  }
})


export default ProfileForm;
