import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import Color from '../../themes/color';
import ScrollableHeader from '../../components/scrollable_header';
import AppButton from '../../components/shared/button';
import BoldLabelComponent from '../../components/shared/BoldLabelComponent';
import { Body, CardItem } from 'native-base';
import ButtonList from '../../components/list/button_list';
import Text from '../../components/Text';
import QuizListItem from '../HollandTest/components/QuizListItem';
import { FontSetting } from '../../assets/style_sheets/font_setting';

const MultiIntelligentHomeScreen = ({route, navigation}) => {
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
    const quizzes = [
      {createdAt: new Date()}
    ]

    return (
      <View style={{padding: 16}}>
        <BoldLabelComponent label="លទ្ធផលធ្វើតេស្ត" />

        { quizzes.map((quiz, i) =>
          (
            <QuizListItem
              key={i}
              number={i + 1}
              quiz={quiz}
              onPress={ () => navigation.navigate('MultiIntelligentResultScreen') }
            />
          )
        )}
      </View>
    );
  }

  const renderButton = () => {
    return <AppButton style={styles.button} onPress={() => navigation.navigate('IntelligentProfileScreen')}>
              <Text style={styles.btnText}>ធ្វើតេស្តថ្មី</Text>
           </AppButton>
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
              {renderButton()}
            </View>
          </Body>
        </CardItem>
        {/* { renderHistories() } */}
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