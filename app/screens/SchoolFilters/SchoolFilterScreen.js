import React from 'react';
import { View } from 'react-native';
import { Formik } from "formik";

import SchoolFilterPickers from '../../components/SchoolFilters/SchoolFilterPickers';
import SchoolFilterNavigationHeader from '../../components/SchoolFilters/SchoolFilterNavigationHeader'

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
          <SchoolFilterNavigationHeader/>
          <SchoolFilterPickers kind={props.route.params.kind} refreshValue={props.route.params.refreshValue}/>
        </React.Fragment>
      </Formik>
    </View>
  )
}

export default SchoolFilterScreen;