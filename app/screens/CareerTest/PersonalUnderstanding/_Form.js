import React, {Component} from 'react';
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

import CustomTextInput from '../../../components/CustomTextInput'
import CustomCheckbox from '../../../components/CustomCheckbox';
import CustomRadioGroup from '../../../components/CustomRadioGroup';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Question from '../../../data/json/personal_understanding.json';
import FormRadio from '../../../components/PersonalUnderstanding/FormRadio';
import { Colors } from '../../../assets/style_sheets/main/colors';

import submit from './submit'

function Form(props) {

  const formStates = ['asyncValidating', 'dirty', 'pristine', 'valid', 'invalid', 'submitting', 'reset',
    'submitSucceeded', 'submitFailed', 'haveEverThoughtOfCareerIsYes'];

  const getTextColor = props.haveEverThoughtOfCareerIsYes ? styles.labelGroup : [styles.labelGroup, {color: '#ccc'}];
  const labelStyle = props.haveEverThoughtOfCareerIsYes ? {} : {color: '#ccc'};
  const buttonColor = props.haveEverThoughtOfCareerIsYes ? Colors.blue : '#ccc';

  return (
    <View style={styles.scrollContainer}>
      <Text style={styles.hintLable}>ចូរបំពេញចម្លើយខាងក្រោម៖</Text>

      <FormRadio
        questionKey={'areYouGoingToStudyTillGrade12'}/>
      <FormRadio
        questionKey={'areYourParentsAllowYouToStudyTillGrade12'}/>
      <FormRadio
        questionKey={'haveYouEverThoughtOfCareer'}>
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
            onPress={() => {this.howToReachCareerGoal.focus()}}> { Question.howToReachCareerGoal } </Text>

          <Field
            name={'howToReachCareerGoal'}
            component={CustomTextInput}
            placeholder='ចុចទីនេះដើម្បីសរសេរចម្លើយ'
            editable={props.haveEverThoughtOfCareerIsYes}
            onRef={(input) => {this.howToReachCareerGoal = input}}
          />
        </View>

        <FormRadio
          questionKey={'doesParentsAgreeWith'}
          pointerEvents={ props.haveEverThoughtOfCareerIsYes ? "auto" : "none"}
          style={{padding: 0, marginBottom: 0}}
          textStyle={getTextColor}
          labelStyle={labelStyle}
          buttonColor={buttonColor} />
      </FormRadio>

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
    marginBottom: 4
  },
  instruction: {
    flexDirection: 'row',
    marginVertical: 16
  },
  formGroup: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  labelGroup: {
    marginBottom: 10,
  },
  hintLable: {
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
