import React, { Component } from 'react';

import { createStackNavigator } from  'react-navigation';

import ClusterScreen from '../../Vocational/cluster_screen';
import CareerIndexScreen from '../../Vocational/index_screen';
import CareerDetailScreen from '../../Vocational/career_detail_screen';
import InstitutionDetail from '../../school/institution_detail';
import Description from '../../Vocational/description';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function VocationalStack() {
  return (
    <Stack.Navigator initialRouteName="ClusterScreen">
      <Stack.Screen name="ClusterScreen" component={ClusterScreen} options={{headerShown: false}}/>
      <Stack.Screen name="CareerIndexScreen" component={CareerIndexScreen} navigationOptions={({navigation}) => ({
        title: navigation.state.params.title
      })}/>
      <Stack.Screen name="CareerDetailScreen" component={CareerDetailScreen} options={{headerShown: false}}/>
      <Stack.Screen name="InstitutionDetail" component={InstitutionDetail} options={{headerShown: false}}/>
      <Stack.Screen name="Description" component={Description} navigationOptions={({navigation}) => ({
        title: navigation.state.params.title
      })}/>
    </Stack.Navigator>
  )
}

export default VocationalStack;
