import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Card, Divider } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Text from '../Text';
import Color from '../../themes/color';

const SelectOneListItem = ({label, value, checked, onPressViewDetail, onPressSelect}) => {
  const borderColor = checked ? Color.blue : "#fff";

  const renderViewDetailButton = () => {
    return (
      <TouchableOpacity
        onPress={onPressViewDetail}
        style={styles.buttonWrapper}>

        <Text style={{color: Color.blue}}>មើលលម្អិត</Text>
      </TouchableOpacity>
    )
  }

  const renderSelectButton = () => {
    if (checked) {
      return (
        <View style={styles.buttonWrapper}>
          <MaterialIcon name={'check'} size={24} style={{color: Color.blue}} />
        </View>
      )
    }

    return (
      <TouchableOpacity
        onPress={() => onPressSelect(value)}
        style={[styles.buttonWrapper, {alignItems: 'flex-start'}]}>

        <Text style={{color: Color.blue}}>ជ្រើសរើស</Text>
      </TouchableOpacity>
    )
  }

  return (
    <Card style={styles.card}>
      <View style={[styles.cardWrapper, {borderColor: borderColor}]}>

        <View style={{flexGrow: 1}}>
          <Text>{label}</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          { renderViewDetailButton() }

          <Divider style={styles.divider} />

          { renderSelectButton() }
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  buttonWrapper: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardWrapper: {
    flexDirection: 'row',
    padding: 12,
    borderWidth: 2
  },
  divider: {
    width: 1,
    height: '100%',
    marginHorizontal: 8
  },
  card: {
    marginVertical: 8,
    overflow: 'hidden'
  }
});

export default SelectOneListItem
