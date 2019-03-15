import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { mainStyles } from '../../assets/style_sheets/vocational_job/main';

class OneList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[mainStyles.box, {marginTop: 30}]}>
        <TouchableOpacity
          style={mainStyles.btnList}
          onPress={this.props.onPress}>
          <Text style={mainStyles.text}>{this.props.text}</Text>
          <AwesomeIcon name='angle-right' size={24} color='#bbb' />
        </TouchableOpacity>
      </View>
    )
  }
}

export default OneList;
