import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import mainStyles from '../../assets/style_sheets/main/main';
import { Colors } from '../../assets/style_sheets/main/colors';
import { FontSetting } from '../../assets/style_sheets/font_setting';

import subjectList from '../../data/json/subjects/subject_tips';
import subjectTe from '../../data/translates/subject';
import Text from '../../components/Text';

class Recommendation extends Component {
  state = { showMore: false };

  renderImprovingTip(code, i) {
    let tipType = this.props.gameSubject[code] == 'មធ្យម' ? 'medium_tips' : 'poor_tips';
    let subject = subjectList.find((obj) => obj.code == code);

    return (
      <View style={{marginBottom: 16}} key={i}>
        <Text style={[styles.boldText]}>{ subjectTe[code] }</Text>

        { subject[tipType].map((tip, i) => <Text key={i} style={{marginLeft: 8}}> - {tip}</Text>) }
      </View>
    )
  }

  isStrongForAllSubject() {
    let arr = this.props.currentGroup.concern_subjects.filter((code) => this.props.gameSubject[code] == 'ខ្លាំង')
    return arr.length == this.props.currentGroup.concern_subjects.length;
  }

  _getTextColorStyle(value) {
    switch (value) {
      case 'ខ្លាំង':
        style = {color: Colors.blue}
        break;
      case 'មធ្យម':
        style = {color: Colors.orange}
        break;
      default:
        style = {color: Colors.red}
    }

    return style;
  }

  renderSubjectTip() {
    let arr = this.props.currentGroup.concern_subjects.filter(code => this.props.gameSubject[code] != 'ខ្លាំង');
    let doms1 = arr.slice(0,1).map((code, i) => this.renderImprovingTip(code, i));
    let doms2 = arr.slice(1).map((code, i) => this.renderImprovingTip(code, i));

    if (doms2.length) {
      doms1.push(
        <View key={arr.length}>
          { !this.state.showMore &&
            <Text style={{color: Colors.blue}} onPress={() => this.setState({showMore: true})}>...អានបន្ថែម</Text>
          }

          { this.state.showMore &&
            <View>
              {doms2}
              <Text style={{color: Colors.blue}} onPress={() => this.setState({showMore: false})}>បង្ហាញតិច</Text>
            </View>
          }
        </View>
      );
    }

    return (
      <View>
        { this.isStrongForAllSubject() &&
          <Text style={[styles.paragraph]}>សូមអបអរសាទរ ការជ្រើសរើសរបស់ប្អូនស័ក្តិសមទៅនឹងសមត្ថភាពរបស់ប្អូនហើយ។</Text>
        }

        { !this.isStrongForAllSubject() &&
          <View>
            <View style={mainStyles.blueTitleBox}>
              <AwesomeIcon name='globe' color={Colors.blue} size={24} />
              <Text style={[mainStyles.title, { paddingLeft: 8 }]}>
                គន្លឹះសម្រាប់ពង្រឹងបន្ថែមលើមុខវិជ្ជា
              </Text>
            </View>

            <View style={mainStyles.subTitleBox}>
              {doms1}
            </View>
          </View>
        }
      </View>
    )
  }

  renderSubject(){
    let currentJob = this.props.currentJob;
    let currentGroup = this.props.currentGroup;
    let gameSubject = this.props.gameSubject;

    return(
      <View>
        <View style={[mainStyles.blueTitleBox, {marginTop: 0}]}>
          <AwesomeIcon name='globe' color={Colors.blue} size={24} />
          <Text style={[mainStyles.title, { paddingLeft: 8 }]}>មុខវិជ្ជា</Text>
        </View>

        <View style={mainStyles.subTitleBox}>
          <View style={{flexDirection: 'row'}}>
            <Text style={ [mainStyles.text, {flex:1}] }>
              មុខវិជ្ជាតម្រង់ទិស
            </Text>

            <Text style={ [mainStyles.text, {flex:1, textAlign: 'right'}] }>
              ចម្លើយរបស់អ្នក
            </Text>
          </View>

          <View>
            { currentGroup.concern_subjects.map((code, i) => {
              return (
                <View key={i} style={styles.wrapper}>
                  <Text style={{flex: 1}}>{ `\u2022 ${subjectTe[code]}` }</Text>
                  <View style={styles.rightWrapper}>
                    <Text style={this._getTextColorStyle(gameSubject[code])}>{ gameSubject[code] }</Text>
                  </View>
                </View>)
            })}
          </View>
        </View>
      </View>
    )
  }

  renderCharacteristic(){
    return(
      <View>
        <View style={mainStyles.blueTitleBox}>
          <AwesomeIcon name='globe' color={Colors.blue} size={24} />
          <Text style={[mainStyles.title, { paddingLeft: 8 }]}>បុគ្គលិកលក្ខណៈ</Text>
        </View>

        <View style={mainStyles.subTitleBox}>
          <Text style={[{ paddingLeft: 8 }]}>ជា{this.props.currentJob.name} អ្នកគួរមានបុគ្គលិកលក្ខណៈជាមនុស្ស៖</Text>
          <View>
            { this.props.currentGroup.concern_entries.map((character, i) => {
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
            { this.props.game.characteristicEntries.map((entry, i) => {
              return (<Text key={i} style={{marginLeft: 8}}>{`\u2022 ${entry.value}`}</Text>)
            })}
          </View>
        </View>

        <Text style={[styles.paragraph, {paddingLeft: 20, paddingRight: 20}]}>
          បុគ្គលិកលក្ខណៈឆ្លុះបញ្ចាំងពីអត្តចរិករបស់មនុស្ស ដូចគ្នានេះដែរការងារនិមួយៗក៏ត្រូវការមនុស្សដែលមានបុគ្គលិកលក្ខណៈឱ្យស៊ីនឹងវាផងដែរ
          ទើបយើងបំពេញការងារនោះបានប្រសើរនិង រីកចម្រើនចំពោះខ្លួនឯង ដូចនេះសូមអ្នកផ្ទៀងផ្ទាត់ពីបុគ្គលិក លក្ខណៈរបស់ប្អូន ថាតើវាស័ក្តិសមសម្រាប់អ្នកហើយឬនៅ។
        </Text>
      </View>
    )
  }

  render(){
    let user = this.props.user;
    let currentJob = this.props.currentJob;
    let currentGroup = this.props.currentGroup;
    return (
      <View style={{paddingBottom: 20}}>
        <View style={{padding: 20}}>
          <Text style={styles.bigText}>សួស្តី {user.fullName}</Text>
          <Text variant="titleMedium">
            អ្នកបានជ្រើសរើសមុខរបរដែលអ្នកចូលចិត្តបំផុតនោះគឺ “{currentJob.name}” ដែលមុខរបរនេះជា
            {currentGroup.career_title}។
          </Text>
          <Text style={styles.paragraph}>{currentGroup.recommendation}</Text>
        </View>

        <View style={[mainStyles.blueTitleBox, {marginTop: 0}]}>
          <AwesomeIcon name='globe' color={Colors.blue} size={24} />
          <Text style={[mainStyles.title, { paddingLeft: 8 }]}>បញ្ជាក់៖</Text>
        </View>
        <View style={mainStyles.subTitleBox}>
          <Text style={ mainStyles.text }>ប្អូនត្រូវប្រឡងជាប់ថ្នាក់ទី ១២ និងរៀនឱ្យពូកែទើបអាចសម្រេចបានគោលបំណង ឬគោលដៅ។</Text>
        </View>
        <Text style={[styles.paragraph, { paddingLeft: 20, paddingRight: 20 }]}>
          ដូចនេះសូមអ្នកផ្ទៀងផ្ទាត់យ៉ាងលម្អិតរវាងការវាយតម្លៃលើមុខវិជ្ជាដែលអ្នកបានរៀន និងបុគ្គលិកលក្ខណៈរបស់អ្នកជា មួយនឹងមុខរបរដែលអ្នកពេញចិត្តដូចខាងក្រោម៖
        </Text>

        { this.renderSubject() }
        { this.renderSubjectTip() }
        { this.renderCharacteristic() }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  bigText: {
    fontSize: FontSetting.big_title
  },
  boldText: {
    // fontWeight: 'bold'
  },
  paragraph: {
    marginTop: 16,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  rightWrapper: {
    paddingRight: 10,
    width: 65
  }
});

export default Recommendation;
