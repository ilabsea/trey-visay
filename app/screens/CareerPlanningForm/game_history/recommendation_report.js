import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  BackHandler,
} from 'react-native';

import {
  ThemeProvider,
  Icon,
} from 'react-native-material-ui';

import styles from '../../../assets/style_sheets/profile_form';
import headerStyles from '../../../assets/style_sheets/header';
import shareStyles from '../style';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import realm from '../../../schema';
import User from '../../../utils/user';
import subjectList from '../../../data/json/subject';
import characteristicList from '../../../data/json/characteristic_jobs';
import subjectTe from '../../../data/translates/subject';

let careers = [];

export default class RecommendationReport extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'ការណែនាំ',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>ការណែនាំ</Text>,
      headerStyle: headerStyles.headerStyle,
      headerTintColor: '#fff'
    }
  };

  componentWillMount() {
    this._initState();
  }

  _initState() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    let game = user.games[user.games.length - 1];
    let currentGroup = characteristicList.find((obj) => obj.id == game.characteristicId);
    let currentJob = currentGroup.careers.find((obj) => obj.id == game.mostFavorableJobId);

    this.state = {
      currentJob: currentJob,
      user: user,
      game: game,
      gameSubject: game.gameSubject,
      currentGroup: currentGroup,
    }
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
    this._handleSubmit();
  }

  _buildData() {
    let obj = Object.assign({}, this.state, {
      uuid: this.state.game.uuid,
      goalCareer: this.state.currentJob,
      step: 'GoalScreen'
    })

    return obj;
  }

  _handleSubmit() {
    realm.write(() => {
      this.state.game.step = 'GoalScreen';
      this.props.navigation.navigate('GoalScreen', {career: this.state.currentJob.name});
    });
  }

  _renderTip(code, tipType) {
    let subject = subjectList.find((obj) => obj.code == code);

    return (
      <View>
        { subject[tipType].map((tip, i) => {
          { return (<Text key={i} style={{marginLeft: 8}}>- {tip}</Text>) }
        })}
      </View>
    )
  }

  _renderSubjectToImproveTip(code, i) {
    return (
      <View key={i}>
        { this.state.gameSubject[code] != 'ខ្លាំង' &&
          <View>
            <Text style={[localStyle.paragraph, localStyle.boldText]}>{ subjectTe[code] }</Text>
            { this.state.gameSubject[code] == 'មធ្យម' && this._renderTip(code, 'medium_tips') }
            { this.state.gameSubject[code] == 'ខ្សោយ' && this._renderTip(code, 'poor_tips') }
          </View>
        }
      </View>
    )
  }

  _renderSubject() {
    return (
      <View>
        <Text style={[styles.subTitle, localStyle.paragraph]}>មុខវិជ្ជា</Text>
        <Text>ជា{this.state.currentJob.name} អ្នកគួរពូកែលើមុខវិជ្ជាដូចខាងក្រោម៖ </Text>
        <View>
          { this.state.currentGroup.concern_subjects.map((subject, i) => {
            return (<Text key={i} style={{marginLeft: 8}}>- {subject}</Text>)
          })}
        </View>

        <Text style={localStyle.paragraph}>ចម្លើយរបស់អ្នក</Text>
        <View>
          { this.state.currentGroup.concern_subject_codes.map((code, i) => {
            return (<Text key={i} style={{marginLeft: 8}}>- {subjectTe[code]} <Text style={localStyle.boldText}>({this.state.gameSubject[code]})</Text></Text>)
          })}
        </View>

        <Text style={localStyle.paragraph}>អ្នកអាចពង្រឹងបន្ថែមលើមុខវិជ្ជាសំខាន់ៗទាំងនោះតាមរយៈគន្លឹះខាងក្រោម៖</Text>
        { this.state.currentGroup.concern_subject_codes.map((code, i) => {
           { return (this._renderSubjectToImproveTip(code, i)) }
        })}
      </View>
    )
  }

  _renderCharacteristic() {
    return (
      <View>
        <Text style={[styles.subTitle, localStyle.paragraph]}>បុគ្គលិកលក្ខណៈ</Text>
        <Text>ជា{this.state.currentJob.name} អ្នកគួរមានបុគ្គលិកលក្ខណៈជាមនុស្ស៖</Text>
        <View>
          { this.state.currentGroup.concern_entries.map((character, i) => {
            return (<Text key={i} style={{marginLeft: 8}}>- {character}</Text>)
          })}
        </View>

        <Text style={localStyle.paragraph}>ចម្លើយរបស់អ្នក</Text>
        <View>
          { this.state.game.characteristicEntries.map((entry, i) => {
            return (<Text key={i} style={{marginLeft: 8}}>- {entry.value}</Text>)
          })}
        </View>

        <Text style={localStyle.paragraph}>
          បុគ្គលិកលក្ខណៈឆ្លុះបញ្ចាំងពីអត្តចរិករបស់មនុស្ស ដូចគ្នានេះដែរការងារនិមួយៗក៏ត្រូវការមនុស្សដែលមានបុគ្គលិកលក្ខណៈអោយស៊ីនឹងវាផងដែរ ទើបយើងបំពេញការងារនោះបានប្រសើរ និងរីកចម្រើនចំពោះខ្លួនឯង ដូចនេះសូម អ្នកផ្ទៀងផ្ទាត់ពីបុគ្គលិកលក្ខណៈរបស់ប្អូន ថាតើវាសាកសមសម្រាប់អ្នកហើយឬនៅ។
        </Text>
      </View>
    )
  }

  _renderContent() {
    return (
      <View style={styles.box}>
        <Text>
          {this.state.user.fullName}! អ្នកបានជ្រើសរើសមុខរបរដែលអ្នកចូលចិត្តបំផុតនោះគឺ
          <Text style={localStyle.boldText}> “{this.state.currentJob.name}” </Text>
          ដែលមុខរបរនេះជា
          <Text style={localStyle.boldText}> {this.state.currentGroup.career_title}។ </Text>
        </Text>

        <Text style={localStyle.paragraph}>{this.state.currentGroup.recommendation}</Text>
        <Text style={localStyle.paragraph}>ដូចនេះសូមអ្នកផ្ទៀងផ្ទាត់យ៉ាងលម្អិតរវាង ការវាយតម្លៃលើមុខវិជ្ជាដែលអ្នកបានរៀន និង បុគ្គលិកលក្ខណៈរបស់អ្នកជា មួយនឹងមុខរបរដែលអ្នកពេញចិត្តដូចខាងក្រោម៖</Text>

        { this._renderSubject() }
        { this._renderCharacteristic() }

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
                <Text>ចូរអានពត៌មានលំអិតអំពីអនុសាសន៍ខាងក្រោម៖</Text>
              </View>

              { this._renderContent() }
            </View>
          </ScrollView>
        </View>
      </ThemeProvider>
    );
  };
}

const localStyle = StyleSheet.create({
  boldText: {
    fontFamily: 'KantumruyBold',
  },
  paragraph: {
    marginTop: 16,
  }
});
