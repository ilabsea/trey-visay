import React from 'react';
import { View } from 'react-native';
// import firebase from 'react-native-firebase';

import ScrollableHeader from '../../components/scrollable_header';
import BoldLabelComponent from '../../components/shared/BoldLabelComponent';
import { ResumeQuizButton}  from './components';
import QuizListItem from './components/QuizListItem';
import QuizHomeButtonsComponent from '../../components/shared/QuizHomeButtonsComponent';
import useAuth from "../../auth/useAuth";
import Quiz from '../../models/Quiz';

const HollandHomeScreen = ({route, navigation}) => {
  const { user } = useAuth();
  const quizzes = !!user ? Quiz.findAllByUser(user.uuid) : [];

  const title = 'វាយតម្លៃមុខរបរនិងអាជីព';

  const renderQuizList = () => {
    let count = quizzes.length;

    if (!count) return;

    return (
      <View style={{padding: 16}}>
        <BoldLabelComponent label="លទ្ធផលធ្វើតេស្ត" />

        { quizzes.map((quiz, i) =>
          (
            <QuizListItem
              key={i}
              number={i + 1}
              quiz={quiz}
              onPress={ () => navigation.navigate('HollandDetailScreen', {quizUuid: quiz.uuid, title: `តេស្តលើកទី ${i + 1}`}) }
            />
          )
        )}
      </View>
    );
  }

  renderContent = () => {
    return (
      <React.Fragment>
        <QuizHomeButtonsComponent
          welcomeLabel='សួស្តីសាជាថ្មី'
          introLabel='ការធ្វើតេស្តវាយតម្លៃមុខរបរនិងអាជីព'
          type='hollandTest'
          aboutButtonLabel='អំពីការធ្វើតេស្តវាយតម្លៃមុខរបរនិងអាជីព'
          onPressAbout={() => navigation.navigate('HollandAboutScreen')}
          resumeQuizButton={<ResumeQuizButton />}
        />

        { renderQuizList() }
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

export default HollandHomeScreen;
