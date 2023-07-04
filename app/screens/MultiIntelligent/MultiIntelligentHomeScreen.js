import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Body, CardItem } from 'native-base';

import Color from '../../themes/color';
import ScrollableHeader from '../../components/scrollable_header';
import BoldLabelComponent from '../../components/shared/BoldLabelComponent';
import StartQuizButton from '../../components/shared/StartQuizButton';
import ButtonList from '../../components/list/button_list';
import Text from '../../components/Text';
import QuizListItem from '../HollandTest/components/QuizListItem';
import { FontSetting } from '../../assets/style_sheets/font_setting';
import useAuth from "../../auth/useAuth";
import IntelligentQuiz from '../../models/IntelligentQuiz';


const MultiIntelligentHomeScreen = ({route, navigation}) => {
  const { user } = useAuth();
  const quizzes = !!user ? IntelligentQuiz.findAllByUser(user.uuid) : [];

  const title = 'តេស្តភាពឆ្លាតវៃ';
  const renderAboutItem = () => {
    return (
      <View style={{marginVertical: 12, backgroundColor: 'white'}}>
        <ButtonList
          hasLine={true}
          icon={{color: Color.blue, src: require('../../assets/icons/others/info.png')}}
          onPress={() => { }}
          title='អំពីតេស្តភាពឆ្លាតវៃ' />
      </View>
    )
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
              onPress={ () => navigation.navigate('MultiIntelligentResultScreen', {quizUuid: quiz.uuid, order: i+1}) }
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
        { renderHistories() }
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

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '100%',
    marginTop: 20
  },
  btnText: {
    fontSize: FontSetting.button_text,
    color: '#fff',
  }
});