import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  NetInfo,
  ToastAndroid,
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

import { create } from 'apisauce'

const uiTheme = {
  palette: {
    primaryColor: '#1976d2',
  }
};

const api = create({
  baseURL: 'http:192.168.1.118:3000/api/v1',
})

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
    let data = realm.objects('Sidekiq');

    // let games = realm.objects('Game').filtered('uuid="' + data[1].paramUuid + '"');
    // alert(JSON.stringify(games[0].users));

    this.state = {
      user: user,
      data: data
    };

    this._handleInternetConnection();
  }

  _deleteSidekiq = (sidekiq) => {
    realm.write(() => {
      realm.delete(sidekiq);
    });
  }

  _uploadUser(sidekiq) {
    let user = realm.objects('User').filtered('uuid="' + sidekiq.paramUuid + '"')[0];

    if (!user) {
      this._deleteSidekiq(sidekiq);
      return;
    }

    let data = new FormData();
    data.append('data', JSON.stringify(this._buildUser(user))); // you can append anyone.
    data.append('photo', {
      uri: user.photo,
      type: 'image/jpeg',
      name: 'testPhotoName'
    });

    api.post('/users', data, {
      onUploadProgress: (e) => {
        // console.log(e)
        // const progress = e.loaded / e.total;
        // console.log('==============progress', progress);
        // this.setState({
        //   progress: progress
        // });
      }
    })
    .then((res) => console.log('-----------------res',res.config.data))
  }

  _buildUser(user) {
    let attributes = {};

    for (var key in user) {
      let newKey = key.split(/(?=[A-Z])/).map(k => k.toLowerCase()).join('_');;
      attributes[newKey] = user[key];
    }

    return { attributes: attributes }
  }

  _uploadGame(sidekiq) {
    let game = realm.objects('Game').filtered('uuid="' + sidekiq.paramUuid + '"')[0];

    if (!game || !game.users.length) {
      this._deleteSidekiq(sidekiq);
      return;
    }
  }

  _buildGame(game) {
    return game;
  }

  _uploadData() {
    this.state.data.map((sidekiq) => {
      this['_upload' + sidekiq.tableName](sidekiq);
    })
  }

  _handleSubmit() {
    if (!this.state.isOnline) {
      return ToastAndroid.show('មិនមានការតភ្ជាប់បណ្តាញទេឥឡូវនេះ។ សូមព្យាយាម​ម្តង​ទៀត​!', ToastAndroid.SHORT);
    }

    this._uploadData();
  }

  _handleInternetConnection() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({isOnline: isConnected});
    });

    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleFirstConnectivityChange
    );
  }

  _handleFirstConnectivityChange = (isConnected) => {
    if (this.refs.adminDashboard) {
      this.setState({isOnline: isConnected});
    }
  }

  _renderNoData() {
    return (
      <View style={{padding: 16, alignItems: 'center', marginVertical: 100}}>
        <View style={{width: 130, height: 130, borderRadius: 64, backgroundColor: '#bdbdbd', justifyContent: 'center', alignItems: 'center'}}>
          <AwesomeIcon name='folder-open' size={60} />
        </View>
        <Text style={{marginTop: 24, fontFamily: 'KantumruyBold', fontSize: 24, color: '#757575'}}>គ្មានទិន្នន័យ</Text>
      </View>
    )
  }

  _renderDataToUpload() {
    return (
      <View style={[styles.btnBox]}>
        <View style={[styles.btnFab, {backgroundColor: '#f44336'}]}>
          <AwesomeIcon name='cloud-upload' size={30} color='#fff' />
        </View>

        <View style={{marginVertical: 24}}>
          <Text style={styles.btnLabel}>{this.state.data.length} ទិន្នន័យ</Text>

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
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={{flex: 1}} ref="adminDashboard">
          <StatusBar />

          <Toolbar
            leftElement="menu"
            centerElement={<Text style={[headerStyles.headerTitleStyle, {marginLeft: 0}]}>ត្រីវិស័យ</Text>}
            onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
          />

          <ScrollView>
            { !this.state.data.length && this._renderNoData() }
            { !!this.state.data.length && this._renderDataToUpload() }
          </ScrollView>
        </View>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
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
