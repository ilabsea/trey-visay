import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';

import Button from '../../components/shared/button';
import StatusBar from '../../components/shared/status_bar';
import headerStyles from '../../assets/style_sheets/header';
import { FontSetting } from '../../assets/style_sheets/font_setting';

export default class IntroScreen extends Component {
  constructor(props){
    super(props);
  }

  _handleOnPress = (route) => {
    this.props.navigation.navigate(route)
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <View style={styles.box}>
          <Text style={styles.text}>
            ដេីម្បីអាចធ្វើតេស្តវាយតម្លៃមុខរបរ និងអាជីព ប្អូនត្រូវមានគណនី និង បញ្ចូលគណនី៖
          </Text>

          <Button
            style={styles.button}
            onPress={() => this._handleOnPress('Login')}>
            <Text style={styles.btnText}>
              ចូលគណនី
            </Text>
          </Button>

          <TouchableOpacity style={styles.linkBtn}
            onPress={() => this._handleOnPress('Register')}>
            <Text style={[styles.btnText, {color: 'green'}]}>បង្កើតគណនី</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  box: {
    padding: 24,
    ...Platform.select({
      android: {
        margin: 16
      }
    })
  },
  text: {
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 24
  },
  button: {
    borderRadius: 3,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: FontSetting.button_text,
  },
  linkBtn: {
    margin: 100,
    marginTop: 16,
    alignItems: 'center'
  }
});
