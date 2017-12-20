import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Image,
} from 'react-native';

import {
  ThemeProvider,
  Icon,
} from 'react-native-material-ui';

import BackConfirmDialog from '../../components/back_confirm_dialog';

import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Images from '../../assets/images';

import realm from '../../schema';
import User from '../../utils/user';
import personalityJobs from '../../data/json/personality_jobs';

let group = {
  group0: [],
  group1: [],
  group2: [],
};

export default class PersonalityScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'បំពេញបុគ្គលិកលក្ខណៈ',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>បំពេញបុគ្គលិកលក្ខណៈ</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => navigation.state.params._handleBack()} style={{marginHorizontal: 16}}>
                      <Icon name='close' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>,
      headerRight: (<View style={headerStyles.actionWrapper}>
                      <Text style={headerStyles.saveText}>Total Jobs: {state.params && state.params.total || 0}</Text>
                    </View>)
    }
  };

  state = {
    jobs: [],
    currentGroup: '',
    confirmDialogVisible: false,
    user: '',
    game: ''
  }

  componentDidMount() {
    this.props.navigation.setParams({_handleBack: this._handleBack.bind(this)});
    this._initState();
    this._backHandler();
  }

  _handleBack() {
    if (this.state.jobs.length > 0) {
      this.setState({confirmDialogVisible: true});
    } else {
      this.props.navigation.goBack();
    }
  }

  _backHandler() {
    let self = this;

    BackHandler.addEventListener('hardwareBackPress', function() {
      if (self.state.jobs.length > 0) {
        self.setState({confirmDialogVisible: true});
        return true;
      }

      self.props.navigation.goBack();
      return false;
    });
  }

  _initState() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    let game = user.games[user.games.length - 1];

    if (!!game.personalityCareers.length) {
      let arr = game.personalityCareers.map((obj)=> obj.value);
      this.setState({jobs: arr});
    }

    this.setState({user: user, game: game});
  }

  _onYes() {
    realm.write(() => {
      realm.create('Game', this._buildData('PersonalityScreen'), true);

      this.setState({confirmDialogVisible: false});
      this.props.navigation.goBack();
    });
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.game);

      this.setState({confirmDialogVisible: false});
      this.props.navigation.dispatch({type: 'Navigation/RESET', routeName: 'ContactScreen', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'CareerCounsellorScreen'}]});
    });
  }

  _refreshState(jobs) {
    group['group' + this.state.currentGroup] = jobs
    this._refreshTotalJobs();
  }

  _refreshTotalJobs() {
    let arr = [];

    for (i = 0; i < 3; i++) {
      arr = arr.concat(group['group' + i]);
    }

    this.setState({jobs: arr});
    // this.props.navigation.setParams({total: arr.length});
  }

  _renderFooter() {
    return(
      <View style={shareStyles.footerWrapper}>
        <TouchableOpacity onPress={this._goNext.bind(this)} style={shareStyles.btnNext}>
          <Text style={shareStyles.btnText}>Total jobs: {this.state.jobs.length} បន្តទៀត</Text>
          <Icon name='keyboard-arrow-right' color='#fff' size={24} />
        </TouchableOpacity>
      </View>
    )
  }

  _goNext() {
    this._checkValidation();
  }

  _checkValidation() {
    if (this.state.jobs.length < 3) {
      return alert('Please select careers at least 3 from any value');
    }

    this._handleSubmit();
  }

  _handleSubmit() {
    realm.write(() => {
      realm.create('Game', this._buildData('SummaryScreen'), true);
      this.props.navigation.navigate('SummaryScreen');
    });
  }

  _buildData(step) {
    let data = this.state.jobs.map((value) => {
      return { value: value };
    })

    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    let obj =  {
      uuid: this.state.game.uuid,
      personalityCareers: data,
      step: step || 'SummaryScreen'
    }

    return obj;
  }

  _renderPersonality(groupNumber) {
    let group = personalityJobs[groupNumber];
    let title = group.text;
    let description = group.description;

    return (
      <TouchableOpacity
        onPress={() => this._goToPersonalityJobsScreen(groupNumber)}
        style={[styles.box, {marginBottom: 0, borderBottomWidth: 0.5, borderColor: '#ccc'}]}>

        <View style={{flexDirection: 'row'}}>
          <View>
            <Image source={Images[group.logoName]} style={{width: 80, height: 80, marginRight: 16}} />
          </View>

          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.subTitle, {flex: 1}]}>{title}</Text>
              <AwesomeIcon name='angle-right' size={24} color='#bbb' />
            </View>
            <Text style={{paddingRight: 16}}>{description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _goToPersonalityJobsScreen(groupNumber) {
    this.setState({currentGroup: groupNumber})
    this.props.navigation.navigate('PersonalityJobsScreen', { groupNumber: groupNumber, refresh: this._refreshState.bind(this), selectedCareers: this.state.jobs})
  }

  render() {
    return(
      <ThemeProvider uiTheme={{}}>
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <View style={{margin: 16}}>
              <View style={{flexDirection: 'row', marginVertical: 16}}>
                <MaterialIcon name='stars' color='#e94b35' size={24} style={{marginRight: 8}} />
                <Text>ចូរជ្រើសរើសមុខរបរឲ្យបាន<Text style={{fontFamily: 'KantumruyBold'}}>៣យ៉ាងតិច</Text> ដោយផ្អែកលើគុណតម្លៃរបស់អ្នក!</Text>
              </View>

              { this._renderPersonality(0) }
              { this._renderPersonality(1) }
              { this._renderPersonality(2) }
            </View>
          </ScrollView>

          { this._renderFooter() }

          <BackConfirmDialog
            visible={this.state.confirmDialogVisible}
            onTouchOutside={() => this.setState({confirmDialogVisible: false})}
            onPressYes={() => this._onYes()}
            onPressNo={() => this._onNo()}
          />
        </View>
      </ThemeProvider>
    );
  };
}
