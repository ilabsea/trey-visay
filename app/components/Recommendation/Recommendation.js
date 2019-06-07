import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import mainStyles from '../../assets/style_sheets/main/main';
import { Colors } from '../../assets/style_sheets/main/colors';
import { FontSetting} from '../../assets/style_sheets/font_setting';

import subjectList from '../../data/json/subjects/subject_tips';
import subjectTe from '../../data/translates/subject';

class Recommendation extends Component {
  constructor(props){
    super(props);
  }

  renderTip(code, tipType) {
    let subject = subjectList.find((obj) => obj.code == code);

    return (
      <View>
        { subject[tipType].map((tip, i) => {
          { return (<Text key={i} style={{marginLeft: 8}}>- {tip}</Text>) }
        })}
      </View>
    )
  }

  renderSubjectToImproveTip(code, i) {
    return (
      <View key={i}>
        { this.props.gameSubject[code] != 'ខ្លាំង' &&
          <View>
            <Text style={[styles.paragraph, styles.boldText]}>{ subjectTe[code] }</Text>
            { this.props.gameSubject[code] == 'មធ្យម' && this.renderTip(code, 'medium_tips') }
            { this.props.gameSubject[code] == 'ខ្សោយ' && this.renderTip(code, 'poor_tips') }
          </View>
        }
      </View>
    )
  }

  isStrongForAllSubject() {
    let arr = this.props.currentGroup.concern_subjects.filter((code) => this.props.gameSubject[code] == 'ខ្លាំង')
    return arr.length == this.props.currentGroup.concern_subjects.length;
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
          <Text style={ mainStyles.text }>
            ជា{currentJob.name} អ្នកគួរពូកែលើមុខវិជ្ជាដូចខាងក្រោម៖
          </Text>
          <View>
            { currentGroup.concern_subjects.map((code, i) => {
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
            { currentGroup.concern_subjects.map((code, i) => {
              return (
                <View key={i} style={styles.wrapper}>
                  <Text style={{marginLeft: 8}}>{ `\u2022 ${subjectTe[code]}` }</Text>
                  <View style={styles.rightWrapper}>
                    <Text style={styles.rightText}>{ gameSubject[code] }</Text>
                  </View>

                </View>)
            })}
          </View>
        </View>

        { this.isStrongForAllSubject() &&
          <Text style={[styles.paragraph]}>សូមអបអរសាទរ ការជ្រើសរើសរបស់ប្អូនសាកសមទៅនឹងសមត្ថភាពរបស់ប្អូនហើយ។</Text>
        }

        { !this.isStrongForAllSubject() &&
          <View>
            <View style={mainStyles.blueTitleBox}>
              <AwesomeIcon name='globe' color={Colors.blue} size={24} />
              <Text style={[mainStyles.title, { paddingLeft: 8 }]}>
                អ្នកអាចពង្រឹងបន្ថែមលើមុខវិជ្ជាសំខាន់ៗទាំងនោះតាមរយៈគន្លឹះខាងក្រោម៖
              </Text>
            </View>
            <View style={mainStyles.subTitleBox}>
              { currentGroup.concern_subjects.map((code, i) => {
                 { return (this.renderSubjectToImproveTip(code, i)) }
              })}
            </View>
          </View>
        }
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
          <Text style={[mainStyles.title, { paddingLeft: 8 }]}>ជា{this.props.currentJob.name} អ្នកគួរមានបុគ្គលិកលក្ខណៈជាមនុស្ស៖</Text>
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
          បុគ្គលិកលក្ខណៈឆ្លុះបញ្ចាំងពីអត្តចរិករបស់មនុស្ស ដូចគ្នានេះដែរការងារនិមួយៗក៏ត្រូវការមនុស្សដែលមានបុគ្គលិកលក្ខណៈឲ្យស៊ីនឹងវាផងដែរ
          ទើបយើងបំពេញការងារនោះបានប្រសើរ និងរីកចម្រើនចំពោះខ្លួនឯង ដូចនេះសូម អ្នកផ្ទៀងផ្ទាត់ពីបុគ្គលិកលក្ខណៈរបស់ប្អូន ថាតើវាសាកសមសម្រាប់អ្នកហើយឬនៅ។
        </Text>
      </View>
    )
  }

  render(){
    let user = this.props.user;
    let currentJob = this.props.currentJob;
    let currentGroup = this.props.currentGroup;
    return (
      <View>
        <View style={{padding: 20}}>
          <Text style={styles.bigText}>សួស្តី {user.fullName}</Text>
          <Text style={styles.boldText}>
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
          <Text style={ mainStyles.text }>សិស្សានុសិស្សត្រូវប្រឡងជាប់ថ្នាក់ទី ១២ និងរៀនឲ្យពូកែ ទើបអាចសម្រេចបានគោលបំណង ឬគោលដៅ ។</Text>
        </View>
        <Text style={[styles.paragraph, { paddingLeft: 20, paddingRight: 20 }]}>
          ដូចនេះសូមអ្នកផ្ទៀងផ្ទាត់យ៉ាងលម្អិតរវាង ការវាយតម្លៃលើមុខវិជ្ជាដែលអ្នកបានរៀន និង បុគ្គលិកលក្ខណៈរបស់អ្នកជា មួយនឹងមុខរបរដែលអ្នកពេញចិត្តដូចខាងក្រោម៖
        </Text>

        { this.renderSubject() }
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
    fontWeight: 'bold'
  },
  paragraph: {
    marginTop: 16,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 16,
    justifyContent: 'space-between',
  },
  rightWrapper: {
    backgroundColor: Colors.blue,
    padding: 10,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 8,
    width: 65
  },
  rightText: {
    textAlign: 'center',
    color: '#fff'
  }
});

export default Recommendation;
