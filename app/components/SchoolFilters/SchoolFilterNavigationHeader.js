import React from 'react'
import {TouchableOpacity} from 'react-native'
import { useFormikContext } from "formik"

import CustomNavigationHeader from '../shared/CustomNavigationHeader'
import {Text} from '..'
import color from '../../themes/color'

const SchoolFilterNavigationHeader = (props) => {
  const { setFieldValue } = useFormikContext();

  const resetValues = () => {
    setFieldValue('province', '0');
    setFieldValue('category', '0');
    setFieldValue('department', '0');
    setFieldValue('major', '0');
  }

  const renderRightBtn = () => {
    return <TouchableOpacity onPress={() => resetValues()} style={{paddingRight: 16}}>
              <Text>កំណត់ឡើងវិញ</Text>
           </TouchableOpacity>
  }

  return <CustomNavigationHeader title='ស្វែងរកគ្រឹះស្ថានសិក្សា' rightButton={() => renderRightBtn()} headerStyle={{borderBottomWidth: 1.5, borderColor: color.paleGray}} />
}

export default SchoolFilterNavigationHeader