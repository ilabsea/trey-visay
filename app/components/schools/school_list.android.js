import React, {Component} from 'react';
import { View } from 'react-native';

import SchoolListItemComponent from '../shared/SchoolListItemComponent';
import mainStyles from '../../assets/style_sheets/main/main';
import {screenHorizontalPadding} from '../../constants/component_constant';

class SchoolListView extends Component {
  render(){
    return (
      <View style={[mainStyles.box, {paddingHorizontal: screenHorizontalPadding}]}>
        { this.props.data.map((school, i) => <SchoolListItemComponent school={school} showCategory={false} key={i} />)}
      </View>
    )
  }
}

export default SchoolListView;
