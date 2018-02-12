import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  NetInfo,
  ToastAndroid,
  Alert,
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
  Icon,
} from 'react-native-material-ui';

import * as Progress from 'react-native-progress';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/button';

// Utils
import realm from '../../schema';
import User from '../../utils/user';
import headerStyles from '../../assets/style_sheets/header';
import StatusBar from '../../components/status_bar';
import shareStyles from '../../assets/style_sheets/login_form';
import characteristicList from '../../data/json/characteristic_jobs';

import { create } from 'apisauce';

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
    let currentUser = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];

    this.state = {
      currentUser: currentUser
    };

    this.api = create({
      baseURL: 'http://192.168.1.118:3000/api/v1'
      // baseURL: 'http://110.74.204.121:8090/api/v1'
    })
    this._refreshState();
    this._handleInternetConnection();
  }

  _refreshState() {
    let data = realm.objects('Sidekiq');
    this.successCount = 0;
    this.failCount = 0;
    this.count = 0;
    this.cancel = false;

    this.setState({
      data: data.map((sidekiq) => ({paramUuid: sidekiq.paramUuid, tableName: sidekiq.tableName})),
      progress: 0,
      totalCount: data.length,
      showLoading: false
    });
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

  _deleteSidekiq = (sidekiq) => {
    let sk = realm.objects('Sidekiq').filtered('paramUuid="' + sidekiq.paramUuid + '"')[0];
    realm.write(() => {
      realm.delete(sk);
    });
  }

  _uploadUser(sidekiq) {
    let user = realm.objects('User').filtered('uuid="' + sidekiq.paramUuid + '"')[0];

    if (!user) {
      return this._handleResponse({ok: true}, sidekiq);
    }

    this.api.post('/users', this._buildUser(user))
    .then((res) => {
      this._handleResponse(res, sidekiq);
    })
  }

  _buildUser(user) {
    let data = new FormData();
    data.append('data', JSON.stringify(this._buildAttributes(user)));
    data.append('auth_token', this.state.currentUser.token);

    if (user.photo) {
      data.append('photo', {
        uri: user.photo,
        type: 'image/jpeg',
        name: 'userPhoto'
      });
    }

    return data;
  }

  _buildAttributes(obj) {
    let attributes = {};

    for (var key in obj) {
      let newKey = key.split(/(?=[A-Z])/).map(k => k.toLowerCase()).join('_');;
      attributes[newKey] = obj[key];
    }

    return attributes;
  }

  _next = () => {
    let progress = (this.count + 1) / this.state.totalCount;
    this.setState({progress: progress})
    this.count++;
    this._uploadData();
  }

  _uploadGame(sidekiq) {
    let game = realm.objects('Game').filtered('uuid="' + sidekiq.paramUuid + '"')[0];

    if (!game || !game.users.length) {
      return this._handleResponse({ok: true}, sidekiq);
    }

    this.api.post('/games', this._buildGame(game))
    .then((res) => {
      this._handleResponse(res, sidekiq);
    })
  }

  _handleResponse(res, sidekiq) {
    if (res.ok) {
      this._deleteSidekiq(sidekiq);
      this.successCount++;
    } else {
      this.failCount++;
    }

    if (this.cancel || !this.state.showLoading || !this.state.isOnline) {
      return this._alertResult();
    }

    this._next();
  }

  _buildGame(game) {
    let attributes = this._buildAttributes(game);

    attributes.user_uuid = game.users[0].uuid
    attributes.characteristic_entries = game.characteristicEntries.map(obj => obj.value);
    attributes.game_subject = this._buildAttributes(game.gameSubject);
    attributes.personal_understandings = [];

    delete attributes.personality_careers;
    delete attributes.step;
    delete attributes.is_done;
    delete attributes.goal_career;

    let currentGroup = characteristicList.find((obj) => obj.id == game.characteristicId);
    let careerIds = game.personalityCareers.map((obj) => obj.value);
    game.personalityCareers.map((obj) => {
      attributes.careers = currentGroup.careers.filter((item, pos) => { return careerIds.includes(item.id) });
    });

    attributes.careers = attributes.careers.map((obj) => {
      obj.is_goal = (obj.id == game.mostFavorableJobId);
      return obj;
    })

    game.personalUnderstandings.map((obj) => {
      attributes.personal_understandings.push(this._buildAttributes(obj));
    })

    // Form data
    let data = new FormData();
    data.append('data', JSON.stringify(attributes));
    data.append('auth_token', this.state.currentUser.token);

    if (game.voiceRecord) {
      data.append('audio', {
        uri: 'file://'+ game.voiceRecord,
        type: 'audio/aac',
        name: 'voiceRecord.aac'
      });
    }

    return data;
  }

  _uploadData = () => {
    if (this.count < this.state.totalCount) {
      let sidekiq = this.state.data[this.count];
      this['_upload' + sidekiq.tableName](sidekiq);
      return;
    }

    this._alertResult();
  }

  _alertResult() {
    let total = this.successCount + this.failCount;

    Alert.alert(
      'ការបញ្ចូនទិន្នន័យទៅលើសរុបគឺ ' + total + ' លើ ' + this.state.totalCount,
      'ជោគជ័យចំនួន ' + this.successCount + '; ហើយបរាជ័យចំនួន ' + this.failCount,
      [{ text: 'OK', onPress: () => this._refreshState() }],
      { cancelable: false }
    )
  }

  _handleSubmit() {
    if (!this.state.isOnline) {
      return Alert.alert(
        'អ៊ីនធឺណេតមិនដំណើរការ',
        'ដើម្បីបញ្ជូនទិន្នន័យទៅលើបាន តម្រូវឲ្យអ្នកភ្ជាប់អុីនធឺណេតជាមុនសិន។');
    }

    if (this.state.showLoading) {
      this.cancel = true;
      return;
    }

    this.count = 0;
    this.setState({showLoading: true});
    this._uploadData();
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

  _renderHaveData() {
    return (
      <View style={styles.btnBox}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={[styles.btnFab, {backgroundColor: '#f44336'}]}>
            <AwesomeIcon name='cloud-upload' size={30} color='#fff' />
          </View>

          <View style={{marginVertical: 24}}>
            <Text style={styles.btnLabel}>
              { !this.state.showLoading && this.state.data.length + ' ទិន្នន័យ' }
              { this.state.showLoading && 'កំពុងបញ្ជូនទិន្នន័យទៅលើ...' }
            </Text>

            <Button
              style={[shareStyles.btnSubmit, {paddingHorizontal: 16, marginTop: 24}]}
              onPress={this._handleSubmit.bind(this)}>

              <Text style={[shareStyles.submitText, {color: '#fff'}]}>
                { !this.state.showLoading && 'បញ្ចូនទិន្នន័យទៅលើ' }
                { this.state.showLoading && 'បោះបង់' }
              </Text>
            </Button>
          </View>
        </View>

        { this.state.showLoading &&
          <View>
            <Progress.Bar progress={this.state.progress} width={null}/>
          </View>
        }
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
            { !!this.state.data.length && this._renderHaveData() }
          </ScrollView>
        </View>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  btnBox: {
    flex: 1,
    margin: 16,
    backgroundColor: '#fff',
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
