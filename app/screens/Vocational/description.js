import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const Description = (props) => {
  return (
    <View  style={styles.container}>
      <Text >
        { props.route.params.content }
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1 ,
    padding: 16,
    backgroundColor: '#fff'
  }
});

export default Description;
