import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Button from '../../components/shared/button';
import StatusBar from '../../components/shared/status_bar';
import formStyles from '../../assets/style_sheets/login_form';
import styles from '../../assets/style_sheets/assessment';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import shareStyles from '../../assets/style_sheets/profile_form';

import realm from '../../schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';
import {longDateFormat} from '../../utils/date';

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
      isContinued: isContinued
    };
  }

  _renderInstruction() {
    return (
      <View style={[styles.box]}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.logoWrapper}>
            <Image source={require('../../assets/images/list.png')} style={styles.logo} />
          </View>

          <Text style={styles.title}>ការធ្វើតេស្តស្វែងយល់អំពី បុគ្គលិកលក្ខណៈ</Text>
        </View>

        <View style={{flex: 1}}>
          <Text>តាមការសិក្សាស្រាវជ្រាវរបស់អ្នកឯកទេសខាងចិត្តសាស្ត្របង្ហាញថា បុគ្គលិកលក្ខណៈរបស់មនុស្ស ត្រូវបានចែកចេញជា ៦ ប្រភេទ៖</Text>

          <View style={{paddingLeft: 20}}>
            <Text>1. ប្រាកដនិយម (Realistic)</Text>
            <Text>2. ពូកែអង្កេត (Investigative)</Text>
            <Text>3. សិល្បៈនិយម (Artistic)</Text>
            <Text>4. សង្គម (Social)</Text>
            <Text>5. ត្រិះរិះពិចារណា (Enterprising)</Text>
            <Text>6. សណ្ដាប់ធ្នាប់ (Conventional)</Text>
          </View>

          <Text>ចង់ដឹងថា អ្នកមានបុគ្គលិកលក្ខណៈបែបណានោះ សូមចាប់ផ្ដើមធ្វើតេស្ដខាងក្រោមនេះ!</Text>
          <View>
            <Button
              style={[formStyles.btnSubmit, { paddingHorizontal: 20, marginRight: 20, marginBottom: 10 }]}
              onPress={()=> this._startNewAssessment()}
              >
              <Text style={[formStyles.submitText, { color: '#fff', fontSize: 20 }]}>
                ចាប់ផ្ដើមថ្មី
              </Text>
            </Button>

            { this.state.isContinued &&
              <Button
                style={[formStyles.btnSubmit, { paddingHorizontal: 20, marginRight: 20, backgroundColor: '#1976d2'}]}
                onPress={()=> this._continueStep()}
                >
                <Text style={[formStyles.submitText, { color: '#fff', fontSize: 20 }]}>
                  បន្តទៅវគ្គមុន
                </Text>
              </Button>
            }

          </View>
        </View>
      </View>
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

    return (
      <View >
        { !!count &&
          <Text style={{fontWeight: 'bold', marginTop: 20, marginBottom: 16, marginHorizontal: 16}}>លទ្ធផលធ្វើតេស្ត</Text>
        }

        { this.state.completedAssessments.map((assessment, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={[styles.box, {marginTop: 0, marginBottom: 8, flexDirection: 'row', alignItems: 'center'}]}
              onPress={() => this.props.navigation.navigate('AssessmentResultHistoryScreen', {num: (count - i), assessmentUuid: assessment.uuid})}
              >
              <View style={{flexDirection: 'row', flex: 1}}>
                <Image source={require('../../assets/images/checklist.png')} style={{width: 60, height: 60, marginRight: 16}} />
                <View style={{flex: 1}}>
                  <Text style={shareStyles.subTitle}>តេស្តលើកទី {count - i}</Text>
                  <Text style={styles.text}>ធ្វើនៅ: {longDateFormat(assessment.createdAt)}</Text>
                </View>
              </View>

              <AwesomeIcon name='angle-right' size={24}/>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar />
        <ScrollView>
          <View style={styles.container}>
            { this._renderInstruction() }
            { this._renderHistory() }
          </View>
        </ScrollView>
      </View>
    );
  }
}
