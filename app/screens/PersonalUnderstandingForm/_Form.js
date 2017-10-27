
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector, getFormValues, reset } from 'redux-form';
import { ScrollView, View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';

import CustomTextInput from '../../components/CustomTextInput'
import CustomRadioGroup from '../../components/CustomRadioGroup'
import CustomCheckbox from '../../components/CustomCheckbox'

import submit from './submit'

function Form(props) {

  const formStates = ['asyncValidating', 'dirty', 'pristine', 'valid', 'invalid', 'submitting', 'reset',
    'submitSucceeded', 'submitFailed', 'haveEverThoughtOfCareerIsYes'];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollContainer}>

      <View style={styles.formGroup}>
        <Text style={styles.labelGroup}>តើអ្នកនឹងបន្តការសិក្សារហូតដល់ថ្នាក់ទី១២ដែរឬទេ?</Text>
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
        <Text style={styles.labelGroup}>តើឪពុកម្តាយរបស់ប្អូននឹងអនុញ្ញាតឲ្យប្អូនបន្តការសិក្សារហូតដល់ថ្នាក់ទី១២ដែរឬទេ?</Text>
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
        <Text style={styles.labelGroup}>តើប្អូនធ្លាប់គិតពីការងារមួយណាដែលប្អូនចង់ធ្វើក្រោយពេលបញ្ចប់ការសិក្សាដែរឬទេ?</Text>
        <Field
          name={'haveYouEverThoughtOfCarrer'}
          component={CustomRadioGroup}
          radio_props={
                        [
                          {label: 'បាទ/ចាស', value: 'Yes' },
                          {label: 'ទេ', value: 'No'}
                        ]
                      }
        />

      </View>

      <View style={styles.formGroup}>
        <Text style={styles.labelGroup}>តើការងារនោះជាការងារអ្វី?</Text>
        <Field
          name={'carrerName'}
          component={CustomTextInput}
          multiline={true}
          editable={props.haveEverThoughtOfCareerIsYes}
        />
      </View>


      <View style={styles.formGroup}>
        <Text style={styles.labelGroup}>ចំពោះការងារដែលអ្នកបានជ្រើសរើសហើយ។​ តើអ្នកធ្វើដូចម្តេចដើម្បីឲ្យសម្រេចការងារដែលអ្នកជ្រើសរើសនោះ?</Text>
        <Field
          name={'howToReachCarreerGoal'}
          component={CustomTextInput}
          multiline={true}
          numberOfLines={3}
          editable={props.haveEverThoughtOfCareerIsYes}
        />
      </View>


      <View style={styles.formGroup} pointerEvents={ props.haveEverThoughtOfCareerIsYes ? "auto" : "none"}>
        <Text style={styles.labelGroup}>តើឪពុកម្តាយអ្នកយល់ស្របជាមួយគំនិតរបស់អ្នកដែរឬទេ?</Text>
        <Field
          name={'doesParentsAgreeWith'}
          component={CustomRadioGroup}
          radio_props={
                        [
                          {label: 'បាទ/ចាស', value: 'Yes' },
                          {label: 'ទេ', value: 'No'},
                          {label: 'មិនដឹង', value: 'Don_Know'},
                        ]
                      }
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.labelGroup}>តើអ្នកធ្លាប់និយាយជាមួយនរណាម្នាក់ពីការងារអនាគតរបស់អ្នកដែរឬទេ? (ចម្លើយអាចលើសពី១)</Text>
        <Field
          name={'everTalkedWithAnyoneAboutCarrerr'}
          component={CustomCheckbox}

        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.labelGroup}>តើអ្នកអាចស្វែងរកការងារឬស្រាវជ្រាវរកមុខរបរតាមរយៈអ្វីខ្លះ?</Text>
        <Field
          name={'howToReachJobVacancy'}
          component={CustomTextInput}
          multiline={true}
          numberOfLines={2}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.labelGroup}>តើអ្នកអាចស្វែងរកការងារឬស្រាវជ្រាវរកមុខរបរតាមរយៈអ្នកណា?</Text>
        <Field
          name={'whoToReachJobVacancy'}
          component={CustomTextInput}
          multiline={true}
          numberOfLines={2}
        />
      </View>

    </ScrollView>
  );


}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 24,
  },
  formGroup: {
    marginTop: 0,
  },
  labelGroup: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
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
    const haveEverThoughtOfCareerIsYes = (selector(state, 'haveYouEverThoughtOfCarrer') == 'Yes');
    return {
      haveEverThoughtOfCareerIsYes,
      values
    }
  }
)(Form);


export default Form;
