'use strict';

import React, { Component, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from 'react-native-splash-screen';
import AppNavigation from './app/navigations/AppNavigator';
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import {seedDataToRealm} from './app/services/seed_data_service';

const App = () => {
  const [user, setUser] = useState();

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  useEffect(() => {
    SplashScreen.hide();
    restoreUser();
    seedDataToRealm();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <AppNavigation/>
    </AuthContext.Provider>
  );
}

export default App;
