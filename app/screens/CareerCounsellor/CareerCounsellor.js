import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
} from 'react-native-material-ui';

import Button from '../../components/button';
import myStyles from '../../assets/style_sheets/login_form';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import headerStyles from '../../assets/style_sheets/header';

const uiTheme = {
  palette: {
    primaryColor: '#1976d2',
  }
};

export default class CareerCounsellor extends Component {
  static navigationOptions = {
    drawerLabel: 'វាយតម្លៃមុខរបរនិងអាជីព',
    header: null,
    drawerIcon: ({ tintColor }) => (
      <AwesomeIcon name="briefcase" size={16} color={tintColor} />
    ),
  };

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.wrapper}>

          <Toolbar
            leftElement="menu"
            centerElement={<Text style={[headerStyles.headerTitleStyle, {marginLeft: 0}]}>វាយតម្លៃមុខរបរ និង អាជីព</Text>}
            onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
          />

          <View style={styles.box}>
            <View style={styles.logoWrapper}>
              <Image source={require('../../assets/images/list.png')} style={styles.logo} />
            </View>

            <View style={{alignItems: 'center'}}>
              <Text style={styles.title}>ស្វែងយល់អំពីខ្លួនឯង</Text>
            </View>

            <View style={{marginTop: 20, marginBottom: 30}}>
              <Text style={{fontFamily: 'KantumruyBold', color: '#212121'}}>ប្រសិនបើពិន្ទុសិស្សលើសពី ៥០% សិស្សមានសិទ្ធិបន្តបំពេញទំរង់រៀបចំផែនការមុខរបរ។ ករណីសិស្ស ទទួលបានពិន្ទុក្រោម ៥០% សិស្សត្រូវតម្រូវឲ្យធ្វើតេស្តឡើងវិញម្តងទៀតមុននឹងឈានទៅវគ្គបន្ទាប់។</Text>
            </View>

            <View style={{height: 50}}>
              <Button
                style={myStyles.btnSubmit}
                onPress={this.goToPersonalUnderstandingForm.bind(this)}
                >
                <Text style={[myStyles.submitText, {color: '#fff', fontSize: 20}]}>ចាប់ផ្តើម</Text>
              </Button>
            </View>
          </View>

        </View>
      </ThemeProvider>
    );
  }

  goToPersonalUnderstandingForm(){
    this.props.navigation.navigate('PersonalUnderstandingFormScreen');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1
  },
  icon: {
    width: 24,
    height: 24,
  },
  box: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 24
  },
  title: {
    fontFamily: 'KhmerOureang',
    fontSize: 24,
    color: '#1976d2',
  },
  logoWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 128,
    height: 128
  }
});
