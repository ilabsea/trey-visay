import React from 'react';
import { View } from 'react-native';

import {Text} from '../../../components';
import Color from '../../../themes/color';
import FilterButton from './filter_button';

const categories = {
  'public': 'សាលារដ្ឋ',
  'private': 'សាលាឯកជន',
  'ngo': 'អង្គការ'
}

const  FilterCategoryButtons = (props) => {
  const renderCategoryBtns = () => {
    let doms = []
    for (let type in categories) {
      doms.push(<FilterButton
                  key={`category-${type}`}
                  item={type}
                  label={categories[type]}
                  isSelected={props.selectedCategory == type}
                  style={{flexBasis: '50%'}}
                  updateSelectedItem={() => props.updateSelectedCategory(props.selectedCategory ? '' : type)}
                />)
    }
    return doms
  }

  return (
    <React.Fragment>
      <Text style={{marginLeft: 16, marginTop: 10, marginBottom: 6, color: Color.paleBlackColor}}>
        ជ្រើសរើសប្រភេទ
      </Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        { renderCategoryBtns() }
      </View>
    </React.Fragment>
  )
}

export default FilterCategoryButtons