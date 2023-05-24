import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
// import firebase from 'react-native-firebase';

import Color from '../../themes/color';
import ScrollableHeader from '../../components/scrollable_header';
import BackButton from '../../components/shared/back_button';
import { Content, Body, Right, Icon, CardItem } from 'native-base';
import ButtonList from '../../components/list/button_list';
import Text from '../../components/Text';
import { StartQuizButton, ResumeQuizButton}  from './components';
import { useSelector } from 'react-redux'

const HollandHomeScreen = ({route, navigation}) => {
  const title = 'វាយតម្លៃមុខរបរនិងអាជីព';
  const currentUser = useSelector((state) => state.currentUser.value);

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
            </View>
          </Body>
        </CardItem>
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
