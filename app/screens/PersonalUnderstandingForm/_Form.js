import React from 'react';
import { connect } from 'react-redux';
import {
  reduxForm,
  Field,
  formValueSelector,
  getFormValues,
  reset
} from 'redux-form';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import CustomTextInput from '../../components/CustomTextInput'
import CustomRadioGroup from '../../components/CustomRadioGroup'
import CustomCheckbox from '../../components/CustomCheckbox'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Question from '../../data/json/personal_understanding.json';

import submit from './submit'

function Form(props) {

  const formStates = ['asyncValidating', 'dirty', 'pristine', 'valid', 'invalid', 'submitting', 'reset',
    'submitSucceeded', 'submitFailed', 'haveEverThoughtOfCareerIsYes'];

  const getTextColor = props.haveEverThoughtOfCareerIsYes ? styles.labelGroup : [styles.labelGroup, {color: '#ccc'}];
  const labelStyle = props.haveEverThoughtOfCareerIsYes ? {} : {color: '#ccc'};
  const buttonColor = props.haveEverThoughtOfCareerIsYes ? '#4caf50' : '#ccc';
  return (

    <View style={styles.scrollContainer}>

      <View>
        <View style={{flexDirection: 'row', marginVertical: 16}}>
          <MaterialIcon name='stars' color='#e94b35' size={24} style={{marginRight: 8}} />
          <Text style={{flex: 1}}>
            ប្រសិនបើពិន្ទុសិស្សលើសពី ៥០% សិស្សមានសិទ្ធិបន្តបំពេញទំរង់រៀបចំផែនការមុខរបរ។
            ករណីសិស្ស ទទួលបានពិន្ទុក្រោម ៥០% សិស្សត្រូវតម្រូវឲ្យធ្វើតេស្តឡើងវិញម្តងទៀតមុននឹងឈានទៅវគ្គបន្ទាប់។
          </Text>
        </View>

        <Text style={styles.hintLable}>ចូរបំពេញចម្លើយខាងក្រោម៖</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.labelGroup}>{ Question.areYouGoingToStudyTillGrade12 }</Text>
        <Field
          name={'areYouGoingToStudyTillGrade12'}
          component={CustomRadioGroup}
          radio_props={
                        [
                          {label: 'បាទ/ចាស', value: 'Yes' },
                          {label: 'ទេ', value: 'No'},
                          {label: 'មិនដឹង', value: 'Don_Know'}
                        ]
                      }
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.labelGroup}>{ Question.areYourParentsAllowYouToStudyTillGrade12 }</Text>
        <Field
          name={'areYourParentsAllowYouToStudyTillGrade12'}
          component={CustomRadioGroup}
          radio_props={
                        [
                          {label: 'បាទ/ចាស', value: 'Yes' },
                          {label: 'ទេ', value: 'No'},
                          {label: 'មិនដឹង', value: 'Don_Know'}
                        ]
                      }
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.labelGroup}>{ Question.haveYouEverThoughtOfCareer }</Text>
        <Field
          name={'haveYouEverThoughtOfCareer'}
          component={CustomRadioGroup}
          radio_props={
                        [
                          {label: 'បាទ/ចាស', value: 'Yes' },
                          {label: 'ទេ', value: 'No'}
                        ]
                      }
        />

        <View style={styles.formSubGroup3}>
          <Text style={getTextColor} onPress={() => {this.careerName.focus()}}>
            { Question.careerName }
          </Text>
          <Field
            name={'careerName'}
            component={CustomTextInput}
            multiline={true}
            numberOfLines={3}
            placeholder='ចុចទីនេះដើម្បីសរសេរចម្លើយ'
            editable={props.haveEverThoughtOfCareerIsYes}
            onRef={(input) => {this.careerName = input}}
          />
        </View>

        <View style={styles.formSubGroup3}>
          <Text
            style={getTextColor}
            onPress={() => {this.howToReachCareerGoal.focus()}}> { Question.howToReachJobVacancy } </Text>

          <Field
            name={'howToReachCareerGoal'}
            component={CustomTextInput}
            placeholder='ចុចទីនេះដើម្បីសរសេរចម្លើយ'
            editable={props.haveEverThoughtOfCareerIsYes}
            onRef={(input) => {this.howToReachCareerGoal = input}}
          />
        </View>


        <View pointerEvents={ props.haveEverThoughtOfCareerIsYes ? "auto" : "none"}>
          <Text style={getTextColor}>{ Question.doesParentsAgreeWith }</Text>
          <Field
            name={'doesParentsAgreeWith'}
            component={CustomRadioGroup}
            labelStyle={labelStyle}
            buttonColor={buttonColor}
            radio_props={
                          [
                            {label: 'បាទ/ចាស', value: 'Yes' },
                            {label: 'ទេ', value: 'No'},
                            {label: 'មិនដឹង', value: 'Don_Know'},
                          ]
                        }
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.labelGroup} >{ Question.everTalkedWithAnyoneAboutCareer }</Text>
        <Field
          name={'everTalkedWithAnyoneAboutCareer'}
          component={CustomCheckbox}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.labelGroup} onPress={() => {this.howToReachJobVacancy.focus()}}> { Question.howToReachJobVacancy } </Text>
        <Field
          name={ 'howToReachJobVacancy' }
          component={CustomTextInput}
          placeholder='ចុចទីនេះដើម្បីសរសេរចម្លើយ'
          onRef={(input) => {this.howToReachJobVacancy = input}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    margin: 16,
  },
  formGroup: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  labelGroup: {
    marginBottom: 10,
    fontSize: 20,
  },
  hintLable: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.54)',
    marginBottom: 8
  },
  formSubGroup3: {
    marginBottom: 24,
    paddingVertical: 10,
  }
})

Form = reduxForm({
  form: 'personalUnderstandingForm',
  onSubmit: submit,
})(Form);

const selector = formValueSelector('personalUnderstandingForm');

Form = connect(
  state => {
    const values = getFormValues('personalUnderstandingForm')(state);
    const haveEverThoughtOfCareerIsYes = (selector(state, 'haveYouEverThoughtOfCareer') == 'Yes');
    return {
      haveEverThoughtOfCareerIsYes,
      values
    }
  }
)(Form);

export default Form;
