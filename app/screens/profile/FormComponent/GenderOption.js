import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import Color from '../../../themes/color';
import { Text } from '../../../components';
import FormErrorMessage from './FormErrorMessage';
import {FontSetting} from '../../../assets/style_sheets/font_setting';
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
    <React.Fragment>
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize: FontSetting.sub_title, color: Color.lightBlackColor}}>ភេទ <Text style={{color: Color.requiredColor, fontSize: FontSetting.sub_title}}>*</Text></Text>

        <View style={{flexDirection: 'row', width: '100%', paddingLeft: 22, marginTop: 10}}>
          { options.map(renderOption) }
        </View>
      </View>
      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  sexImageWrapper: {
    width: 76,
    height: 76,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgb(239, 239, 239)',
    backgroundColor: 'rgb(239, 239, 239)',
    marginRight: 20
  },
  sexImage: {
    width: 52,
    height: 58,
    resizeMode: 'contain'
  }
})

export default GenderOption;
