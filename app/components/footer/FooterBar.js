import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import { Footer, Button } from 'native-base';
import {screenHorizontalPadding} from '../../constants/component_constant';
import {getStyleOfDevice} from '../../utils/responsive_util';

const FooterBar = (props) => {
  return(
    <Footer style={{backgroundColor: '#fff', paddingHorizontal: screenHorizontalPadding, height: 66}}>
      <Button onPress={props.onPress} style={styles.button}>
        <Text style={styles.btnText}>{props.text}</Text>
      </Button>
    </Footer>
  )
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#1976d2',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 48
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: getStyleOfDevice(-3, -6)
  },
})

export default FooterBar;
