import React, { Component } from 'react';
import {
  View,
  AppRegistry,
  Text,
} from 'react-native';

import { Provider } from 'react-redux';
import store from './app/redux/store';

// Utils
import User from './app/utils/user';
import realm from './app/schema';

// Screens
import AccountNav from './app/screens/account_nav';
import ProfileForm from './app/screens/profile_form';
import Home from './app/screens/home';

// @Todo: comment it
import AppNav from './app/screens/app_nav';
import Profile from './app/screens/profile';

export default class TreyVisay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedin: false,
      loaded: false,
    };
  }

  handleUser(userId) {
    if (!!userId){
      this.setState({isLoggedin: true});
    }
    this.setState({loaded: true});
  }

  isUserInfoCompleted() {
    let users = realm.objects('User').filtered('uuid="' + User.getID() + '"');

    return !!users.length && !!users[0].dateOfBirth;
  }

  componentWillMount() {
    // User.logout();
    User.isLoggedin(this.handleUser.bind(this));
  }

  render() {
    // Loading screen
    if (!this.state.loaded) {
      return (<View/>)
    }

    // @Todo: comment this block when final result
    // if(true) {
    //   return()
    // }

    if (!this.state.isLoggedin) {
      return (<AccountNav/>);
    }

    if (this.isUserInfoCompleted()) {
      return (<Home/>)
    }

    return (<ProfileForm/>);
  }
}

AppRegistry.registerComponent('TreyVisay', () => TreyVisay);
