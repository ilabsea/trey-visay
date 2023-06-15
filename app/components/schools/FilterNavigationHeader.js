import React from 'react'
import {TouchableOpacity} from 'react-native'

import CustomNavigationHeader from '../shared/CustomNavigationHeader'
import {Text} from '..'

const FilterNavigationHeader = (props) => {
  const renderRightBtn = () => {
    return <TouchableOpacity onPress={() => props.resetValues()} style={{borderWidth: 0, paddingRight: 16}}>
              <Text>កំណត់ឡើងវិញ</Text>
           </TouchableOpacity>
  }

  return <CustomNavigationHeader title='ស្វែងរកគ្រឹះស្ថានសិក្សា' rightButton={() => renderRightBtn()} />
}

export default FilterNavigationHeader