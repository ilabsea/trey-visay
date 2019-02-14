import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Button from '../../components/button';
import OpenDrawer from '../../components/open_drawer';
import StatusBar from '../../components/status_bar';
import headerStyles from '../../assets/style_sheets/header';

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
    // this.props.navigation.dispatch({
    //   type: 'Navigation/RESET',
    //   index: 0,
    //   actions: [{
    //     type: 'Navigation/NAVIGATE',
    //     routeName:route
    //   }]
    // })
  }

  render() {
    return (
      <View style={{flex: 1}}>
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
  box: {
    backgroundColor: '#fff',
    padding: 24,
    margin: 16
  },
  text: {
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 24
  },
  inlineBlock: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection:'row',
  },
  button: {
    borderRadius: 3,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginRight: 20,
    marginBottom: 10
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  }
});
