import React, {useState} from 'react'
import { View, TouchableOpacity } from 'react-native'
import {
  FooterBar,
  Text,
  BackButton,
  BackConfirmDialog,
  ProgressStep,
  RatingGroup,
  ScrollableHeader,
} from '../../components';

import Color from '../../themes/color';
import scrollHeaderStyles from '../../assets/style_sheets/scroll_header';
import paginate from '../../utils/paginate_util';
import { Card } from 'react-native-paper';

import list_questions from './json/list_questions';
import ratings from './json/list_ratings'
import { Form, SubmitButton } from '../../components/forms';
import * as Yup from "yup";

const HollandQuestionnaireScreen = ({route, navigation}) => {
  const pageSize = 6
  const [page, setPage] = useState(route.params?.page || 1);
  const [questions, setQuestions] = useState(paginate(list_questions, pageSize, page));
  const isPageEnd = page * pageSize >= list_questions.length;

  let validations = {};
  for(let i=0; i<questions.length; i++) {
    validations[questions[i].code] = Yup.string().required("សូមជ្រើសរើស");
  }

  const validationSchema = Yup.object().shape(validations);

  const formValues = {};
  for(let i=0; i<questions.length; i++) {
    formValues[questions[i].code] = "";
  }

  const renderQuestion = (question, index) => {
    return (
      <Card key={index} style={{marginVertical: 8, padding: 8}} >
        <Text>{index + 1}) {question.name}</Text>

        <View style={{alignItems: 'center'}}>
          <RatingGroup name={question.code} options={ratings}/>
        </View>
      </Card>
    )
  }

  const handleSubmit = (values, {errors}) => {
    console.log("values============", values)

    if (isPageEnd) {
      return navigation.navigate('HollandTestResultScreen');
    }

    // if (!!values && !Object.keys(values).length) {
    //   return toastRef.current?.show('សូមបំពេញសំណួរខាងក្រោមជាមុនសិន...!', DURATION.SHORT);
    // }

    // navigation.navigate('HollandQuestionnaireScreenInstruction')
    // resetForm();
    // resetForm({values: {"3_1": null, "4_1": null}});
    navigation.push('HollandQuestionnaireScreen', {page: page + 1});
  }

  const renderContent = () => {
    return (
      <View style={{marginVertical: 8}}>
        { questions.map(renderQuestion) }
      </View>
    )
  }

  const renderNavigation = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <BackButton buttonColor='#fff' style={{width: 48}}/>
        <Text style={[scrollHeaderStyles.navTitle, { paddingTop: 2, flex: 1, textAlign: 'center', justifyContent: 'center' }]}>តេស្តបុគ្គលិកលក្ខណៈ</Text>
        <Text style={{color: '#fff', marginRight: 8, width: 48}}>{0} / 6</Text>
      </View>
    )
  }

  return (
    <Form
      initialValues={formValues}
      onSubmit={ handleSubmit }
      validationSchema={validationSchema} >

      <View style={{flex: 1}}>
        <ScrollableHeader
          backgroundColor={Color.blue}
          statusBarColor={Color.blueStatusBar}
          barStyle={'light-content'}
          renderContent={ renderContent }
          renderNavigation={ renderNavigation }
          headerMaxHeight={140}
          renderForeground={ () => <ProgressStep step={page} /> }
        />

        <SubmitButton title='បន្តទៀត' />
      </View>
    </Form>
  )
}

export default HollandQuestionnaireScreen
