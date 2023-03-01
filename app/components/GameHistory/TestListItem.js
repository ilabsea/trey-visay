import React, { Component } from 'react';

import { View, TouchableOpacity, StyleSheet } from 'react-native';
import mainStyles from '../../assets/style_sheets/main/main';
import { Colors } from '../../assets/style_sheets/main/colors';
import { longDateFormat as dateFormat } from '../../utils/date';
import Text from '../../components/Text';

const numbers = {0: '០', 1: '១', 2: '២', 3: '៣', 4: '៤', 5: '៥', 6: '៦', 7: '៧', 8: '៨', 9: '៩'};

const TestListItem = (props) => {
  let kmNumber = props.number.toString().split('').map(x => numbers[x]).join('');

  return (
    <TouchableOpacity
      style={styles.list}
      onPress={props.onPress}>
        <View style={styles.number}>
          <Text style={{color: '#fff', fontSize: 30, paddingTop: 16}}>{kmNumber}</Text>
        </View>

        <View style={styles.textWrapper}>
          <Text style={[mainStyles.title, {lineHeight: 42}]}>តេស្តលើកទី {kmNumber}</Text>
          <Text style={[mainStyles.subTitle, {flex: 1}]}>ធ្វើនៅ: {dateFormat(props.createdAt)}</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  number: {
    width: 80,
    height: 99,
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 10
  },
  textWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10
  }
});

export default TestListItem;
