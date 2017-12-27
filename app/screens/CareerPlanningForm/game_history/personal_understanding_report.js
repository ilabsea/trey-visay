import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
  Icon,
} from 'react-native-material-ui';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';

import realm from '../../../schema';
import User from '../../../utils/user';

import headerStyles from '../../../assets/style_sheets/header';
import shareStyles from '../../../assets/style_sheets/profile_form';
import StatusBar from '../../../components/status_bar';

export default class PersonalUnderstandingReport extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'ស្វែងយល់អំពីខ្លួនឯង',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>ស្វែងយល់អំពីខ្លួនឯង</Text>,
      headerStyle: headerStyles.headerStyle,
      headerTintColor: '#fff'
    }
  };

  componentWillMount() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    let game = user.games.filtered('uuid=="' + this.props.navigation.state.params.gameUuid + '"')[0];

    this.state = {
      user: user,
      game: game,
    }
  }

  yesNoValue = { Yes: 'បាទ/ចាស', No: 'ទេ', Don_Know: 'មិនដឹង' };

  _renderQuestion1(personalUnderstanding) {
    if (!personalUnderstanding.areYouGoingToStudyTillGrade12) {
      return (null);
    }

    return (
      <View style={shareStyles.box}>
        <Text style={shareStyles.subTitle}>១) តើអ្នកនឹងបន្តការសិក្សារហូតដល់ថ្នាក់ទី១២ដែរឬទេ?</Text>
        <Divider style={{marginBottom: 8}}/>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AwesomeIcon name='check-circle' size={24} color='#4caf50' style={{marginRight: 8}} />
          <Text>{this.yesNoValue[personalUnderstanding.areYouGoingToStudyTillGrade12]}</Text>
        </View>
      </View>
    );
  }

  _renderQuestion2(personalUnderstanding) {
    if (!personalUnderstanding.areYourParentsAllowYouToStudyTillGrade12) {
      return (null);
    }

    return (
      <View style={shareStyles.box}>
        <Text style={shareStyles.subTitle}>២) តើឪពុកម្តាយរបស់ប្អូននឹងអនុញ្ញាតឲ្យប្អូនបន្តការសិក្សា រហូតដល់ថ្នាក់ទី១២ដែរឬទេ?</Text>
        <Divider style={{marginBottom: 8}}/>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AwesomeIcon name='check-circle' size={24} color='#4caf50' style={{marginRight: 8}} />
          <Text>{this.yesNoValue[personalUnderstanding.areYourParentsAllowYouToStudyTillGrade12]}</Text>
        </View>
      </View>
    );
  }

  _renderQuestion3(personalUnderstanding) {
    if (!personalUnderstanding.haveYouEverThoughtOfCareer) {
      return (null);
    }

    return (
      <View style={shareStyles.box}>
        <Text style={shareStyles.subTitle}>៣) តើប្អូនធ្លាប់គិតពីការងារមួយណាដែលប្អូនចង់ធ្វើក្រោយពេលបញ្ចប់ការសិក្សាដែរឬទេ?</Text>
        <Divider style={{marginBottom: 8}}/>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AwesomeIcon name='check-circle' size={24} color='#4caf50' style={{marginRight: 8}} />
          <Text>{this.yesNoValue[personalUnderstanding.haveYouEverThoughtOfCareer]}</Text>
        </View>

        <Text style={[shareStyles.subTitle, {marginTop: 12}]}>តើការងារនោះជាការងារអ្វី</Text>
        <Divider style={{marginBottom: 8}}/>
        <Text>{personalUnderstanding.careerName}</Text>

        <Text style={[shareStyles.subTitle, {marginTop: 12}]}>ចំពោះការងារដែលអ្នកបានជ្រើសរើសហើយ។​ តើអ្នកធ្វើដូចម្តេចដើម្បីឲ្យសម្រេចការងារដែលអ្នកជ្រើសរើសនោះ?</Text>
        <Divider style={{marginBottom: 8}}/>
        <Text>{personalUnderstanding.howToReachCarreerGoal}</Text>

        <Text style={[shareStyles.subTitle, {marginTop: 12}]}>តើឪពុកម្តាយអ្នកយល់ស្របជាមួយគំនិតរបស់អ្នកដែរឬទេ?</Text>
        <Divider style={{marginBottom: 8}}/>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AwesomeIcon name='check-circle' size={24} color='#4caf50' style={{marginRight: 8}} />
          <Text>{this.yesNoValue[personalUnderstanding.doesParentsAgreeWith]}</Text>
        </View>
      </View>
    );
  }

  _renderQuestion4(personalUnderstanding) {
    if (!personalUnderstanding.haveYouEverThoughtOfCareer) {
      return (null);
    }

    let arr = { 1: 'ឳពុកម្តាយ', 2: 'បងប្អូន', 3: 'ក្រុមប្រឹក្សាកុមារ', 4: 'នាយកសាលា', 5: 'គ្រូ', 6: 'មិត្តភក្តិ' };

    return (
      <View style={shareStyles.box}>
        <Text style={shareStyles.subTitle}>៤) តើអ្នកធ្លាប់និយាយជាមួយនរណាម្នាក់ពីការងារអនាគតរបស់អ្នកដែរឬទេ?</Text>
        { personalUnderstanding.everTalkedWithAnyoneAboutCareer.map((obj, i) => {
          return (
            <View key={i}>
              <Divider style={{marginBottom: 8}}/>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
                <AwesomeIcon name='check-circle' size={24} color='#4caf50' style={{marginRight: 8}} />
                <Text>{arr[obj.value]}</Text>
              </View>
            </View>
          )
        })}
      </View>
    );
  }

  _renderQuestion5(personalUnderstanding) {
    if (!personalUnderstanding.howToReachJobVacancy) {
      return (null);
    }

    return (
      <View style={shareStyles.box}>
        <Text style={shareStyles.subTitle}>៥) តើអ្នកអាចស្វែងរកការងារឬស្រាវជ្រាវរកមុខរបរតាមរយៈអ្វីខ្លះ?</Text>
        <Text>{personalUnderstanding.howToReachJobVacancy}</Text>
      </View>
    );
  }

  _renderQuestion6(personalUnderstanding) {
    if (!personalUnderstanding.whoToReachJobVacancy) {
      return (null);
    }

    return (
      <View style={shareStyles.box}>
        <Text style={shareStyles.subTitle}>៦) តើអ្នកអាចស្វែងរកការងារឬស្រាវជ្រាវរកមុខរបរតាមរយៈអ្នកណា?</Text>
        <Text>{personalUnderstanding.whoToReachJobVacancy}</Text>
      </View>
    );
  }

  _renderContent(obj, i) {
    return (
      <View key={i} style={{marginBottom: 20}}>
        <Text>ការស្វែងយល់អំពីខ្លួនឯងលើកទី { i + 1 }</Text>

        { this._renderQuestion1(obj) }
        { this._renderQuestion2(obj) }
        { this._renderQuestion3(obj) }
        { this._renderQuestion4(obj) }
        { this._renderQuestion5(obj) }
        { this._renderQuestion6(obj) }
      </View>
    )
  }

  render() {
    return (
      <ThemeProvider uiTheme={{}}>
        <View style={{flex: 1}}>
          <StatusBar />
          <ScrollView style={{flex: 1}}>
            <View style={{margin: 16, flex: 1}}>
              { this.state.game.personalUnderstandings.map((obj, i) => {
                { return (this._renderContent(obj, i)) }
              })}
            </View>
          </ScrollView>
        </View>
      </ThemeProvider>
    )
  }
}
