import React from 'react';
import { createStackNavigator } from 'react-navigation';

// Screens
import CareerCenterScreen from '../../CareerCenter/CareerCenterScreen';
import WebviewScreen from '../../Webview/WebviewScreen';

const CareerCenterStack = createStackNavigator({
  CareerCenterScreen: {
    screen: CareerCenterScreen,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  },
  NeaCareerScreen: {
    screen: WebviewScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'ទីភ្នាក់ងារជាតិមុខរបរ និងការងារ',
    })
  },
  BongSreyCareerScreen: {
    screen: WebviewScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'បងស្រី ទីប្រឹក្សាការងារ',
    }),
  }
},
{
  navigationOptions: ({
  }),
  initialRouteName: 'CareerCenterScreen',
});

export default CareerCenterStack;
