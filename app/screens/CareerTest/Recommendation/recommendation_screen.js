import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  BackHandler,
} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import BackConfirmDialog from '../../../components/shared/back_confirm_dialog';
import FooterBar from '../../../components/footer/FooterBar';

import mainStyles from '../../../assets/style_sheets/main/main';
import { Colors } from '../../../assets/style_sheets/main/colors';
import { FontSetting} from '../../../assets/style_sheets/font_setting';

import { NavigationActions } from 'react-navigation';

import realm from '../../../db/schema';
import User from '../../../utils/user';
import subjectList from '../../../data/json/subjects/subject_tips';
import characteristicList from '../../../data/json/characteristic_jobs';
import subjectTe from '../../../data/translates/subject';

import ScrollableHeader from '../../../components/scrollable_header';
import CloseButton from '../../../components/shared/close_button';

export default class RecommendationScreen extends Component {
  constructor(props) {
    super(props);

    this._initState();
    this._backHandler();
  }

  _initState() {
    let user = User.getCurrent();
    let game = user.games[user.games.length - 1];
    let currentGroup = characteristicList.find((obj) => obj.id == game.characteristicId);
    let currentJob = currentGroup.careers.find((obj) => obj.code == game.mostFavorableJobCode);

    this.state = {
      currentJob: currentJob,
      user: user,
      game: game,
      gameSubject: game.gameSubject,
      currentGroup: currentGroup,
    };

    this.props.navigation.setParams({
      _handleBack: this._handleBack.bind(this),
      goNext: this._goNext.bind(this)
    });
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

  _onYes() {
    this._closeDialog();
  }

  _closeDialog() {
    this.setState({confirmDialogVisible: false});
    this.props.navigation.reset([NavigationActions.navigate({ routeName: 'CareerCounsellorScreen' })])
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.game);
      this._closeDialog();
    });
  }

  _goNext() {
    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);

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

  _isStrongForAllSubject() {
    let arr = this.state.currentGroup.concern_subjects.filter((code) => this.state.gameSubject[code] == 'ខ្លាំង')
    return arr.length == this.state.currentGroup.concern_subjects.length;
  }

  _renderSubject() {
    return (
      <View>
        <View style={[mainStyles.blueTitleBox, {marginTop: 0}]}>
          <AwesomeIcon name='globe' color={Colors.blue} size={24} />
          <Text style={[mainStyles.title, { paddingLeft: 8 }]}>មុខវិជ្ជា</Text>
        </View>

        <View style={mainStyles.subTitleBox}>
          <Text style={ mainStyles.text }>ជា{this.state.currentJob.name} អ្នកគួរពូកែលើមុខវិជ្ជាដូចខាងក្រោម៖</Text>
          <View>
            { this.state.currentGroup.concern_subjects.map((code, i) => {
              return (<Text key={i} style={{marginLeft: 8}}>{`\u2022 ${subjectTe[code]}`}</Text>)
            })}
          </View>
        </View>

        <View style={mainStyles.blueTitleBox}>
          <AwesomeIcon name='globe' color={Colors.blue} size={24} />
          <Text style={[mainStyles.title, { paddingLeft: 8 }]}>ចម្លើយរបស់អ្នក</Text>
        </View>

        <View style={mainStyles.subTitleBox}>
          <View>
            { this.state.currentGroup.concern_subjects.map((code, i) => {
              return (<Text key={i} style={{marginLeft: 8}}>{`\u2022 ${subjectTe[code]}`} <Text style={localStyle.boldText}>({this.state.gameSubject[code]})</Text></Text>)
            })}
          </View>
        </View>

        { this._isStrongForAllSubject() &&
          <Text style={[localStyle.paragraph]}>សូមអបអរសាទរ ការជ្រើសរើសរបស់ប្អូនសាកសមទៅនឹងសមត្ថភាពរបស់ប្អូនហើយ។</Text>
        }

        { !this._isStrongForAllSubject() &&
          <View>
            <View style={mainStyles.blueTitleBox}>
              <AwesomeIcon name='globe' color={Colors.blue} size={24} />
              <Text style={[mainStyles.title, { paddingLeft: 8 }]}>អ្នកអាចពង្រឹងបន្ថែមលើមុខវិជ្ជាសំខាន់ៗទាំងនោះតាមរយៈគន្លឹះខាងក្រោម៖</Text>
            </View>
            <View style={mainStyles.subTitleBox}>
              { this.state.currentGroup.concern_subjects.map((code, i) => {
                 { return (this._renderSubjectToImproveTip(code, i)) }
              })}
            </View>
          </View>
        }
      </View>
    )
  }

  _renderCharacteristic() {
    return (
      <View>
        <View style={mainStyles.blueTitleBox}>
          <AwesomeIcon name='globe' color={Colors.blue} size={24} />
          <Text style={[mainStyles.title, { paddingLeft: 8 }]}>បុគ្គលិកលក្ខណៈ</Text>
        </View>

        <View style={mainStyles.subTitleBox}>
          <Text style={[mainStyles.title, { paddingLeft: 8 }]}>ជា{this.state.currentJob.name} អ្នកគួរមានបុគ្គលិកលក្ខណៈជាមនុស្ស៖</Text>
          <View>
            { this.state.currentGroup.concern_entries.map((character, i) => {
              return (<Text key={i} style={{marginLeft: 8}}>{`\u2022 ${character}`}</Text>)
            })}
          </View>
        </View>


        <View style={mainStyles.blueTitleBox}>
          <AwesomeIcon name='globe' color={Colors.blue} size={24} />
          <Text style={[mainStyles.title, { paddingLeft: 8 }]}>ចម្លើយរបស់អ្នក</Text>
        </View>

        <View style={mainStyles.subTitleBox}>
          <View>
            { this.state.game.characteristicEntries.map((entry, i) => {
              return (<Text key={i} style={{marginLeft: 8}}>{`\u2022 ${entry.value}`}</Text>)
            })}
          </View>
        </View>

        <Text style={[localStyle.paragraph, {paddingLeft: 20, paddingRight: 20}]}>
          បុគ្គលិកលក្ខណៈឆ្លុះបញ្ចាំងពីអត្តចរិករបស់មនុស្ស ដូចគ្នានេះដែរការងារនិមួយៗក៏ត្រូវការមនុស្សដែលមានបុគ្គលិកលក្ខណៈឲ្យស៊ីនឹងវាផងដែរ
          ទើបយើងបំពេញការងារនោះបានប្រសើរ និងរីកចម្រើនចំពោះខ្លួនឯង ដូចនេះសូម អ្នកផ្ទៀងផ្ទាត់ពីបុគ្គលិកលក្ខណៈរបស់ប្អូន ថាតើវាសាកសមសម្រាប់អ្នកហើយឬនៅ។
        </Text>
      </View>
    )
  }

  _renderContent = () => {
    return (
      <View>
        <View style={{padding: 20}}>
          <Text style={localStyle.bigText}>សួស្តី {this.state.user.fullName}</Text>
          <Text style={localStyle.boldText}>
            អ្នកបានជ្រើសរើសមុខរបរដែលអ្នកចូលចិត្តបំផុតនោះគឺ “{this.state.currentJob.name}” ដែលមុខរបរនេះជា
            {this.state.currentGroup.career_title}។
          </Text>
          <Text style={localStyle.paragraph}>{this.state.currentGroup.recommendation}</Text>
        </View>

        <View style={[mainStyles.blueTitleBox, {marginTop: 0}]}>
          <AwesomeIcon name='globe' color={Colors.blue} size={24} />
          <Text style={[mainStyles.title, { paddingLeft: 8 }]}>បញ្ជាក់៖</Text>
        </View>
        <View style={mainStyles.subTitleBox}>
          <Text style={ mainStyles.text }>សិស្សានុសិស្សត្រូវប្រឡងជាប់ថ្នាក់ទី ១២ និងរៀនឲ្យពូកែ ទើបអាចសម្រេចបានគោលបំណង ឬគោលដៅ ។</Text>
        </View>
        <Text style={[localStyle.paragraph, { paddingLeft: 20, paddingRight: 20 }]}>
          ដូចនេះសូមអ្នកផ្ទៀងផ្ទាត់យ៉ាងលម្អិតរវាង ការវាយតម្លៃលើមុខវិជ្ជាដែលអ្នកបានរៀន និង បុគ្គលិកលក្ខណៈរបស់អ្នកជា មួយនឹងមុខរបរដែលអ្នកពេញចិត្តដូចខាងក្រោម៖
        </Text>

        { this._renderSubject() }
        { this._renderCharacteristic() }

      </View>
    )
  }

  render() {
    let title = 'ការផ្តល់អនុសាសន៍';

    return (
      <View style={{flex: 1}}>
        <ScrollableHeader
          renderContent={ this._renderContent }
          renderNavigation={ () => <CloseButton navigation={this.props.navigation}/> }
          title={title}
          largeTitle={title}
        />

        <FooterBar icon='keyboard-arrow-right' text='បន្តទៀត' onPress={this._goNext.bind(this)} />

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
      </View>
    )
  };
}

const localStyle = StyleSheet.create({
  bigText: {
    fontSize: FontSetting.big_title
  },
  boldText: {
    fontWeight: 'bold'
  },
  paragraph: {
    marginTop: 16,
  },
  highlightBlue: {
    fontWeight: 'bold',
    color: '#1976d2'
  }
});
