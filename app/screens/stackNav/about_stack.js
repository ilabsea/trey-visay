import React, { Component } from 'react';

import { createStackNavigator } from  'react-navigation';
import headerStyles from '../../assets/style_sheets/header';
import BackButton from '../../components/shared/back_button';

import About from '../About/About';

const AboutStack = createStackNavigator(
  {
    AboutScreen: {
      screen: About,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: [headerStyles.headerTitleStyle],
        headerStyle: headerStyles.headerStyle,
        title: 'អំពីកម្មវិធី',
        headerLeft: <BackButton navigation={navigation}/>
      })
    }
  }
);


export default AboutStack;
