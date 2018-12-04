import React, { Component } from 'react';

import { createStackNavigator } from  'react-navigation';
import headerStyles from '../../assets/style_sheets/header';
import OpenDrawer from '../../components/open_drawer';

import About from '../about';

const AboutStack = createStackNavigator(
  {
    AboutScreen: {
      screen: About,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: [headerStyles.headerTitleStyle],
        headerStyle: headerStyles.headerStyle,
        title: 'អំពីកម្មវិធី',
        headerLeft: <OpenDrawer navigation={navigation}/>
      })
    }
  }
);


export default AboutStack;
