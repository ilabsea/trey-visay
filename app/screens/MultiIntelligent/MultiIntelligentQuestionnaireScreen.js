import React from 'react'
import { Animated, View } from 'react-native'
import DeviceInfo from 'react-native-device-info'

import MultiIntelligentNavHeader from '../../components/MultiIntelligent/MultiIntelligentNavHeader';
import QuestionItem from '../../components/MultiIntelligent/QuestionItem';
import { getQuestions, getForm, getHollandScore } from '../../services/intelligent_question_service';

export default MultiINtelligentQuestionnaireScreen = ({route, navigation}) => {
  const scrollY = React.useRef(new Animated.Value(0));
  const { questions, isPageEnd, page } = getQuestions(route.params?.page);

  const handleSubmit = (values, {errors}) => {
    if (isPageEnd) {
      return navigation.navigate('HollandTestResultScreen');
    }

    navigation.push('HollandQuestionnaireScreen', {page: page + 1});
  }

  const renderContent = () => {
    return (
      <View style={{marginVertical: 8}}>
        { questions.map((q, index) =>
          <QuestionItem question={q} index={index} key={index}/>)
        }
      </View>
    )
  }

  return (
    <Form
      initialValues={initialValues}
      onSubmit={ handleSubmit }
      validationSchema={validationSchema}
    >
      <MultiIntelligentNavHeader step={page} scrollY={scrollY.current}/>
      <Animated.ScrollView contentContainerStyle={{flexGrow: 1, paddingTop: getStyleOfOS(DeviceInfo.hasNotch() ? 152 : 124, 105)}}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY.current } } }],
          { useNativeDriver: true },
        )}
      >
        {/* {renderContent()} */}
      </Animated.ScrollView>
      <SubmitButton title='បន្តទៀត' />
    </Form>
  )
}