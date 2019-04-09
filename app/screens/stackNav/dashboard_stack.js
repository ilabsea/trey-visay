import React, { Component } from 'react';

import { createStackNavigator } from  'react-navigation';
import headerStyles from '../../assets/style_sheets/header';
import OpenDrawer from '../../components/shared/open_drawer';

import Dashboard from '../dashboard';

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
