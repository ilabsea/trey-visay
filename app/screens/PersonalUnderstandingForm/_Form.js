import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector, getFormValues, reset } from 'redux-form';
import { ScrollView, View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';

import CustomTextInput from '../../components/CustomTextInput'
import CustomRadioGroup from '../../components/CustomRadioGroup'
import CustomCheckbox from '../../components/CustomCheckbox'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import submit from './submit'

function Form(props) {

  const formStates = ['asyncValidating', 'dirty', 'pristine', 'valid', 'invalid', 'submitting', 'reset',
    'submitSucceeded', 'submitFailed', 'haveEverThoughtOfCareerIsYes'];

  const getTextColor = props.haveEverThoughtOfCareerIsYes ? styles.labelGroup : [styles.labelGroup, {color: '#ccc'}];
  const labelStyle = props.haveEverThoughtOfCareerIsYes ? {} : {color: '#ccc'};
  const buttonColor = props.haveEverThoughtOfCareerIsYes ? '#4caf50' : '#ccc';
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollContainer}>

      <View>
        <View style={{flexDirection: 'row', marginVertical: 16}}>
          <MaterialIcon name='stars' color='#e94b35' size={24} style={{marginRight: 8}} />
          <Text style={{fontWeight: 'bold', color: '#212121', flex: 1}}>
            ប្រសិនបើពិន្ទុសិស្សលើសពី ៥០% សិស្សមានសិទ្ធិបន្តបំពេញទំរង់រៀបចំផែនការមុខរបរ។
            ករណីសិស្ស ទទួលបានពិន្ទុក្រោម ៥០% សិស្សត្រូវតម្រូវឲ្យធ្វើតេស្តឡើងវិញម្តងទៀតមុននឹងឈានទៅវគ្គបន្ទាប់។
          </Text>
        </View>

        <Text style={styles.hintLable}>ចូរបំពេញចម្លើយខាងក្រោម៖</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.labelGroup}>១) តើប្អូននឹងបន្តការសិក្សារហូតដល់ថ្នាក់ទី១២ដែរឬទេ?</Text>
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
        <Text style={styles.labelGroup}>២) តើឪពុកម្តាយរបស់ប្អូននឹងអនុញ្ញាតឲ្យប្អូនបន្តការសិក្សារហូតដល់ថ្នាក់ទី១២ដែរឬទេ?</Text>
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
        <Text style={styles.labelGroup}>៣) តើប្អូនធ្លាប់គិតពីការងារមួយណាដែលប្អូនចង់ធ្វើក្រោយពេលបញ្ចប់ការសិក្សាដែរឬទេ?</Text>
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
          <Text style={getTextColor}>តើការងារនោះជាការងារអ្វី?</Text>
          <Field
            name={'careerName'}
            component={CustomTextInput}
            multiline={true}
            placeholder='ចុចទីនេះដើម្បីសរសេរចម្លើយ'
            editable={props.haveEverThoughtOfCareerIsYes}
          />
        </View>

        <View style={styles.formSubGroup3}>
          <Text style={getTextColor}>ចំពោះការងារដែលប្អូនបានជ្រើសរើសហើយ។​ តើប្អូនធ្វើដូចម្តេចដើម្បីឲ្យសម្រេចការងារដែលប្អូនជ្រើសរើសនោះ?</Text>
          <Field
            name={'howToReachCareerGoal'}
            component={CustomTextInput}
            multiline={true}
            numberOfLines={3}
            placeholder='ចុចទីនេះដើម្បីសរសេរចម្លើយ'
            editable={props.haveEverThoughtOfCareerIsYes}
          />
        </View>


        <View pointerEvents={ props.haveEverThoughtOfCareerIsYes ? "auto" : "none"}>
          <Text style={getTextColor}>តើឪពុកម្តាយប្អូនយល់ស្របជាមួយគំនិតរបស់ប្អូនដែរឬទេ?</Text>
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
        <Text style={styles.labelGroup}>៤) តើប្អូនធ្លាប់និយាយជាមួយនរណាម្នាក់ពីការងារអនាគតរបស់ប្អូនដែរឬទេ? (ចម្លើយអាចលើសពី១)</Text>
        <Field
          name={'everTalkedWithAnyoneAboutCareer'}
          component={CustomCheckbox}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.labelGroup}>៥) តើប្អូនអាចស្វែងរកការងារបានដោយវិធីណាខ្លះ?</Text>
        <Field
          name={'howToReachJobVacancy'}
          component={CustomTextInput}
          multiline={true}
          numberOfLines={2}
          placeholder='ចុចទីនេះដើម្បីសរសេរចម្លើយ'
        />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    flexDirection: 'column',
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
    fontWeight: 'bold',
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
