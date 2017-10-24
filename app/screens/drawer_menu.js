import React from 'react';
import { DrawerItems } from 'react-navigation';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default CustomDrawerContentComponent = (props) => {

  return (
    <View style={styles.container}>
      <DrawerItems {...props} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
