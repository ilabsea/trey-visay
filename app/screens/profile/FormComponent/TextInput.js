import React, {Component} from 'react';
import { View } from 'react-native';
import { Icon, Item, Input } from 'native-base';
import { Text } from '../../../components';
import { ErrorMessage } from '../../../components/forms';
import { useFormikContext } from "formik";

const TextInputComponent = ({label, name, iconName, ...otherProps}) => {
  const { errors, touched, setFieldValue, values } = useFormikContext();

  return (
    <View>
      <Text>{label}</Text>

      <Item regular>
        <Icon active name={iconName} />

        <Input
          onChangeText={(text) => setFieldValue(name, text)}
          value={values[name]}
          {...otherProps}
        />
      </Item>

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  )
}

export default TextInputComponent;
