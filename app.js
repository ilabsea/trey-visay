'use strict';

import React, { Component, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Sidekiq from './app/models/Sidekiq';
import SplashScreen from 'react-native-splash-screen';
import AppNavigation from './app/navigations/AppNavigator';
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";

const App = () => {
  const [user, setUser] = useState();

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  useEffect(() => {
    SplashScreen.hide();
    restoreUser();

    setTimeout(() => {
      Sidekiq.syncToServer();
    }, 1000);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <AppNavigation/>
    </AuthContext.Provider>
  );
}

export default App;
