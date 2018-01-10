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

import CheckboxGroup from '../../components/checkbox_group';
import RadioGroup from '../../components/radio_group';
import BackConfirmDialog from '../../components/back_confirm_dialog';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';

import realm from '../../schema';
import User from '../../utils/user';
import characteristicList from '../../data/json/characteristic_jobs';

let careers = [];
let allCareers = [];

export default class SummaryScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'ជ្រើសរើសមុខរបរចេញពីតារាងសង្ខេបលទ្ធផល',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>ជ្រើសរើសមុខរបរចេញពីតារាងសង្ខេបលទ្ធផល</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => navigation.state.params._handleBack()} style={{marginHorizontal: 16}}>
                      <Icon name='close' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>,
    }
  };

  componentWillMount() {
    careers = [];
    allCareers = [];

    this.props.navigation.setParams({_handleBack: this._handleBack.bind(this)});
    this._initState();
    this._backHandler();
  }

  _initState() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    let game = user.games[user.games.length - 1];
    let currentGroup = characteristicList.find((obj) => obj.id == game.characteristicId);

    careerIds = game.personalityCareers.map((obj) => obj.value);
    let userCareers = currentGroup.careers.filter((item, pos) => { return careerIds.includes(item.id) });

    // game.recommendations.map((obj) => {
    //   careers.push(obj.careerUuid);
    // })

    this.state = {
      userCareers: userCareers,
      user: user,
      game: game,
      confirmDialogVisible: false,
      mostFavorableJob: game.mostFavorableJobId,
    }
  }

  _handleBack() {
    if (!!this.state.mostFavorableJob) {
      this.setState({confirmDialogVisible: true});
    } else {
      this.props.navigation.goBack();
    }
  }

  _backHandler() {
    let self = this;

    BackHandler.addEventListener('hardwareBackPress', function() {
      if (!!this.state.mostFavorableJob) {
        self.setState({confirmDialogVisible: true});
        return true;
      }

      self.props.navigation.goBack();
      return false;
    });
  }

  _onYes() {
    // let list = this.state.game.recommendations;
    // let recommendations = allCareers.filter((item, pos) => { return careers.includes(item.id) });

    realm.write(() => {
      // realm.delete(list);
      // this.state.game.step = 'SummaryScreen';

      // recommendations.map((job, pos) => {
      //   list.push({ careerUuid: recommendations[pos].id, careerName: recommendations[0].title});
      // })

      realm.create('Game', this._buildData('SummaryScreen'), true);

      this.setState({confirmDialogVisible: false});
      // this.props.navigation.goBack();
      this.props.navigation.dispatch({type: 'Navigation/RESET', routeName: 'SummaryScreen', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'CareerCounsellorScreen'}]});
    });
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.game);

      this.setState({confirmDialogVisible: false});
      this.props.navigation.dispatch({type: 'Navigation/RESET', routeName: 'ContactScreen', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'CareerCounsellorScreen'}]});
    });
  }

  _buildData(step) {
    let obj =  {
      uuid: this.state.game.uuid,
      mostFavorableJobId: this.state.mostFavorableJob,
      step: step || 'RecommendationScreen'
    }

    return obj;
  }


  _formatDataForCheckbox(jobs) {
    let arr = [];

    for(let i = 0; i < jobs.length; i++) {
      arr.push({ value: jobs[i].id, label: jobs[i].name })
    }
    return arr;
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
    if (!this.state.mostFavorableJob) {
      return ToastAndroid.show('Please select 1 job!', ToastAndroid.SHORT);
    }

    this._handleSubmit();
  }

  _handleSubmit() {
    // let list = this.state.game.recommendations;
    // let recommendations = allCareers.filter((item, pos) => { return careers.includes(item.id) });

    realm.write(() => {
      // realm.delete(this.state.game.recommendations);
      // this.state.game.step = 'RecommendationScreen';
      // list.push({ careerUuid: recommendations[0].id, careerName: recommendations[0].title, recommendation: 'យើងសង្ឈឹមថា ប្អូនៗបំពេញកម្រងសំណួរនេះឡើងវិញដោយពិចារណាយ៉ាងល្អិតល្អន់ និងអាចកំណត់ជ្រើសរើសមុខរបរមួយដែលខ្លួនពេញចិត្ត។ ក្នុងនាមយើងជាយុវជនម្នាក់ត្រូវមានភាពក្លាហានក្នុងការបង្កើតក្ដីសុបិន្តឲ្យបានធំទូលាយនិងវែងឆ្ងាយ ប្រសើរជាងបុគ្គលដែលរស់នៅដែលគ្មានគោលដៅច្បាស់លាស់។'});
      // list.push({ careerUuid: recommendations[1].id, careerName: recommendations[1].title, recommendation: 'យើងសង្ឈឹមថា ប្អូនៗបំពេញកម្រងសំណួរនេះឡើងវិញដោយពិចារណាយ៉ាងល្អិតល្អន់ និងអាចកំណត់ជ្រើសរើសមុខរបរមួយដែលខ្លួនពេញចិត្ត។ ក្នុងនាមយើងជាយុវជនម្នាក់ត្រូវមានភាពក្លាហានក្នុងការបង្កើតក្ដីសុបិន្តឲ្យបានធំទូលាយនិងវែងឆ្ងាយ ប្រសើរជាងបុគ្គលដែលរស់នៅដែលគ្មានគោលដៅច្បាស់លាស់។'});

      realm.create('Game', this._buildData('RecommendationScreen'), true);
      this.props.navigation.navigate('RecommendationScreen');
    });
  }

  _renderRadioGroups() {
    return(
      <View style={styles.box}>
        <Text style={styles.subTitle}>ចូរជ្រើសរើស មុខរបរតែមួយគត់ដែលអ្នកពេញចិត្តបំផុត</Text>

        <View style={{borderTopWidth: 1, borderTopColor: '#ccc', paddingVertical: 16}}>
          <RadioGroup
            style={{alignItems: 'flex-start'}}
            formVertical={true}
            options={this._formatDataForCheckbox(this.state.userCareers)}
            onPress={(text) => this.setState({ mostFavorableJob: text })}
            value={this.state.mostFavorableJob} >
          </RadioGroup>
        </View>
      </View>
    )
  }

  render() {
    return(
      <ThemeProvider uiTheme={{}}>
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <View style={{margin: 16, flex: 1}}>
              <View style={{flexDirection: 'row', marginVertical: 16}}>
                <MaterialIcon name='stars' color='#e94b35' size={24} style={{marginRight: 8}} />
                <Text>ចូរប្អូនជ្រើសរើស មុខរបរ ឬការងារ ១ដែលប្អូនចូលចិត្តបំផុត ដើម្បីដាក់គោលដៅ និងផែនការអនាគត!</Text>
              </View>

              { this._renderRadioGroups() }
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
