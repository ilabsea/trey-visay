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
        translucent={true}
        backgroundColor="rgba(0, 0, 0, 0.251)"
        { ...props }
      />
    )
  }
}
