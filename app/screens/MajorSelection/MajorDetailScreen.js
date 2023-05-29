import React from 'react'
import { View, ScrollView, Alert } from 'react-native'
import { Text, FooterBar } from '../../components';
import { Card } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const MajorDetailScreen = () => {
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Text style={{textAlign: 'center', marginVertical: 16}}>ការផ្តល់អនុសាសន៍</Text>

        <Card style={{padding: 16}}>
          <Text>
            Major detail
          </Text>
        </Card>

      </ScrollView>
    </View>
  )
}

export default MajorDetailScreen
