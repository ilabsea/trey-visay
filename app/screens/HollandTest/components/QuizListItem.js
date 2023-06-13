import React, { Component } from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import mainStyles from '../../../assets/style_sheets/main/main';
import Color from '../../../themes/color';
import { longDateFormat as dateFormat } from '../../../utils/date';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

const numbers = {0: '០', 1: '១', 2: '២', 3: '៣', 4: '៤', 5: '៥', 6: '៦', 7: '៧', 8: '៨', 9: '៩'};

const QuizListItem = ({number, quiz, onPress}) => {
  let kmNumber = number.toString().split('').map(x => numbers[x]).join('');

  return (
    <TouchableOpacity
      style={styles.list}
      onPress={onPress}>
        <View style={styles.number}>
          <Text style={{color: Color.blue, fontSize: 40, lineHeight: 50}}>{kmNumber}</Text>
        </View>

        <View style={styles.textWrapper}>
          <Text style={[mainStyles.title, {lineHeight: 42}]}>តេស្តលើកទី {kmNumber}</Text>
          <Text style={[mainStyles.subTitle, {flex: 1}]}>ធ្វើនៅ: {dateFormat(quiz.createdAt + '')}</Text>
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center', paddingRight: 16}}>
          <AwesomeIcon name='angle-right' size={30} color='#bbb' />
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  number: {
    width: 60,
    height: 99,
    borderRightWidth: 1,
    borderRightColor: Color.blue,
    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginTop: 10
  },
  textWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10
  }
});

export default QuizListItem;
