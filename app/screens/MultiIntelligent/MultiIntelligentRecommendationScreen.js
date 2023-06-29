import React from 'react'
import { View, ScrollView } from 'react-native'

import { Text, FooterBar } from '../../components';
import { Card } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import CustomNavigationHeader from '../../components/shared/CustomNavigationHeader';
import { reset } from '../../hooks/RootNavigation';

const MultiIntelligentRecommendationScreen = ({route, navigation}) => {
  const renderItem = (label) => {
    return <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 6, marginRight: 8, marginTop: -1}}>{'\u2B24'}</Text>
              <Text>{label}</Text>
           </View>
  }

  return (
    <View style={{flex: 1}}>
      <CustomNavigationHeader title='ការផ្តល់អនុសាសន៍' headerStyle={{zIndex: 1}} />
      <ScrollView>
        <Card style={{padding: 16, marginTop: 16}}>
          {renderItem('លើកទឹកចិត្តរៀនតាមរបៀបដែលសិស្សមានទំនៅរបញ្ញាជាមួយ')}
          {renderItem('ហ្វឹកហាត់សមត្ថភាព និងជំនាញដែលសិស្សមានឲ្យកាន់តែពូកែ')}
          {renderItem('ស្វែងយល់បន្ថែមនូវសមត្ថភាព និងជំនាញបន្ទាប់បន្សំដទៃទៀតដែលសិស្សពេញចិត្ត')}
        </Card>
      </ScrollView>
      <FooterBar icon='keyboard-arrow-right' text='រួចរាល់' onPress={() => reset({routeName: 'MultiIntelligentNavigator'})} />
    </View>
  )
}

export default MultiIntelligentRecommendationScreen