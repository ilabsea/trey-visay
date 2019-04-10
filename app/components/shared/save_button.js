import React from 'react';
import {View, Text, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import headerStyles from '../../assets/style_sheets/header';

class SaveButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <TouchableOpacity style={headerStyles.actionWrapper} onPress={() => this.props.navigation.state.params.handleSubmit()}>
              { !this.props.noIcon
                && <MaterialIcon name="done" color='#fff' size={24} /> }
              <Text style={headerStyles.saveText}>រក្សាទុក</Text>
            </TouchableOpacity>;
  }
}

export default SaveButton;
