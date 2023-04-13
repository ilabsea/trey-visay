import React, {useState} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Rating from './Rating';
import { useFormikContext } from "formik";
import ErrorMessage from './ErrorMessage';

const RatingGroup = ({name, options}) => {
  const { setFieldValue, values, errors, touched, isSubmitting } = useFormikContext();
  const value = values[name];

  const renderRating = (rating, index) => {
    return (
      <TouchableOpacity onPress={() => {
        setFieldValue(name, rating.value);
      }} key={index}>
        <Rating icon={rating.icon} style={{width: 40, height: 40}} active={rating.value == value} />
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        { options.map(renderRating) }
      </View>

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  )
}

export default RatingGroup
