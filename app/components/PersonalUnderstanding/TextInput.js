import React, { useState, useEffect } from 'react';
import { View, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-paper';
import Text from '../Text';
import { Colors } from '../../assets/style_sheets/main/colors';

const Question3 = (props) => {
  const getTextColor = props.disabled ? [styles.labelGroup, {color: '#ccc'}] : styles.labelGroup;

  return (
    <View style={styles.formSubGroup3}>
      <Text style={getTextColor}>{ props.label } </Text>

      <TextInput
        value={ props.value }
        onChangeText={ props.onChangeText }
        mode="flat"
        placeholder="ចុចទីនេះដើម្បីសរសេរចម្លើយ"
        activeUnderlineColor={Colors.blue}
        disabled={props.disabled} />
    </View>
  )
}

const styles = StyleSheet.create({
  labelGroup: {
    marginBottom: 10,
  },
  formSubGroup3: {
    marginBottom: 24,
    paddingVertical: 10,
  }
})

export default Question3;
