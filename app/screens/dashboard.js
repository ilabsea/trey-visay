import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
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
  }

  _renderBtnCareer() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('CareerCounsellorScreen')}
        style={[styles.btnBox]}>
        <View style={[styles.btnFab, {backgroundColor: '#3f51b5'}]}>
          <AwesomeIcon name='briefcase' size={30} color='#fff' />
        </View>
        <Text style={styles.btnLabel}>វាយតម្លៃមុខរបរ និង អាជីព</Text>
      </TouchableOpacity>
    )
  }

  _renderBtnSchool() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Institution')}
        style={[styles.btnBox]}>
        <View style={[styles.btnFab, {backgroundColor: '#009688'}]}>
          <AwesomeIcon name='graduation-cap' size={30} color='#fff' />
        </View>
        <Text style={styles.btnLabel}>គ្រឹះស្ថានសិក្សា</Text>
      </TouchableOpacity>
    )
  }

  _renderBtnVideo() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('VideoScreen')}
        style={[styles.btnBox]}>
        <View style={[styles.btnFab, {backgroundColor: '#f44336'}]}>
          <AwesomeIcon name='video-camera' size={30} color='#fff' />
        </View>
        <Text style={styles.btnLabel}>វីដេអូមុខរបរ</Text>
      </TouchableOpacity>
    )
  }

  _renderAbout() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('About')}
        style={[styles.btnBox]}>
        <View style={[styles.btnFab, {backgroundColor: '#607d8b'}]}>
          <AwesomeIcon name='list' size={30} color='#fff' />
        </View>
        <Text style={styles.btnLabel}>អំពីយើង</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <StatusBar backgroundColor="#176bc1" />

          <Toolbar
            leftElement="menu"
            centerElement={<Text style={[headerStyles.headerTitleStyle, {marginLeft: 0}]}>ត្រីវិស័យ</Text>}
            onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
          />

          <ScrollView>
            <View style={styles.scrollContainer}>
              {this._renderBtnCareer()}
              {this._renderBtnSchool()}
              {this._renderBtnVideo()}
              {this._renderAbout()}
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
    height: 108,
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  btnLabel: {
    fontFamily: 'KhmerOureang',
    fontSize: 24,
    lineHeight: 40,

  },
  btnFab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 24
  }
});
