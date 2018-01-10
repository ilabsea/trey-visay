import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
} from 'react-native';

import {
  ThemeProvider,
  Icon,
} from 'react-native-material-ui';

import BackConfirmDialog from '../../components/back_confirm_dialog';
import CheckboxGroup from '../../components/checkbox_group';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';
import realm from '../../schema';
import User from '../../utils/user';
import characteristicList from '../../data/json/characteristic_jobs';

let careers = [];

export default class PersonalityJobsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;
    let highlighStyle = (state.params && state.params.total > 3) ? {color: '#e94b35'} : {color: '#fff'};

    return {
      title: 'ជ្រើសរើស៣មុខរបរចេញពីបុគ្គលិកលក្ខណៈរបស់អ្នក',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>{state.params && state.params.title}</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => state.params._handleBack()} style={{marginHorizontal: 16}}>
                      <Icon name='close' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>,
      headerRight: (<TouchableOpacity style={headerStyles.actionWrapper}>
                      <Text style={headerStyles.saveText}><Text style={highlighStyle}>{state.params && state.params.total || 0} </Text> / 3</Text>
                    </TouchableOpacity>),
    }
  };

  careers = [];

  componentWillMount() {
    this._initState();
    this._handleSetSelectCareer();
    this._backHandler();
  }

  componentDidMount() {
    this.props.navigation.setParams({_handleBack: this._handleBack.bind(this), title: this.state.currentGroup.title, total: careers.length});
  }

  _initState() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    let game = user.games[user.games.length - 1];
    let currentGroup = characteristicList.find((obj) => obj.id == game.characteristicId);

    this.state = {
      user: user,
      game: game,
      currentGroup: currentGroup,
      jobs: [],
    }
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

  _buildData(step) {
    let data = this.state.jobs.map((value) => {
      return { value: value };
    })

    let obj =  {
      uuid: this.state.game.uuid,
      personalityCareers: data,
      step: step || 'SummaryScreen'
    }

    return obj;
  }

  _onYes() {
    realm.write(() => {
      realm.create('Game', this._buildData('PersonalityJobsScreen'), true);

      this.setState({confirmDialogVisible: false});
      this.props.navigation.dispatch({type: 'Navigation/RESET', routeName: 'PersonalityScreen', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'CareerCounsellorScreen'}]});
    });
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.game);

      this.setState({confirmDialogVisible: false});
      this.props.navigation.dispatch({type: 'Navigation/RESET', routeName: 'ContactScreen', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'CareerCounsellorScreen'}]});
    });
  }

  _handleSetSelectCareer() {
    let jobs = this.state.currentGroup.careers;
    let selectedJobIds = this.state.game.personalityCareers.map((obj) => obj.value) || [];
    let arr = jobs.filter(function (item, pos) { return selectedJobIds.includes(item.id) });
    careers = arr.map((obj) => obj.id);

    this.setState({jobs: careers});
  }

  _renderCheckBoxes() {
    let checkboxes = this._formatDataForCheckbox(this.state.currentGroup.id);

    return(
      <View style={styles.box}>
        <Text style={styles.subTitle}>មុខរបរ</Text>

        <View>
          <CheckboxGroup
            onSelect={(selected) => {this._handleChecked(selected)}}
            items={checkboxes}
            checked={this.state.jobs}
            style={{
              icon: {
                color: '#4caf50',
                size: 30
              },
              container: {
                flexDirection: 'row',
                borderTopWidth: 0.5,
                borderColor: '#ccc',
                paddingVertical: 8,
              },
              label: {
                color: '#333',
                fontSize: 16,
                marginLeft: 10
              }
            }}
          />
        </View>
      </View>
    )
  }

  _formatDataForCheckbox(id) {
    let jobs = characteristicList.find((obj) => obj.id == id).careers;
    let arr = [];

    for(let i = 0; i < jobs.length; i++) {
      arr.push({ value: jobs[i].id, label: jobs[i].name })
    }
    return arr;
  }

  _handleChecked(value) {
    careers = value
    this.props.navigation.setParams({total: careers.length});

    if (careers.length > 3) {
      ToastAndroid.show('You must select 3 careers only!', ToastAndroid.SHORT);
      return
    }

    this.setState({jobs: value});
  }

  _renderFooter() {
    return(
      <View style={shareStyles.footerWrapper}>
        <TouchableOpacity onPress={this._goNext.bind(this)} style={shareStyles.btnNext}>
          <Text style={shareStyles.btnText}>បន្តទៀត</Text>
          <Icon name='keyboard-arrow-right' color='#fff' size={24} />
        </TouchableOpacity>
      </View>
    )
  }

  _goNext() {
    if (this.state.jobs.length != 3) {
      return ToastAndroid.show('You must select 3 careers only!', ToastAndroid.SHORT);
    }

    this._handleSubmit();
  }

  _handleSubmit() {
    realm.write(() => {
      realm.create('Game', this._buildData('SummaryScreen'), true);
      this.props.navigation.navigate('SummaryScreen');
    });
  }

  render() {
    return(
      <ThemeProvider uiTheme={{}}>
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <View style={{margin: 16}}>
              <View style={{flexDirection: 'row', marginVertical: 16}}>
                <MaterialIcon name='stars' color='#e94b35' size={24} style={{marginRight: 8}} />
                <Text>សូមជ្រើសរើសមុខរបរខាងក្រោមយ៉ាងច្រើនចំនួន៣៖</Text>
              </View>

              { this._renderCheckBoxes() }

              <BackConfirmDialog
                visible={this.state.confirmDialogVisible}
                onTouchOutside={() => this.setState({confirmDialogVisible: false})}
                onPressYes={() => this._onYes()}
                onPressNo={() => this._onNo()}
              />
            </View>
          </ScrollView>

          { this._renderFooter() }
        </View>
      </ThemeProvider>
    );
  };
}
