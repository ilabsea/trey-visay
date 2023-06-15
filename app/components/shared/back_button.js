import React from 'react';
import { Platform, TouchableOpacity , Text } from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../assets/style_sheets/main/colors';
import { goBack } from '../../hooks/RootNavigation';

class BackButton extends React.Component {
  handleOnPress = () => {
    if (!!this.props.route && this.props.route.params && this.props.route.params._handleBack) {
      return this.props.route.params._handleBack()
    }

    if (!!this.props.onPress)
      return this.props.onPress();

    goBack();
  }

  getButtonColor() {
    return this.props.buttonColor || '#000';
  }

  render() {
    let width = Platform.OS === 'ios' ? 50 : 44;
    let paddingHorizontal = Platform.OS === 'ios' ? 8 : 12;
    let iconName = Platform.OS === 'ios' ? 'ios-chevron-back' : 'arrow-back';
    let iconSize = Platform.OS === 'ios' ? 34 : 24
    return <TouchableOpacity onPress={this.handleOnPress}
                style={[{paddingHorizontal: paddingHorizontal, width: width}, this.props.style]}>
              <IonicIcon name={iconName} color={this.getButtonColor()} size={iconSize} />
            </TouchableOpacity>;
  }
}

export default BackButton;
