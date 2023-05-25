import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import Color from '../../../themes/color';
import { Text } from '../../../components';
import { ErrorMessage } from '../../../components/forms';
import { useFormikContext } from "formik";

const GenderOption = ({name}) => {
  const { errors, touched, setFieldValue, values } = useFormikContext();
  const options = [
    { value: 'ប្រុស', image: require('../../../assets/images/account/male.png') },
    { value: 'ស្រី', image: require('../../../assets/images/account/female.png') }
  ];

  const renderOption = (option, index) => {
    let borderStyle = values[name] == option.value ? { borderColor: Color.blue } : {};

    return (
      <TouchableOpacity key={index} onPress={() => setFieldValue(name, option.value)} style={[styles.sexImageWrapper, borderStyle]}>
        <Image
          source={option.image}
          style={styles.sexImage} />
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <Text>ភេទ</Text>

      <View style={{flexDirection: 'row', width: '100%'}}>
        { options.map(renderOption) }
      </View>

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  )
}

const styles = StyleSheet.create({
  sexImageWrapper: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgb(239, 239, 239)',
    backgroundColor: 'rgb(239, 239, 239)',
    marginRight: 20
  },
  sexImage: {
    width: 66,
    height: 73
  }
})

export default GenderOption;
