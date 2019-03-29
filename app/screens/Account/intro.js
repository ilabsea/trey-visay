import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';

import Button from '../../components/button';
import OpenDrawer from '../../components/open_drawer';
import StatusBar from '../../components/status_bar';
import headerStyles from '../../assets/style_sheets/header';
import { FontSetting } from '../../assets/style_sheets/font_setting';

export default class IntroScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'សេចក្តីណែនាំ',
    headerStyle: headerStyles.headerStyle,
    headerTitleStyle: headerStyles.headerTitleStyle,
    headerLeft: <OpenDrawer navigation={navigation}/>
  })

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

          <View style={styles.inlineBlock}>
            <Button
              style={styles.button}
              onPress={() => this._handleOnPress('Login')}>
              <Text style={styles.btnText}>
                ចូលគណនី
              </Text>
            </Button>

            <Button
              style={styles.button}
              onPress={() => this._handleOnPress('Register')}>
              <Text style={styles.btnText}>
                បង្កេីតគណនី
              </Text>
            </Button>
          </View>
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
  inlineBlock: {
    flex: 1,
    margin: 24,
    marginRight: 0,
    marginLeft: 10,
    justifyContent: 'center',
    flexDirection:'row',
    alignItems: 'center',
  },
  button: {
    borderRadius: 3,
    height: 48,
    width: '50%',
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: FontSetting.button_text,
    color: '#fff',
  }
});
