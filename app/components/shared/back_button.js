import React from 'react';
import {Platform, TouchableOpacity } from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons';

class BackButton extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOnPress = () => {
    if (this.props.navigation.state.params && this.props.navigation.state.params._handleBack) {
      this.props.navigation.state.params._handleBack()
    }
    this.props.navigation.goBack()
  }

  render() {
    let iconName = Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back';
    return <TouchableOpacity onPress={this.handleOnPress}
                style={{marginHorizontal: 16, paddingRight: 20}}>
              <IonicIcon name={iconName} color='#fff' size={28} />
            </TouchableOpacity>;
  }
}

export default BackButton;
