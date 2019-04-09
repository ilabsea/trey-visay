import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const FooterBar = (props) => {
  return(
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={props.onPress} style={styles.button}>
        <Text style={styles.btnText}>{props.text}</Text>
        <MaterialIcon name={props.icon} color='#fff' size={24} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#4caf50',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 61
  },
  button: {
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    ...Platform.select({
      android: {
        marginTop: -5,
      },
      ios: {
        marginTop: 7
      }
    }),
  },
})

export default FooterBar;
