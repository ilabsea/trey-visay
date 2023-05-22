'use strict';

import React, { Component, useEffect } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// import Sidekiq from './app/utils/models/sidekiq';
import SplashScreen from 'react-native-splash-screen';

import AppNavigation from './app/navigations/AppNavigator';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();

    // setTimeout(() => {
    //   Sidekiq.uploadAll();
    // }, 1000);
  }, []);

  return (
    <AppNavigation/>
  );
}

export default App;
