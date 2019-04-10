import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Platform
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast'
import { Divider } from 'react-native-elements';

import BackConfirmDialog from '../../components/shared/back_confirm_dialog';
import CheckboxGroup from '../../components/checkbox_group';
import FooterBar from '../../components/FooterBar';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import mainStyles from '../../assets/style_sheets/main/main';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';
import realm from '../../schema';
import User from '../../utils/user';
import characteristicList from '../../data/json/characteristic_jobs';

let careers = [];

export default class PersonalityJobsScreen extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   const { goBack, state } = navigation;
  //   let highlighStyle = (state.params && state.params.total > 3) ? {color: '#e94b35'} : {color: '#fff'};

  //   return {
  //     title: state.params && state.params.title,
  //     headerTitleStyle: [headerStyles.headerTitleStyle],
  //     headerRight: (<TouchableOpacity style={headerStyles.actionWrapper}>
  //                     <Text style={headerStyles.saveText}><Text style={highlighStyle}>{state.params && state.params.total || 0} </Text> / 3</Text>
  //                   </TouchableOpacity>),
  //   }
  // };

  careers = [];

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this._initState();
    this._handleSetSelectCareer();
    this._backHandler();
  }

  componentDidMount() {
    this.props.navigation.setParams({
      _handleBack: this._handleBack.bind(this),
      title: this.state.currentGroup.career_title,
      total: careers.length,
      goNext: this._goNext.bind(this)
    });
  }

  _initState() {
    let user = User.getCurrent();
    let game = user.games[user.games.length - 1];
    let currentGroup = characteristicList.find((obj) => obj.id == game.characteristicId);

    this.state = { user: user, game: game, currentGroup: currentGroup, jobs: []};
  }

  _handleBack() {
    this.setState({confirmDialogVisible: true});
  }

  _backHandler() {
    BackHandler.addEventListener('hardwareBackPress', this._onClickBackHandler);
  }

  _onClickBackHandler = () => {
    this.setState({confirmDialogVisible: true});

    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);
    return true
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
      this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, key: null, actions: [{ type: 'Navigation/NAVIGATE', routeName:'CareerCounsellorScreen'}]});
    });
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.game);

      this.setState({confirmDialogVisible: false});
      this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, key: null, actions: [{ type: 'Navigation/NAVIGATE', routeName:'CareerCounsellorScreen'}]});
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
      <View style={mainStyles.box}>
        <Text style={[mainStyles.title, {paddingLeft: 16, padding: 8}]}>មុខរបរ</Text>
        <Divider />
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
      return this.refs.toast.show('សូមជ្រើសរើសមុខរបរចំនួន 3 ប៉ុណ្ណោះ!',  DURATION.SHORT);
    }

    this.setState({jobs: value});
  }

  _goNext() {
    if (this.state.jobs.length != 3) {
      return this.refs.toast.show('សូមជ្រើសរើសមុខរបរចំនួន 3គត់!', DURATION.SHORT);
    }

    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);
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
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={{marginTop: 24}}>
            <Text style={mainStyles.instructionText}>សូមជ្រើសរើសមុខរបរខាងក្រោមយ៉ាងច្រើនចំនួន៣៖</Text>

            { this._renderCheckBoxes() }

            <BackConfirmDialog
              visible={this.state.confirmDialogVisible}
              onTouchOutside={() => this.setState({confirmDialogVisible: false})}
              onPressYes={() => this._onYes()}
              onPressNo={() => this._onNo()}
            />
          </View>
        </ScrollView>

        <Toast ref='toast' positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
      </View>
    );
  };
}
