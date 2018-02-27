'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';

export default class BackgroundImage extends Component {
  render() {
    const {children, style, ...props} = this.props;
    return (
      <Image
        {...props}
        style={styles.backgroundImage}>

        {children}
      </Image>
    )
  }
}


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  }
});
