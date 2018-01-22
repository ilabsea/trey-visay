'use strict';

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

// Screens
import ProfileForm from './app/screens/profile/profile_form';
import HomeNavigator from './app/screens/home';
import Login from './app/screens/login';
import Register from './app/screens/register';
import AdminHomeNavigator from './app/screens/admin/home';

import User from './app/utils/user';
import adminList from './app/data/json/admin';
import uuidv4 from './app/utils/uuidv4';
import realm from './app/schema';

const AppNavigator = StackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  ProfileForm: { screen: ProfileForm },
  Home: {
    screen: ({ navigation }) => <HomeNavigator screenProps={{ rootNavigation: navigation }} />,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  },
  AdminHome: {
    screen: ({ navigation }) => <AdminHomeNavigator screenProps={{ rootNavigation: navigation }} />,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  }
}, {
  initialRouteName: 'Login',
});

export default class App extends Component {
  adminMigration() {
    realm.write(() => {
      for (let i = 0; i < adminList.length; i++) {
        let user = adminList[i];
        let obj = {
                    uuid: uuidv4(),
                    fullName: user.fullName,
                    password: user.password,
                    username: user.username,
                    schoolName: user.schoolName,
                    role: user.role
                  };

        realm.create('User', obj);
      }

      User.setAdminExisted();
    });
  }

  handleMigration(result) {
    if (!!result) { return }

    this.adminMigration();
  }

  componentWillMount() {
    User.isAdminExisted(this.handleMigration.bind(this));
  }

  render() {
    return ( <AppNavigator/> );
  }
}
