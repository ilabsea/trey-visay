import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import ScrollableHeader from '../../components/scrollable_header';
import BoldLabelComponent from '../../components/shared/BoldLabelComponent';
import QuizHomeButtonsComponent from '../../components/shared/QuizHomeButtonsComponent';
import QuizListItem from '../HollandTest/components/QuizListItem';
import useAuth from "../../auth/useAuth";
import IntelligentQuiz from '../../models/IntelligentQuiz';
import {setCurrentQuiz} from '../../redux/features/quiz/intelligentQuizSlice';

const MultiIntelligentHomeScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const quizzes = !!user ? IntelligentQuiz.findAllByUser(user.uuid) : [];

  const title = 'តេស្តភាពឆ្លាតវៃ';

  const viewDetail = (quizUuid, order) => {
    dispatch(setCurrentQuiz(null))
    navigation.navigate('MultiIntelligentResultScreen', {quizUuid, order})
  }

  const renderHistories = () => {
    return (
      <View style={{padding: 16}}>
        <BoldLabelComponent label="លទ្ធផលធ្វើតេស្ត" />

        { quizzes.map((quiz, i) =>
          (
            <QuizListItem
              key={i}
              number={i + 1}
              quiz={quiz}
              onPress={ () => viewDetail(quiz.uuid, i+1) }
            />
          )
        )}
      </View>
    );
  }

  const renderContent = () => {
    return (
      <React.Fragment>
        <QuizHomeButtonsComponent
          welcomeLabel='សូមស្វាគមន៍មកកាន់'
          introLabel='តេស្តភាពឆ្លាតវៃ'
          type='intelligentTest'
          aboutButtonLabel='អំពីតេស្តភាពឆ្លាតវៃ'
          onPressAbout={() => navigation.navigate('MultiIntelligentAboutScreen')}
        />
        { quizzes.length > 0 && renderHistories() }
      </React.Fragment>
    )
  }

  return(
    <ScrollableHeader
      renderContent={ renderContent }
      title={title}
      largeTitle={title}
    />
  )
}

export default MultiIntelligentHomeScreen;