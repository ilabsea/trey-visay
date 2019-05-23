import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Text
} from 'react-native';

// import Button from '../../components/shared/button';
import StatusBar from '../../components/shared/status_bar';
import formStyles from '../../assets/style_sheets/login_form';
import styles from '../../assets/style_sheets/assessment';

import realm from '../../db/schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';
import { longDateFormat } from '../../utils/date';
import { Container, Header, Content, ListItem, Thumbnail, Left, Body, Right, Icon, Card, CardItem, Title, Button } from 'native-base';

import ScrollableHeader from '../../components/scrollable_header';
import BackButton from '../../components/shared/back_button';

export default class PersonalityAssessment extends Component {
  constructor(props) {
    super(props);

    let assessments = realm.objects('PersonalityAssessment').filtered('userUuid="' + User.getID() +'"');
    let assessment = assessments[assessments.length-1];
    let completedAssessments = realm.objects('PersonalityAssessment').filtered('isDone = true AND userUuid="' + User.getID() +'"').sorted('createdAt', true);
    let isContinued = !!assessment && !assessment.isDone && !!assessment.step;

    this.state = {
      assessment: assessment,
      completedAssessments: completedAssessments,
      isContinued: isContinued,
    };
  }

  _renderInstruction() {
    return (
      <Card transparent>
        <CardItem header bordered>
          <Left>
            <Thumbnail source={require('../../assets/images/list.png')} />
            <Body>
              <Text>ការធ្វើតេស្តស្វែងយល់អំពី បុគ្គលិកលក្ខណៈ</Text>
            </Body>
          </Left>
        </CardItem>

        <CardItem>
          <Body>
            <Text>តាមការសិក្សាស្រាវជ្រាវរបស់អ្នកឯកទេសខាងចិត្តសាស្ត្របង្ហាញថា បុគ្គលិកលក្ខណៈរបស់មនុស្ស ត្រូវបានចែកចេញជា ៦ ប្រភេទ៖</Text>

            <View style={{flexDirection: 'row', paddingLeft: 20, marginBottom: 12}}>
              <View style={{flex: 1}}>
                <Text>1. ប្រាកដនិយម</Text>
                <Text>(Realistic)</Text>
              </View>
              <View style={{flex: 1}}>
                <Text>4. សង្គម</Text>
                <Text>(Social)</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', paddingLeft: 20, marginBottom: 12}}>
              <View style={{flex: 1}}>
                <Text>2. ពូកែអង្កេត</Text>
                <Text>(Investigative)</Text>
              </View>
              <View style={{flex: 1}}>
                <Text>5. ត្រិះរិះពិចារណា</Text>
                <Text>(Enterprising)</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', paddingLeft: 20}}>
              <View style={{flex: 1}}>
                <Text>3. សិល្បៈនិយម</Text>
                <Text>(Artisitc)</Text>
              </View>
              <View style={{flex: 1}}>
                <Text>6. សណ្ដាប់ធ្នាប់</Text>
                <Text>(Conventional)</Text>
              </View>
            </View>
          </Body>
        </CardItem>

        <CardItem footer style={{flexDirection: 'column'}}>
          <Button
            style={styles.button}
            onPress={this._startNewAssessment.bind(this)}>
            <Text style={styles.btnText}>
              ចាប់ផ្តើមថ្មី
            </Text>
          </Button>

          { this.state.isContinued &&
            <Button
              style={[styles.button, { backgroundColor: '#1976d2' , marginTop: 16}]}
              onPress={this._continueStep.bind(this)}
              >
              <Text style={styles.btnText}>បន្តទៅវគ្គមុន</Text>
            </Button>
          }

        </CardItem>
      </Card>
    )
  }

  _continueStep() {
    let category = this.state.assessment.step.split('Screen')[0].toLowerCase();
    this.props.navigation.navigate(this.state.assessment.step, {category: category});
  }

  _startNewAssessment() {
    let uncompletedAssessments = realm.objects('PersonalityAssessment').filtered('isDone = false AND userUuid = "' + User.getID() + '"');

    realm.write(() => {
      realm.delete(uncompletedAssessments);
      realm.create('PersonalityAssessment', this._buildData());

      this.props.navigation.navigate('RealisticScreen');
    });
  }

  _buildData() {
    return {
      uuid: uuidv4(),
      userUuid: User.getID(),
      createdAt: new Date()
    };
  }

  _renderHistory() {
    let count = this.state.completedAssessments.length;

    return(
      <Card>
        { !!count &&
          <ListItem itemDivider>
            <Text>លទ្ធផលធ្វើតេស្ត</Text>
          </ListItem>
        }

        { this.state.completedAssessments.map((assessment, i) => this._renderListItem(assessment, i, count)) }
      </Card>
    );
  }

  _renderListItem(assessment, index, count) {
    return (
      <ListItem
        key={index}
        button={true}
        onPress={() => this.props.navigation.navigate('AssessmentResultHistoryScreen', {num: (count - index), assessmentUuid: assessment.uuid})}
        thumbnail>
        <Left>
          <Thumbnail square source={require('../../assets/images/checklist.png')} />
        </Left>
        <Body>
          <Text>តេស្តលើកទី {count - index}</Text>
          <Text note numberOfLines={1}>ធ្វើនៅ: {longDateFormat(assessment.createdAt)}</Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  }

  _renderContent = () => {
    return (
      <Content>
        { this._renderInstruction() }
        { this._renderHistory() }
      </Content>
    )
  }

  _renderNavigation = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <BackButton navigation={this.props.navigation}/>
      </View>
    )
  }

  render() {
    return (
      <ScrollableHeader
        renderContent={ this._renderContent }
        renderNavigation={ this._renderNavigation }
        title={'ចំណងជើង'}
        largeTitle={'ចំណងជើង'}
      />
    )
  }
}
