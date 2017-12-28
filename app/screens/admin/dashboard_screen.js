import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
  Icon,
} from 'react-native-material-ui';

import Button from '../../components/button';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

// Utils
import realm from '../../schema';
import User from '../../utils/user';
import headerStyles from '../../assets/style_sheets/header';
import StatusBar from '../../components/status_bar';
import shareStyles from '../../assets/style_sheets/login_form';

const uiTheme = {
  palette: {
    primaryColor: '#1976d2',
  }
};

export default class AdminDashboardScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'ទំព័រដើម',
    drawerIcon: ({ tintColor }) => (
      <ThemeProvider uiTheme={{}}>
        <Icon name="home" color={tintColor} />
      </ThemeProvider>
    ),
  };

  componentWillMount() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];

    this.state = {
      user: user
    };
  }

  _renderNoData() {
    return (
      <View style={[styles.scrollContainer, {alignItems: 'center', marginVertical: 100}]}>
        <View style={{width: 130, height: 130, borderRadius: 64, backgroundColor: '#bdbdbd', justifyContent: 'center', alignItems: 'center'}}>
          <AwesomeIcon name='folder-open' size={60} />
        </View>
        <Text style={{marginTop: 24, fontFamily: 'KantumruyBold', fontSize: 24, color: '#757575'}}>គ្មានទិន្នន័យ</Text>
      </View>
    )
  }

  _handleSubmit() {
    alert('upload to server!');
  }

  _renderDataToUpload(users) {
    return (
      <View style={[styles.btnBox]}>
        <View style={[styles.btnFab, {backgroundColor: '#f44336'}]}>
          <AwesomeIcon name='cloud-upload' size={30} color='#fff' />
        </View>

        <View style={{marginVertical: 24}}>
          <Text style={styles.btnLabel}>{users.length} ទិន្នន័យ</Text>

          <Button
            style={[shareStyles.btnSubmit, {paddingHorizontal: 16, marginTop: 24}]}
            onPress={this._handleSubmit.bind(this)}>

            <Text style={[shareStyles.submitText, {color: '#fff'}]}>បញ្ចូនទិន្នន័យទៅលើ</Text>
          </Button>
        </View>
      </View>
    )
  }

  render() {
    let users = realm.objects('User').filtered('role = "student"');

    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <StatusBar />

          <Toolbar
            leftElement="menu"
            centerElement={<Text style={[headerStyles.headerTitleStyle, {marginLeft: 0}]}>ត្រីវិស័យ</Text>}
            onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
          />

          <ScrollView>
            { !users.length && this._renderNoData() }
            { !!users.length && this._renderDataToUpload(users) }
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
    alignItems: 'center',
    margin: 16,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  btnLabel: {
    fontFamily: 'KhmerOureang',
    fontSize: 24,
    lineHeight: 40,
    flex: 1,
    color: '#1976d2',
  },
  btnFab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 24
  },
});
