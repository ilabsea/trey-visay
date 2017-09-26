import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Button
} from 'react-native';

import gStyles from '../config/styles'
import realm from '../schema';

class Login extends Component {
  componentWillMount() {
    // alert(realm.objects('User').length);
  }
  submit() {
    alert('click submit');
  }

  render() {
    return (
      <View style={gStyles.container}>
        <Text style={gStyles.titleText}>Trey Visay</Text>

        <View style={{marginTop: 16, marginBottom: 16}}>
          <Text style={gStyles.subTitle}>Sign In</Text>
          <Text>to continue to Trey Visay</Text>
        </View>

        <Text style={gStyles.inputLabel}>Name</Text>
        <TextInput style={gStyles.inputText}/>

        <Text style={gStyles.inputLabel}>Password</Text>
        <TextInput style={gStyles.inputText} secureTextEntry={true}/>

        <Button
          style={styles.signIn}
          onPress={this.submit}
          title="Next"
          accessibilityLabel="Next to continue login"
        />

        <Button
          style={styles.createAccount}
          onPress={this.submit}
          title="Create New Trey Visay Account"
          accessibilityLabel="Next to continue login"
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  signIn: {
    marginTop: 40
  },
  createAccount: {
    alignSelf: 'flex-end',
    backgroundColor: 'transparent'
  }
})

export default Login;
