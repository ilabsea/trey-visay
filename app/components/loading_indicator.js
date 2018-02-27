import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native'

export default class LoadingIndicator extends Component {
  render() {
    const {loading, ...props} = this.props;

    if (!loading) {
      return (null);
    }

    return (
      <View style={ styles.loading }>
        <ActivityIndicator
          animating={ true }
          style={[ styles.loading ]}
          size="large"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
});
