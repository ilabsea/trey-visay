import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {Text} from '..'
import mainStyles from '../../assets/style_sheets/main/main';
import {pressableItemSize, arrowRightIconSize} from '../../constants/component_constant';
import Color from '../../themes/color';

class OneList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[mainStyles.box, {marginTop: 14}]}>
        <TouchableOpacity style={[mainStyles.btnList, {height: pressableItemSize, alignItems: 'center'}]}
          onPress={this.props.onPress}
        >
          <Text style={{color: Color.paleBlackColor}}>{this.props.text}</Text>
          { !!this.props.selectedValue &&
            <Text style={styles.rightText}>{this.props.selectedValue}</Text>
          }
          <AwesomeIcon name='angle-right' size={arrowRightIconSize} color='#bbb' />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rightText: {
    flex: 1,
    paddingRight: 16,
    textAlign: 'right'
  }
})

export default OneList;
