import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Rating from './Rating';
import { useFormikContext } from "formik";
import ErrorMessage from '../forms/ErrorMessage';
import {getStyleOfOS} from '../../utils/responsive_util';

const RatingGroup = ({name, options}) => {
  const { setFieldValue, values, errors, touched, isSubmitting } = useFormikContext();
  const value = values[name];

  const renderRating = (rating, index) => {
    return (
      <TouchableOpacity onPress={() => {
        setFieldValue(name, rating.value);
      }} key={index} style={{flex: 1, flexDirection: 'column', marginTop: getStyleOfOS(2, 0), marginRight: index == options.length - 1 ? 0 : 10}}>
        <Rating icon={rating.icon} style={{width: 40, height: 40}} active={rating.value == value} label={rating.name} />
      </TouchableOpacity>
    )
  }

  return (
    <React.Fragment>
      <View style={{flexDirection: 'row', width: '100%'}}>
        { options.map(renderRating) }
      </View>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </React.Fragment>
  )
}

export default RatingGroup
