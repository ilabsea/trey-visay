import React from 'react';
import { View } from 'react-native';
import { Formik } from "formik";

import FilterPickers from './filter_pickers';
import FilterNavigationHeader from '../../../components/schools/FilterNavigationHeader'

const SchoolFilterScreen = (props) => {
  const initialValue = {
    province: '0',
    category: '',
    department: '',
    major: '',
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Formik initialValues={initialValue} validationSchema={null}>
        <React.Fragment>
          <FilterNavigationHeader/>
          <FilterPickers kind={props.route.params.kind} refreshValue={props.route.params.refreshValue}/>
        </React.Fragment>
      </Formik>
    </View>
  )
}

export default SchoolFilterScreen;