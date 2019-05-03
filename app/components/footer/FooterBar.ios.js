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
    <Footer>
      <TouchableOpacity onPress={props.onPress} style={styles.button}>
        <Text style={styles.btnText}>{props.text}</Text>
      </TouchableOpacity>
    </Footer>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: 'gray',
    width: '90%',
    margin: 3,
    borderRadius: 10,
    justifyContent: 'center'
  },
  btnText: {
    color: 'black',
    fontSize: 22,
    marginTop: 7
  },
})

export default FooterBar;
