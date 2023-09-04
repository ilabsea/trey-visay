import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
// import firebase from 'react-native-firebase';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Color from '../../themes/color';
import ScrollableHeader from '../../components/scrollable_header';
import { Body, CardItem } from 'native-base';
import ButtonList from '../../components/list/button_list';
import Text from '../../components/Text';
import BoldLabelComponent from '../../components/shared/BoldLabelComponent';
import { ResumeQuizButton}  from './components';
import StartQuizButton from '../../components/shared/StartQuizButton';
import QuizListItem from './components/QuizListItem';
import useAuth from "../../auth/useAuth";
import Quiz from '../../models/Quiz';
import SidekiqService from '../../services/SidekiqService';

const HollandHomeScreen = ({route, navigation}) => {
  const { user } = useAuth();
  const quizzes = !!user ? Quiz.findAllByUser(user.uuid) : [];

  const title = 'វាយតម្លៃមុខរបរនិងអាជីព';
  const renderAboutItem = () => {
    return (
      <View style={{marginVertical: 12, backgroundColor: 'white'}}>
        <ButtonList
          hasLine={true}
          icon={{color: Color.blue, src: require('../../assets/icons/others/info.png')}}
          onPress={() => { navigation.navigate('HollandAboutScreen') }}
          title='អំពីការធ្វើតេស្តវាយតម្លៃមុខរបរនិងអាជីព' />
      </View>
    )
  }

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
        { renderAboutItem() }

        <CardItem>
          <Body>
            <Text>សួស្តីសាជាថ្មី</Text>
            <Text>ការធ្វើតេស្តវាយតម្លៃមុខរបរនិងអាជីព</Text>

            <View style={{width: '100%'}}>
              <StartQuizButton type='hollandTest' />
              <ResumeQuizButton />

              { false &&
                <TouchableOpacity onPress={() => SidekiqService.handleSyncing()}>
                  <Text>test upload</Text>
                </TouchableOpacity>
              }
            </View>
          </Body>
        </CardItem>

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
