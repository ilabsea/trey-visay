import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import realm from '../../db/schema';
import User from '../../utils/user';
import subjectList from '../../data/json/subjects/subjects';
import characteristicList from '../../data/json/characteristic_jobs';
import subjectTe from '../../data/translates/subject';
import translate from '../../data/translates/km';
import personalityCatgoryList from '../../data/json/personality_category';
import personalityList from '../../data/json/personality';

import { Container, Content, ListItem, Left, Body, Icon, Right, Card, CardItem } from 'native-base';

export default class PersonalityAssessmentHighSchoolStudyOption extends Component {
  constructor(props) {
    super(props);

    this._initState();
  }

  _initState() {
    let category = this.props.navigation.getParam('category');
    let id = category.group == 'science' ? 1 : 3;
    let currentGroup = characteristicList.find((obj) => obj.id == id);
    let assessment = this.props.navigation.getParam('assessment');

    this.state = {
      currentGroup: currentGroup,
      assessment: assessment,
      category: category,
      categoryGroupLabel: translate[category.group]
    };
  }

  _renderSubjectToImproveTip(code, i) {
    return (
      <CardItem
        key={i}
        bordered
        button
        onPress={() => this.props.navigation.navigate('PersonalityAssessmentSubjectTipScreen', {subjectCode: code})}
      >
        <Body>
          <Text>{ subjectTe[code] }</Text>
        </Body>

        <Right>
          <AwesomeIcon name='angle-right' size={24} color='#bbb' />
        </Right>
      </CardItem>
    );
  }

  _renderSubject() {
    return (
      <Card>
        <CardItem header bordered>
          <Text style={[localStyle.highlightBlue]}>អ្នកអាចពង្រឹងបន្ថែមលើមុខវិជ្ជាសំខាន់ៗទាំងនោះតាមរយៈគន្លឹះខាងក្រោម៖</Text>
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
      <Card>
        <CardItem header bordered>
          <Text style={[localStyle.highlightBlue]}>បុគ្គលិកលក្ខណៈសម្រាប់ថ្នាក់{this.state.categoryGroupLabel}</Text>
        </CardItem>

        <CardItem bordered>
          <Body>
            { this.state.currentGroup.concern_entries.map((character, i) => {
              return (<Text key={i} style={{marginLeft: 8}}>{`\u2022 ${character}`}</Text>)
            })}
          </Body>
        </CardItem>

        <CardItem header bordered>
          <Text style={[localStyle.highlightBlue]}>ចម្លើយរបស់អ្នកសម្រាប់ថ្នាក់{this.state.categoryGroupLabel}</Text>
        </CardItem>

        <CardItem bordered>
          <Body>
            { list.map((entry, i) => {
              return (<Text key={i} style={{marginLeft: 8}}>{`\u2022 ${entry.name_km}`}</Text>)
            })}
          </Body>
        </CardItem>

        <CardItem bordered>
          <Body>
            <Text>បុគ្គលិកលក្ខណៈឆ្លុះបញ្ចាំងពីអត្តចរិករបស់មនុស្ស ដូចគ្នានេះដែរការងារនិមួយៗក៏ត្រូវការមនុស្សដែលមានបុគ្គលិកលក្ខណៈឲ្យស៊ីនឹងវាផងដែរ ទើបយើងបំពេញការងារនោះបានប្រសើរ និងរីកចម្រើនចំពោះខ្លួនឯង ដូចនេះសូម អ្នកផ្ទៀងផ្ទាត់ពីបុគ្គលិកលក្ខណៈរបស់ប្អូន ថាតើវាសាកសមសម្រាប់អ្នកហើយឬនៅ។</Text>
          </Body>
        </CardItem>

      </Card>
    );
  }

  _renderContent() {
    return (
      <View>
        <Card>
          <CardItem>
            <Body>
              <Text>អ្នកដែលស្ថិតក្នុងក្រុមមនុស្សដែលមានប្រភេទបុគ្គលិកលក្ខណៈបែប{this.state.category.name_km} គួរជ្រើសយកការសិក្សាក្នុងថ្នាក់{this.state.categoryGroupLabel}</Text>
            </Body>
          </CardItem>
        </Card>

        { this._renderSubject() }
        { this._renderCharacteristic() }
      </View>
    )
  }

  render() {
    return(
      <Container>
        <Content padder>
          { this._renderContent() }
        </Content>
      </Container>
    );
  };
}

const localStyle = StyleSheet.create({
  highlightBlue: {
    color: '#1976d2'
  }
});
