'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

export default class Button extends Component {
  render() {
    const {children, style, disabled, ...props} = this.props;
    const btnSubmitColor = !disabled ? '#4caf50' : '#d9d9d9';
    const btnSubmitTextColor = !disabled ? '#fff' : '#868686';

    return (
      <TouchableOpacity
        {...props}
        style={[styles.button, {backgroundColor: btnSubmitColor}, style]}>
        {children}
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  button: {
    borderRadius: 3,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
