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
import CheckboxGroup from '../../components/checkbox_group';
import MathUtil from '../../utils/math';

import realm from '../../schema';
import User from '../../utils/user';
import personalityJobs from '../../data/json/personality_jobs';
import characteristicList from '../../data/json/characteristic_jobs';

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
    }
  };

  state = {
    jobs: [],
    currentGroup: '',
    confirmDialogVisible: false,
    user: '',
    game: '',
    careers0: [],
    careers1: [],
    careers2: [],
    personalities: MathUtil.shuffle(["ស្មោះត្រង់", "មានទំនាក់ទំនងល្អជាមួយនឹងក្រុមការងារ", "ស្រាវជ្រាវ ", "ឯករាជ្យ", "មហិច្ឆតា", "មានទំនុកចិត្ត", "មានផែនការ និងគៅដៅច្បាស់លាស់", "ហ្មត់ចត់នឹងការងារ", "មានទេពកោសល្យ", "មានចម្ងល់ជារឿយ", "មានទំនួលខុសត្រូវ", "គិតស៊ីជំរៅ  និងមានហេតុផល", "ប្រាកដប្រជា", "ជាបុគ្គលឆ្នើម", "មានស្មារតីប្រុងប្រយត្ន័", "មានភាពជាអ្នកដឹកនាំ និងគ្រប់គ្រង", "អនុវត្តន៍ការងារជាក់ស្តែង", "គ្រប់គ្រងពេលវេលា​បានល្អ", "មានក្រមវិន័យល្អ", "មានឆន្ទៈ", "ឆ្លាត", "ចូលចិត្តវិទ្យាសាស្រ្ត", "មានគំនិតច្នៃប្រឌិត", "ចូលចិត្តធ្វើការជាមួយ នឹងបច្ចេកវិទ្យា និង គ្រឿងម៉ាស៊ីន", "មានដំណោះស្រាយល្អ", "ពូកែចរចារ", "ចេះសម្របខ្លួនតាមស្ថានភាពជាក់ស្ដែង", "អត់ធ្មត់", "ពូកែសម្របសម្រួល", "ចូលចិត្តធ្វើការជាមួយមនុស្ស", "ស្លូតបូត និងសុភាពរាបសារ", "ជួយផ្ដល់យោបល់ឲ្យអ្នកដទៃ", "ចូលចិត្តទទួលការរិៈគន់ក្នុងន័យស្ថាបនា", "ចេះចែករំលែកបទពិសោធន៍ការងារ និងចំណេះដឹង", "មានប្រាស្រ័យល្អក្នុងសហគមន៍", "រួសរាយរាក់ទាក់"]),
    selectedPersonalities: [],
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
      let obj = { jobs: game.personalityCareers.map((obj)=> obj.value) };

      for(let i=0; i<3; i++) {
        obj['careers' + i] = personalityJobs[i].careers.filter(career => obj.jobs.includes(career.id));
      }

      this.setState(obj);
    }

    this.setState({user: user, game: game});
  }

  _onYes() {
    realm.write(() => {
      realm.create('Game', this._buildData('PersonalityScreen'), true);

      this.setState({confirmDialogVisible: false});
      // this.props.navigation.goBack();
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

  _handleSetEachCareers(jobs) {
    let careers = {};
    careers['careers' + this.state.currentGroup] = personalityJobs[this.state.currentGroup].careers.filter(obj => jobs.includes(obj.id));
    this.setState(careers);
  }

  refreshState(jobs) {
    group['group' + this.state.currentGroup] = jobs
    this._handleSetEachCareers(jobs);
    this._refreshTotalJobs();
  }

  _refreshTotalJobs() {
    let arr = [];

    for (i = 0; i < 3; i++) {
      arr = arr.concat(group['group' + i]);
    }

    this.setState({jobs: arr});
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
    if (this.state.selectedPersonalities.length < 5) {
      return alert('Please select characteristic at least 5!');
    }

    let arr = [];

    characteristicList.map((obj, i) => {
      let arr1 = obj.entries;
      let arr2 = this.state.selectedPersonalities;
      let matchEntries = arr1.filter((n) => arr2.includes(n));

      arr.push({id: i+1, score: matchEntries.length});
    })

    let max = MathUtil.findMaxObjBy(arr, 'score');
    let title = characteristicList.find((obj) => obj.id == max.id).careeer_title
    this._goToPersonalityJobsScreen(max.id, title);

    // this._handleSubmit();
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

  _formatDataForCheckbox(personalities) {
    let arr = [];

    for(let i = 0; i < personalities.length; i++) {
      arr.push({ value: personalities[i], label: personalities[i] })
    }
    return arr;
  }

  _handleChecked(arr) {
    this.setState({selectedPersonalities: arr});
  }

  _renderPersonalities() {

    let checkboxes = this._formatDataForCheckbox(this.state.personalities);

    return(
      <View style={styles.box}>
        <Text style={styles.subTitle}>ចូរប្អូនជ្រើសរើស បុគ្គលិកលក្ខណៈខាងក្រោមឲ្យបានយ៉ាងតិចចំនួន៥ ដែលសមស្របទៅនឹងលក្ខណៈសម្បត្តិរបស់ប្អូនផ្ទាល់ និងអាចជួយប្អូនក្នុងការជ្រើសរើស អាជីពមួយជាក់លាក់នាពេលអនាគត។ </Text>

        <View>
          <CheckboxGroup
            onSelect={(selected) => {this._handleChecked(selected)}}
            items={checkboxes}
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

  // _renderPersonality(groupNumber) {
  //   let group = personalityJobs[groupNumber];
  //   let title = group.text;
  //   let description = group.description;

  //   return (
  //     <TouchableOpacity
  //       onPress={() => this._goToPersonalityJobsScreen(groupNumber, title)}
  //       style={[styles.box, {marginBottom: 0, borderBottomWidth: 0.5, borderColor: '#ccc'}]}>

  //       <View style={{flexDirection: 'row'}}>
  //         <View>
  //           <Image source={Images[group.logoName]} style={{width: 80, height: 80, marginRight: 16}} />
  //         </View>

  //         <View style={{flex: 1}}>
  //           <View style={{flexDirection: 'row', alignItems: 'center'}}>
  //             <Text style={[styles.subTitle, {flex: 1}]}>{title}</Text>
  //             <AwesomeIcon name='angle-right' size={24} color='#bbb' />
  //           </View>
  //           <Text style={{paddingRight: 16}}>{description}</Text>
  //           <View style={{flexDirection: 'row', marginTop: 8}}>
  //             {this.state['careers' + groupNumber].map((career, i) => {
  //               { return (<Text key={i} style={shareStyles.tagLabel}>{career.title}</Text>) }
  //             })}
  //           </View>
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //   )
  // }

  _goToPersonalityJobsScreen(groupNumber, title) {
    this.setState({currentGroup: groupNumber})
    this.props.navigation.navigate('PersonalityJobsScreen', { title: title, groupNumber: groupNumber, refresh: this.refreshState.bind(this), selectedCareers: this.state.jobs})
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

              { this._renderPersonalities() }
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
