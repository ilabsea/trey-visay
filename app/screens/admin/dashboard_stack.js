import React, { Component } from 'react';

import { createStackNavigator } from  'react-navigation';
import headerStyles from '../../assets/style_sheets/header';
import OpenDrawer from '../../components/open_drawer';

import AdminDashboardScreen from './dashboard_screen';

const AdminDashboardStack = createStackNavigator(
  {
    DashboardScreen: {
      screen: AdminDashboardScreen,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: [headerStyles.headerTitleStyle],
        headerStyle: headerStyles.headerStyle,
        title: 'ត្រីវិស័យ',
        headerLeft: <OpenDrawer navigation={navigation}/>
      })
    }
  }
);


export default AdminDashboardStack;
