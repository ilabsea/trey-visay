import React, { Component, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
// import firebase from 'react-native-firebase';

import Color from '../../themes/color';
import ScrollableHeader from '../../components/scrollable_header';
import BackButton from '../../components/shared/back_button';
import { Content, Body, Right, Icon, CardItem } from 'native-base';
import ButtonList from '../../components/list/button_list';
import Text from '../../components/Text';
import { StartQuizButton, ResumeQuizButton}  from './components';
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
          title='អំពីការធ្វើតេសវាយតម្លៃមុខរបរ និងអាជីព' />
      </View>
    )
  }

  const renderQuizList = () => {
    let count = quizzes.length;

    if (!count) return;

    return (
      <View style={{padding: 16}}>
        <Text>លទ្ធផលធ្វើតេស្ត</Text>

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
      <Content>
        { renderAboutItem() }

        <CardItem>
          <Body>
            <Text>សួស្តីសាជាថ្មី</Text>
            <Text>ការធ្វើតេស្តវាយតម្លៃមុខរបរ និងអាជីព</Text>

            <View style={{width: '100%'}}>
              <StartQuizButton />
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
      </Content >
    )
  }

  return(
    <ScrollableHeader
      renderContent={ renderContent }
      renderNavigation={ () => <BackButton /> }
      title={title}
      largeTitle={title}
    />
  )
}

export default HollandHomeScreen;
