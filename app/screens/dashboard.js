import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
  Icon,
} from 'react-native-material-ui';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

// Utils
import User from '../utils/user';
import headerStyles from '../assets/style_sheets/header';

const uiTheme = {
  palette: {
    primaryColor: '#1976d2',
  }
};

export default class Dashboard extends Component {
  static navigationOptions = {
    drawerLabel: 'ទំព័រដើម',
    drawerIcon: ({ tintColor }) => (
      <ThemeProvider uiTheme={{}}>
        <Icon name="home" color={tintColor} />
      </ThemeProvider>
    ),
  };

  componentWillMount() {
    this.props.navigation.navigate('DrawerOpen');
  }

  logout() {
    User.logout();
    this.props.screenProps.rootNavigation.dispatch({type: 'Navigation/RESET', routeName: 'Home', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'Login'}]})
  }

  _renderBtnCareer() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('CareerCounsellor')}
        style={[styles.btnBox, {backgroundColor: '#f4511e'}]}>
        <AwesomeIcon name='briefcase' size={60} color='#fff' />
        <Text style={styles.btnLabel}>មុខរបរ និង អាជីព</Text>
      </TouchableOpacity>
    )
  }

  _renderBtnSchool() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Institution')}
        style={[styles.btnBox, {backgroundColor: '#00a185', marginRight: 8}]}>
        <AwesomeIcon name='graduation-cap' size={60} color='#fff' />
        <Text style={styles.btnLabel}>គ្រឹះស្ថានសិក្សា</Text>
      </TouchableOpacity>
    )
  }

  _renderBtnVideo() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Video')}
        style={[styles.btnBox, {backgroundColor: '#673ab7', marginLeft: 8}]}>
        <AwesomeIcon name='play-circle-o' size={60} color='#fff' />
        <Text style={styles.btnLabel}>វីដេអូមុខរបរ</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <Toolbar
            leftElement="menu"
            centerElement={<Text style={[headerStyles.headerTitleStyle, {marginLeft: 0}]}>ត្រីវិស័យ</Text>}
            onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
          />

          <ScrollView>
            <View style={styles.scrollContainer}>
              <View style={{flexDirection: 'row'}}>
                {this._renderBtnCareer()}
              </View>

              <View style={{flexDirection: 'row'}}>
                {this._renderBtnSchool()}
                {this._renderBtnVideo()}
              </View>

              <Button title='ចាកចេញ' onPress={this.logout.bind(this)}/>
            </View>
          </ScrollView>
        </View>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    padding: 16
  },
  btnBox: {
    flex: 1,
    height: 290,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  btnLabel: {
    fontFamily: 'KhmerOureang',
    fontSize: 24,
    lineHeight: 40,
    color: '#fff',
  }
});
