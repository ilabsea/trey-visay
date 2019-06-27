import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Footer } from 'native-base';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const FooterBar = (props) => {
  return(
    <Footer style={{backgroundColor: '#fff'}}>
      <TouchableOpacity onPress={props.onPress} style={styles.button}>
        <Text style={styles.btnText}>{props.text}</Text>
      </TouchableOpacity>
    </Footer>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: '#1976d2',
    width: '90%',
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center'
  },
  btnText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold'
  },
})

export default FooterBar;
