import React from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../../assets/style_sheets/main/colors';

const DEFAULT_BUTTON_COLOR='#fff';

class CloseButton extends React.Component {
  getButtonColor() {
    const {buttonColor} = this.props;
    return buttonColor || DEFAULT_BUTTON_COLOR
  }


  render() {
    return <TouchableOpacity onPress={() => { this.props.navigation.state.params._handleBack();}} style={{marginHorizontal: 16, width: 30}}>
            <MaterialIcon name='close' color={this.getButtonColor()} size={28} />
          </TouchableOpacity>;
  }
}

export default CloseButton;
