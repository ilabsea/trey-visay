import React, { useState, useEffect } from 'react';
import { View, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-paper';
import Text from '../Text';
import { Colors } from '../../assets/style_sheets/main/colors';
import { useFormikContext } from "formik";

const Question3 = (props) => {
  const getTextColor = props.disabled ? [styles.labelGroup, {color: '#ccc'}] : styles.labelGroup;
  const { setFieldTouched, handleChange, errors, touched, setFieldValue, values } = useFormikContext();
  const conditions = (props.condition || "").split('|');

  const isDisabled = () => {
    return !!conditions && values[conditions[0]] != conditions[1];
  }

  return (
    <View style={styles.formSubGroup3}>
      <TextInput
        value={ values[props.name] }
        mode="flat"
        placeholder="ចុចទីនេះដើម្បីសរសេរចម្លើយ"
        activeUnderlineColor={Colors.blue}
        onBlur={() => setFieldTouched(props.name)}
        onChangeText={ handleChange(props.name) }
        disabled={ isDisabled() } />
    </View>
  )
}

const styles = StyleSheet.create({
  labelGroup: {
    marginBottom: 10,
  },
})

export default Question3;
