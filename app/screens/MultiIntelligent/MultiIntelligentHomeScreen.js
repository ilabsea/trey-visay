import React from 'react';
import { View } from 'react-native';
import { Body, CardItem } from 'native-base';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Color from '../../themes/color';
import ScrollableHeader from '../../components/scrollable_header';
import BoldLabelComponent from '../../components/shared/BoldLabelComponent';
import StartQuizButton from '../../components/shared/StartQuizButton';
import ButtonList from '../../components/list/button_list';
import Text from '../../components/Text';
import QuizListItem from '../HollandTest/components/QuizListItem';
import useAuth from "../../auth/useAuth";
import IntelligentQuiz from '../../models/IntelligentQuiz';
import {setCurrentQuiz} from '../../redux/features/quiz/intelligentQuizSlice';

const MultiIntelligentHomeScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const quizzes = !!user ? IntelligentQuiz.findAllByUser(user.uuid) : [];

  const title = 'តេស្តភាពឆ្លាតវៃ';
  const renderAboutItem = () => {
    return (
      <View style={{marginVertical: 12, backgroundColor: 'white'}}>
        <ButtonList
          hasLine={true}
          iconColor={Color.blue}
          icon={<Icon name='information-variant' size={25} color={Color.blue} />}
          onPress={() => { }}
          title='អំពីតេស្តភាពឆ្លាតវៃ' />
      </View>
    )
  }

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
        { renderAboutItem() }
        <CardItem>
          <Body>
            <Text>សូមស្វាគមន៍មកកាន់</Text>
            <Text>តេស្តភាពឆ្លាតវៃ</Text>

            <View style={{width: '100%'}}>
              <StartQuizButton type='intelligentTest' />
            </View>
          </Body>
        </CardItem>
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