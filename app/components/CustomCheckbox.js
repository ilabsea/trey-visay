import React from 'react';
import { TextInput, View, StyleSheet, Text  } from 'react-native';
import CheckboxGroup from 'react-native-checkbox-group'

export default function CustomCheckbox(props) {
  const { input, meta, ...checkboxProps } = props;

  const formStates = ['active', 'autofilled', 'asyncValidating', 'dirty', 'invalid', 'pristine',
    'submitting', 'touched', 'valid', 'visited'];

  return (
    <View>
      <CheckboxGroup
                    callback={input.onChange}
                    iconColor={"#4caf50"}
                    iconSize={30}
                    checkedIcon="ios-checkbox-outline"
                    uncheckedIcon="ios-square-outline"
                    checkboxes={
                                  [
                                    { value: 1, label: 'ឳពុកម្តាយ'},
                                    { value: 2, label: 'បងប្អូន' },
                                    { value: 3, label: 'ក្រុមប្រឹក្សាកុមារ' },
                                    { value: 4, label: 'នាយកសាលា' },
                                    { value: 5, label: 'គ្រូ' },
                                    { value: 6, label: 'មិត្តភក្តិ'}
                                  ]
                                }
                    labelStyle={{
                      color: '#333',
                      fontSize: 20,
                      marginLeft: 10
                    }}
                    rowStyle={{
                      flexDirection: 'row'
                    }}
                    rowDirection={"column"}
                  />


    </View>
  )
}

const styles = StyleSheet.create({
  checkboxItem: {
    borderColor: 'blue',
    borderWidth: 1,
    backgroundColor: 'green',
    color: 'red',
  },
})
