import React from 'react';
import { View } from 'react-native';

import FilterButton from './filter_button';
import {Text} from '../../../components';
import Color from '../../../themes/color';
import schoolUtil from '../../../utils/school_util';

const FilterDepartmentButtons = (props) => {
  const renderDepartmentBtns = () => {
    return schoolUtil.getTvetDepartments().map((department, index) => {
      return <FilterButton
                key={`department-${index}`}
                item={department}
                label={department}
                isSelected={props.selectedDepartment == department}
                style={{flexBasis: '50%'}}
                numberOfLines={3}
                labelStyle={{fontSize: 14, lineHeight: 22}}
                updateSelectedItem={() => props.updateSelectedDepartment(props.selectedDepartment == department ? '' : department)}
             />
    })
  }

  return (
    <React.Fragment>
      <Text style={{marginLeft: 16, marginTop: 10, marginBottom: 6, color: Color.paleBlackColor}}>
        កំរិតសញ្ញាបត្រ
      </Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        { renderDepartmentBtns() }
      </View>
    </React.Fragment>
  )
}

export default FilterDepartmentButtons;