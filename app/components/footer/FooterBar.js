import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Footer, Button } from 'native-base';

const FooterBar = (props) => {
  return(
    <Footer style={{backgroundColor: '#fff'}}>
      <Button onPress={props.onPress} style={styles.button}>
        <Text style={styles.btnText}>{props.text}</Text>
      </Button>
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
    justifyContent: 'center',
    flex: 1
  },
  btnText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold'
  },
})

export default FooterBar;
