import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Rating from './Rating';
import { useFormikContext } from "formik";
import ErrorMessage from '../forms/ErrorMessage';
import Text from '../Text';
import {isShortWidthScreen} from '../../utils/responsive_util';

const RatingGroup = ({name, options}) => {
  const { setFieldValue, values, errors, touched, isSubmitting } = useFormikContext();
  const value = values[name];

  const renderRating = (rating, index) => {
    return (
      <TouchableOpacity onPress={() => {
        setFieldValue(name, rating.value);
      }} key={index} style={{justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
        <Text style={{fontSize: isShortWidthScreen() ? 11 : 12}}>{rating.name}</Text>
        <Rating icon={rating.icon} style={{width: 40, height: 40}} active={rating.value == value} />
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        { options.map(renderRating) }
      </View>

      <ErrorMessage error={errors[name]} visible={touched[name]} style={{marginLeft: 16}} />
    </View>
  )
}

export default RatingGroup
