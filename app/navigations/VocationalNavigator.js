import React, { Component } from 'react';

import ClusterScreen from '../screens/Vocational/cluster_screen';
import CareerIndexScreen from '../screens/Vocational/index_screen';
import CareerDetailScreen from '../screens/Vocational/career_detail_screen';
import InstitutionDetail from '../screens/school/institution_detail';
import Description from '../screens/Vocational/description';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function VocationalNavigator() {
  return (
    <Stack.Navigator initialRouteName="ClusterScreen">
      <Stack.Screen name="ClusterScreen" component={ClusterScreen} options={{headerShown: false}}/>
      <Stack.Screen name="CareerIndexScreen" component={CareerIndexScreen} options={{headerShown: false}}/>
      <Stack.Screen name="CareerDetailScreen" component={CareerDetailScreen} options={{headerShown: false}}/>
      <Stack.Screen name="InstitutionDetail" component={InstitutionDetail} options={{headerShown: false}}/>
      <Stack.Screen name="Description" component={Description} navigationOptions={({navigation}) => ({
        title: navigation.state.params.title
      })}/>
    </Stack.Navigator>
  )
}

export default VocationalNavigator;
