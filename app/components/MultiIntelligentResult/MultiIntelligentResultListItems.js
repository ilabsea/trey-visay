import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {Divider} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';

import { Text } from '../../components';
import {screenHorizontalPadding} from '../../constants/component_constant';
import intelligenceTypes from '../../data/json/intelligence_types.json'
import { FontSetting } from '../../assets/style_sheets/font_setting';
import Color from '../../themes/color';

const MultiIntelligentResultListItems = ({navigation, quiz}) => {
  const renderList = () => {
    return quiz.sortedIntelligenceScore.map((score, index) => {
      const typeIndex = intelligenceTypes.findIndex((type) => type.code == score[0]);
      if (typeIndex != -1) {
        const item = intelligenceTypes[typeIndex];
        return (
          <View key={index}>
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('IntelligentDetailScreen', {code: item.code})}>
              <Text style={{fontSize: FontSetting.text, flex: 1, paddingRight: 16}} numberOfLines={1}>{item.name_km} ({item.name_en})</Text>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 13, marginRight: 6, color: Color.gray}}>មើលលម្អិត</Text>
                <Icon name='angle-right' size={24} color='#bbb' style={{marginTop: -3}} />
              </View>
            </TouchableOpacity>
            <Divider/>
          </View>
        )
      }
    });
  }

  return (
    <React.Fragment>
      <Text style={{color: 'black', paddingHorizontal: screenHorizontalPadding}}>ទម្រង់បញ្ញារបស់អ្នកគឺស្ថិតក្នុងក្រុម</Text>
      {renderList()}
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection:'row',
    height: 56,
    paddingHorizontal: 16
  }
})

export default MultiIntelligentResultListItems
