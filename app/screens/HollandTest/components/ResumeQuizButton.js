import React, { Component, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import AppButton from '../../../components/shared/button';
import { FontSetting } from '../../../assets/style_sheets/font_setting';
import Text from '../../../components/Text';
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import Color from '../../../themes/color';
import Quiz from '../../../models/Quiz';

const ResumeQuizButton = () => {
  const navigation = useNavigation();
  const currentQuiz = useSelector((state) => state.currentQuiz.value);

  const onPress = () => {
    navigation.navigate(currentQuiz.nextScreen)
  }

  const isQuizToResume = () => {
    return !!currentQuiz && !currentQuiz.isDone;
  }

  return (
    <View style={{flex: 1}}>
      {
        isQuizToResume() &&

        <AppButton style={styles.button} onPress={onPress}>
          <Text style={styles.btnText}>បន្តទៅវគ្គមុន</Text>
        </AppButton>
      }

    </View>
  )
}

export default ResumeQuizButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '100%',
    marginTop: 20,
    backgroundColor: Color.blue
  },
  btnText: {
    fontSize: FontSetting.button_text,
    color: '#fff',
    fontWeight: 'bold'
  }
});
