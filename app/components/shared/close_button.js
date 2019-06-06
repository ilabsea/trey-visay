import React from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

class CloseButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <TouchableOpacity onPress={() => { this.props.navigation.state.params._handleBack();}} style={{marginHorizontal: 16, width: 30}}>
            <MaterialIcon name='close' color='#fff' size={28} />
          </TouchableOpacity>;
  }
}

export default CloseButton;
