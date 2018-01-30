import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  NetInfo,
  ToastAndroid,
  Alert,
} from 'react-native';

import * as Progress from 'react-native-progress';

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
import characteristicList from '../../data/json/characteristic_jobs';

import { create } from 'apisauce';

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
    this._refreshState();
    this._handleInternetConnection();
  }

  _refreshState() {
    let data = realm.objects('Sidekiq');
    this.successCount = 0;
    this.failCount = 0;
    this.count = 0;

    this.setState({
      data: data,
      progress: 0,
      totalCount: data.length,
      showLoading: false
    });
  }

  _deleteSidekiq = (sidekiq) => {
    realm.write(() => {
      realm.delete(sidekiq);
    });
  }

  _uploadUser(sidekiq) {
    let user = realm.objects('User').filtered('uuid="' + sidekiq.paramUuid + '"')[0];

    if (!user) {
      return this._deleteSidekiq(sidekiq);
    }

    api.post('/users', this._buildUser(user), {
      onUploadProgress: (e) => {}
    })
    .then((res) => {
      if (res.ok) {
        // this._deleteSidekiq(sidekiq);
        this.successCount++;
      } else {
        this.failCount++;
      }
      this._next();
    })
  }

  _buildUser(user) {
    let data = new FormData();
    data.append('data', JSON.stringify(this._buildAttributes(user)));

    if (user.photo) {
      data.append('photo', {
        uri: user.photo,
        type: 'image/jpeg',
        name: ''
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
      this._deleteSidekiq(sidekiq);
      return;
    }

    api.post('/games', this._buildGame(game), {
      onUploadProgress: (e) => {}
    })
    .then((res) => {
      if (res.ok) {
        // this._deleteSidekiq(sidekiq);
        this.successCount++;
      } else {
        this.failCount++;
      }
      this._next();
    })
  }

  _buildGame(game) {
    let attributes = this._buildAttributes(game);

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

    let data = new FormData();
    data.append('data', JSON.stringify(attributes));

    if (game.audio) {
      data.append('audio', {
        uri: game.voiceRecord,
        type: 'audio/aac',
        name: ''
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

    Alert.alert(
      'Upload Finish',
      'Upload success is ' + this.successCount + '; Upload fail is ' + this.failCount,
      [
        { text: 'OK', onPress: () => this._refreshState() }
      ]
    )
  }

  _handleSubmit() {
    if (!this.state.isOnline) {
      return Alert.alert(
        'អ៊ីនធឺណេតមិនដំណើរការ',
        'ដើម្បីបញ្ជូនទិន្នន័យទៅលើបាន តម្រូវឲ្យអ្នកភ្ជាប់អុីនធឺណេតជាមុនសិន។');
    }
    this.count = 0;
    this.setState({showLoading: true});
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
      <View style={styles.btnBox}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
