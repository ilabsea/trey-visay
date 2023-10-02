'use strict';

import React, { Component } from 'react';
import {
  StatusBar
} from 'react-native';

export default class MyStatusBar extends Component {
  render() {
    const {...props} = this.props;

    return (
      <StatusBar
        backgroundColor="white"
        barStyle={'dark-content'}
        { ...props }
      />
    )
  }
}
