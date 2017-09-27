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
        <Text>**Personal information</Text>

        <View style={styles.row}>
          <View style={styles.leftColumn}>
            <Text style={styles.inputLabel}>Full name</Text>
            <TextInput
              style={styles.inputText}
              onChangeText={(text) => this.setState({fullName: text, userName: text.split(' ').join('_')})}
              value={this.state.fullName}
            />

            <Text style={styles.inputLabel}>Sex</Text>
            <Picker
              selectedValue={this.state.sex}
              onValueChange={(itemValue, itemIndex) => this.setState({sez: itemValue})}>
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Other" value="other" />
              <Picker.Item label="Rather not" value="rather_not" />
            </Picker>

            <Text style={styles.inputLabel}>Date Of Birth</Text>

            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.inputText}
              onChangeText={(text) => this.setState({phoneNumber: text})}
              value={this.state.phoneNumber}
            />

            <Text style={styles.inputLabel}>Nationality</Text>
            <TextInput
              style={styles.inputText}
              onChangeText={(text) => this.setState({nationality: text})}
              value={this.state.nationality}
            />

            <Text style={styles.inputLabel}>School Name</Text>
            <TextInput
              style={styles.inputText}
              onChangeText={(text) => this.setState({schoolName: text})}
              value={this.state.schoolName}
            />

            <Text style={styles.inputLabel}>Grade</Text>
            <TextInput
              style={styles.inputText}
              onChangeText={(text) => this.setState({grade: text})}
              value={this.state.grade}
            />

            <Text style={styles.inputLabel}>Address</Text>
            <TextInput
              style={styles.inputText}
              onChangeText={(text) => this.setState({address: text})}
              value={this.state.address}
            />

            <Text style={styles.inputLabel}>Address</Text>
            <TextInput
              style={styles.inputText}
              onChangeText={(text) => this.setState({address: text})}
              value={this.state.address}
            />
          </View>

          <View style={styles.rightColumn}>
            <Text style={styles.inputLabel}>User name</Text>
            <TextInput
              style={styles.inputText}
              value={this.state.userName}
              editable={false}
            />
          </View>
        </View>

        <Text>**Family information</Text>

        <View style={styles.row}>
          <View style={styles.leftColumn}>
            <Text style={styles.inputLabel}>Father Name</Text>
            <TextInput
              style={styles.inputText}
              onChangeText={(text) => this.setState({fatherName: text})}
              value={this.state.fatherName}
            />

            <Text style={styles.inputLabel}>Father Occupation</Text>
            <TextInput
              style={styles.inputText}
              onChangeText={(text) => this.setState({fatherOccupation: text})}
              value={this.state.fatherOccupation}
            />

            <Text style={styles.inputLabel}>Mother Name</Text>
            <TextInput
              style={styles.inputText}
              onChangeText={(text) => this.setState({motherName: text})}
              value={this.state.motherName}
            />

            <Text style={styles.inputLabel}>Mother Occupation</Text>
            <TextInput
              style={styles.inputText}
              onChangeText={(text) => this.setState({motherOccupation: text})}
              value={this.state.motherOccupation}
            />

            <Text style={styles.inputLabel}>Guidance</Text>
            <TextInput
              style={styles.inputText}
              onChangeText={(text) => this.setState({guidance: text})}
              value={this.state.guidance}
            />

            <Text style={styles.inputLabel}>Guidance</Text>
            <TextInput
              style={styles.inputText}
              onChangeText={(text) => this.setState({guidance: text})}
              value={this.state.guidance}
            />
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
    paddingTop: 24,
    paddingLeft: 24,
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
    marginTop: 40,
    padding: 24,
    paddingTop: 0
  },
  inputText: {
    height: 40,
    paddingLeft: 5,
    paddingRight: 5
  },
})


export default ProfileForm;
