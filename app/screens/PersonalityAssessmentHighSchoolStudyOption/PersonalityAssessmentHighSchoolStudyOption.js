import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View
} from 'react-native';

import characteristicList from '../../data/json/characteristic_jobs';
import subjectTe from '../../data/translates/subject';
import translate from '../../data/translates/km';
import personalityCatgoryList from '../../data/json/personality_category';
import personalityList from '../../data/json/personality';

import { Container, Content, ListItem, Left, Body, Icon, Right, Card, CardItem } from 'native-base';
import ScrollableHeader from '../../components/scrollable_header';
import BackButton from '../../components/shared/back_button';
import styles from '../../assets/style_sheets/assessment';
import { Colors } from '../../assets/style_sheets/main/colors';
import ButtonList from '../../components/list/button_list';
import Text from '../../components/Text';

export default class PersonalityAssessmentHighSchoolStudyOption extends Component {
  constructor(props) {
    super(props);

    this._initState();
  }

  _initState() {
    let category = this.props.route.params.category;
    let id = category.group == 'science' ? 1 : 3;
    let currentGroup = characteristicList.find((obj) => obj.id == id);
    let assessment = this.props.route.params.assessment;

    this.state = {
      currentGroup: currentGroup,
      assessment: assessment,
      category: category,
      categoryGroupLabel: translate[category.group]
    };
  }

  _renderSubjectToImproveTip(code, i) {
    return (
      <ButtonList
        key={i}
        onPress={() => this.props.navigation.navigate('PersonalityAssessmentSubjectTipScreen', {subjectCode: code})}
        title={subjectTe[code]}
        hasLine={true}/>
    )
  }

  _renderSubject() {
    return (
      <Card style={styles.curveBox}>
        <CardItem header bordered style={styles.header}>
          <Text style={[styles.highlightBlue]}>អ្នកអាចពង្រឹងបន្ថែមលើមុខវិជ្ជាសំខាន់ៗទាំងនោះតាមរយៈគន្លឹះខាងក្រោម៖</Text>
        </CardItem>

        { this.state.currentGroup.concern_subjects.map((code, i) => {
           { return (this._renderSubjectToImproveTip(code, i)) }
        })}
      </Card>
    )
  }

  _renderCharacteristic() {
    let personalities = personalityCatgoryList.filter(item => item.group == this.state.category.group).map(item => this.state.assessment[item.name_en].map(x => x.value));
    personalities = [].concat.apply([], personalities);
    let list = personalityList.filter(item => personalities.includes(item.code));

    return (
      <View>
        <Card style={styles.curveBox}>
          <CardItem header bordered style={styles.header}>
            <Text style={[styles.highlightBlue]}>បុគ្គលិកលក្ខណៈសម្រាប់ថ្នាក់{this.state.categoryGroupLabel}</Text>
          </CardItem>

          <CardItem bordered>
            <Body>
              { this.state.currentGroup.concern_entries.map((character, i) => {
                return (<Text key={i} style={{marginLeft: 8}}>{`\u2022 ${character}`}</Text>)
              })}
            </Body>
          </CardItem>
        </Card>

        <Card style={styles.curveBox}>
          <CardItem header bordered style={styles.header}>
            <Text style={[styles.highlightBlue]}>ចម្លើយរបស់អ្នកសម្រាប់ថ្នាក់{this.state.categoryGroupLabel}</Text>
          </CardItem>

          <CardItem bordered>
            <Body>
              { list.map((entry, i) => {
                return (<Text key={i} style={{marginLeft: 8}}>{`\u2022 ${entry.name_km}`}</Text>)
              })}
              { !list.length && <Text style={{color: Colors.red}}>មិនមាន</Text> }
            </Body>
          </CardItem>

        </Card>

        <Card style={styles.curveBox}>
          <CardItem bordered>
            <Body>
              <Text>បុគ្គលិកលក្ខណៈឆ្លុះបញ្ចាំងពីអត្តចរិករបស់មនុស្ស ដូចគ្នានេះដែរការងារនិមួយៗក៏ត្រូវការមនុស្សដែលមានបុគ្គលិកលក្ខណៈឱ្យស៊ីនឹងវាផងដែរ ទើបយើងបំពេញការងារនោះបានប្រសើរ និងរីកចម្រើនចំពោះខ្លួនឯង ដូចនេះសូម អ្នកផ្ទៀងផ្ទាត់ពីបុគ្គលិកលក្ខណៈរបស់ប្អូន ថាតើវាស័ក្តិសមសម្រាប់អ្នកហើយឬនៅ។</Text>
            </Body>
          </CardItem>
        </Card>
      </View>
    );
  }

  _renderContent = () => {
    return (
      <Content style={{paddingHorizontal: 20, paddingVertical: 16}}>
        <Text>អ្នកដែលស្ថិតក្នុងក្រុមមនុស្សដែលមានប្រភេទបុគ្គលិកលក្ខណៈបែប{this.state.category.name_km} គួរជ្រើសយកការសិក្សាក្នុងថ្នាក់{this.state.categoryGroupLabel}</Text>

        { this._renderSubject() }
        { this._renderCharacteristic() }
      </Content>
    )
  }

  render() {
    return (
      <ScrollView>
        { this._renderContent() }
      </ScrollView>
    )
  };
}
