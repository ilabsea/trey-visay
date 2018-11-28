import React, { Component } from 'react';

import { createStackNavigator } from  'react-navigation';

import VocationalJobIndexScreen from '../vocational_job/index_screen';
import VocationalJobShowScreen from '../vocational_job/show_screen';
import InstitutionDetail from '../school/institution_detail';


const VocationalJobStack = createStackNavigator(
  {
    VocationalJobIndexScreen: { screen: VocationalJobIndexScreen },
    VocationalJobShowScreen: { screen: VocationalJobShowScreen },
    InstitutionDetail: {
      screen: InstitutionDetail
    },
  }
);

export default VocationalJobStack;
