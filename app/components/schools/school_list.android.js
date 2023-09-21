import React, {Component} from 'react';
import { View } from 'react-native';

import SchoolListItemComponent from '../shared/SchoolListItemComponent';
import mainStyles from '../../assets/style_sheets/main/main';

class SchoolListView extends Component {
  render(){
    return (
      <View style={[mainStyles.box, {paddingHorizontal: 16}]}>
        { this.props.data.map((school, i) => <SchoolListItemComponent school={school} showCategory={true} key={i} />)}
      </View>
    )
  }
}

export default SchoolListView;
