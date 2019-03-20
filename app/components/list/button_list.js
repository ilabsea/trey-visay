import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';

import { mainStyles } from "../../assets/style_sheets/main/main";

class ButtonList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={mainStyles.btnList}
          onPress={this.props.onPress}
        >
          <Text style={mainStyles.text}>{this.props.title}</Text>
          <AwesomeIcon name='angle-right' size={24} color='#bbb' />
        </TouchableOpacity>
        <Divider style={styles.divider}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  divider: {
    marginLeft: 16
  }
})

export default ButtonList;
