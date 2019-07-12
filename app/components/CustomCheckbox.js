import React from 'react';
import { View } from 'react-native';
import CheckboxGroup from '../components/checkbox_group';
import { Colors } from '../assets/style_sheets/main/colors';

export default function CustomCheckbox(props) {
  const { input, meta, ...checkboxProps } = props;

  return (
    <View>
      <CheckboxGroup
        onSelect={(selected) => {input.onChange(selected)}}
        items={
          [
            { value: 1, label: 'ឳពុកម្តាយ'},
            { value: 2, label: 'បងប្អូន' },
            { value: 3, label: 'ក្រុមប្រឹក្សាកុមារ' },
            { value: 4, label: 'នាយកសាលា' },
            { value: 5, label: 'គ្រូ' },
            { value: 6, label: 'មិត្តភក្តិ'}
          ]
        }
        checkedVip={input.value || []}
        style={{
          icon: {
            color: Colors.blue,
            size: 30
          },
          container: {
            flexDirection: 'row',
            borderTopWidth: 0.5,
            borderColor: '#ccc',
            paddingVertical: 8,
          },
          label: {
            color: '#333',
            fontSize: 16,
            marginLeft: 10
          }
        }}
      />
    </View>
  )
}
