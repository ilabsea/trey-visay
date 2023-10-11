import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-paper';
import Text from '../Text';

import mainStyles from "../../assets/style_sheets/main/main";
import BoldLabelComponent from '../shared/BoldLabelComponent';

class ButtonList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={[mainStyles.btnList, {alignItems: 'center'}, this.props.buttonListStyle]}
          onPress={this.props.onPress}
        >
          { this.props.icon &&
            <View style={{ width: 32, height: 32, borderRadius: 12, borderColor: this.props.iconColor, marginRight: 16, borderWidth: 2, justifyContent: 'center', alignItems: 'center'}}>
              {this.props.icon}
            </View>
          }
          <BoldLabelComponent label={this.props.title} style={[mainStyles.text, {lineHeight: 24, marginTop: 2}]} />
          <Text style={{paddingRight: 8}}>{this.props.numberAtRight}</Text>
          { !this.props.hideArrow && <AwesomeIcon name='angle-right' size={30} color='#bbb' /> }
        </TouchableOpacity>
        { this.props.hasLine && <Divider/> }
      </View>
    )
  }
}

export default ButtonList;
