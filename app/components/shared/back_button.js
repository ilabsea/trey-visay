import React from 'react';
import { Platform, TouchableOpacity , Text } from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../assets/style_sheets/main/colors';

class BackButton extends React.Component {
  handleOnPress = () => {
    if (this.props.navigation.state.params && this.props.navigation.state.params._handleBack) {
      return this.props.navigation.state.params._handleBack()
    }
    this.props.navigation.goBack(null)
  }

  getButtonColor() {
    const {buttonColor} = this.props;
    let btnColor = Platform.OS == 'ios' ? Colors.blue : '#000';

    return buttonColor || btnColor;
  }

  render() {
    let width = Platform.OS === 'ios' ? 30 : 44;
    let paddingHorizontal = Platform.OS === 'ios' ? 8 : 12
    let iconName = Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back';
    return <TouchableOpacity onPress={this.handleOnPress}
                style={[{paddingHorizontal: paddingHorizontal, width: width}, this.props.style]}>
              <IonicIcon name={iconName} color={this.getButtonColor()} size={28} />
            </TouchableOpacity>;
  }
}

export default BackButton;
