import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-elements';

import mainStyles from "../../assets/style_sheets/main/main";

class ButtonList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={[mainStyles.btnList, {alignItems: 'center'}]}
          onPress={this.props.onPress}
        >
          { this.props.icon &&
            <View style={{ width: 32, height: 32, borderRadius: 12, backgroundColor: this.props.icon.color, marginRight: 16}}>
              <Image
                source={this.props.icon.src}
                resizeMode='contain'
                style={{width: 20, height: 20, margin: 6}}
              />
            </View>
          }
          <Text style={[mainStyles.text, this.props.boldFont]}>{this.props.title}</Text>
          <Text style={{paddingRight: 8}}>{this.props.numberAtRight}</Text>
          { !this.props.hideArrow && <AwesomeIcon name='angle-right' size={30} color='#bbb' /> }
        </TouchableOpacity>
        { this.props.hasLine && <Divider/> }
      </View>
    )
  }
}

export default ButtonList;
