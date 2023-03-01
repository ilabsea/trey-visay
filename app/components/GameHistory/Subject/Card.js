import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { Divider } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Colors } from '../../../assets/style_sheets/main/colors';
import mainStyles from '../../../assets/style_sheets/main/main';

const Card = (props) => {
  return(
    <View>
      <View style={mainStyles.blueTitleBox}>
        <Text style={styles.blueTitle}>
          { props.data.title }
        </Text>
      </View>

      <View style={[mainStyles.subTitleBox, {padding: 0}]}>
        { props.data.groups.map((group, i) => {
          if (!props.gameSubject[group.stateName]) {
            return (null)
          }

          return (
            <View key={i}>
              <View style={styles.wrapper}>
                <Text style={mainStyles.title}>{group.label}</Text>
                <View style={styles.rightWrapper}>
                  <Text style={styles.rightText}>{props.gameSubject[group.stateName]}</Text>
                </View>
              </View>

              <Divider style={{marginLeft: 16}}/>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  blueTitle: {
    color: Colors.blue,
    fontWeight: 'bold'
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 16,
    justifyContent: 'space-between',
  },
  rightWrapper: {
    backgroundColor: Colors.blue,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 8,
    minWidth: 66
  },
  rightText: {
    textAlign: 'center',
    color: '#fff'
  }
});

export default Card;
