import React, { Component } from 'react';

import { createStackNavigator } from  'react-navigation';
import headerStyles from '../../assets/style_sheets/header';
import OpenDrawer from '../../components/open_drawer';

import Dashboard from '../dashboard';
import AccountStack from './account_stack';

const DashboardStack = createStackNavigator(
  {
    DashboardScreen: {
      screen: Dashboard,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: [headerStyles.headerTitleStyle],
        headerStyle: headerStyles.headerStyle,
        title: 'ត្រីវិស័យ',
        headerLeft: <OpenDrawer navigation={navigation}/>
      })
    }
  }
);


export default DashboardStack;
