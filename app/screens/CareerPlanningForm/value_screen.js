import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

import {
  ThemeProvider,
  Icon,
} from 'react-native-material-ui';

import BackConfirmDialog from '../../components/back_confirm_dialog';

import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';

import realm from '../../schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';
import valueJobs from '../../data/json/value_jobs';

let group = {
  group0: [],
  group1: [],
  group2: [],
};

export default class ValueScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'បំពេញគុណតម្លៃ',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>បំពេញគុណតម្លៃ</Text>,
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

    if (!!game.valueCareers.length) {
      let arr = game.valueCareers.map((obj)=> obj.value)
      this.setState({jobs: arr});
    }

    this.setState({user: user, game: game});
  }

  _onYes() {
    realm.write(() => {
      realm.create('Game', this._buildData('ValueScreen'), true);

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
      realm.create('Game', this._buildData('PersonalityScreen'), true);
      // alert(JSON.stringify(realm.objects('Game')[realm.objects('Game').length -1]));
      this.props.navigation.navigate('PersonalityScreen');
    });
  }

  _buildData(step) {
    let data = this.state.jobs.map((value) => {
      return { value: value };
    })

    let obj = {
      uuid: this.state.game.uuid,
      valueCareers: data,
      step: step || 'PersonalityScreen'
    };

    return obj;
  }

  _renderValue(groupNumber) {
    let group = valueJobs[groupNumber];
    let title = group.text;
    let description = group.description;

    return (
      <TouchableOpacity
        onPress={() => this._goToValueJobsScreen(groupNumber)}
        style={styles.box}>
        <Text style={styles.subTitle}>{title}</Text>
        <Text>{description}</Text>
      </TouchableOpacity>
    )
  }

  _goToValueJobsScreen(groupNumber) {
    this.setState({currentGroup: groupNumber})
    this.props.navigation.navigate('ValueJobsScreen', { groupNumber: groupNumber, refresh: this._refreshState.bind(this), selectedCareers: this.state.jobs})
  }

  render() {
    return(
      <ThemeProvider uiTheme={{}}>
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <View style={{margin: 16}}>
              { this._renderValue(0) }
              { this._renderValue(1) }
              { this._renderValue(2) }
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
