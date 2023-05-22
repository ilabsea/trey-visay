import React, { Component, useState, useEffect } from 'react';
import {
  Text,
  View,
  Platform,
  StatusBar,
} from 'react-native';

import realm from '../../db/schema';
import User from '../../utils/user';
import Sidekiq from '../../utils/models/sidekiq';
import { Colors } from '../../assets/style_sheets/main/colors';

import FormScreen from './Form';
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentUser } from '../../redux/features/user/userSlice';
import { FooterBar, BackButton, ScrollableHeader } from '../../components';
import uuidv4 from '../../utils/uuidv4';

const ProfileFormScreen = ({navigation}) => {
  const title = 'បំពេញប្រវត្តិរូបសង្ខេប';
  const dispatch = useDispatch();

  useEffect(() => {
    if (Platform.OS == 'android') {
      StatusBar.setBackgroundColor(Colors.grayStatusBar);
      StatusBar.setBarStyle('dark-content');
    }
  }, [])

  const handleSubmit = (values) => {
    console.log('-----values', values);
    let obj = values;
    obj.uuid = uuidv4();
    obj.password = "123";
    obj.username = obj.fullName;

    try {
      realm.write(() => {
        user = realm.create('User', obj, true);
        // Sidekiq.create(this.state.user.uuid, 'User');
        dispatch(setCurrentUser(user));
        navigation.navigate('PersonalUnderstandingTestScreen');
      });
    } catch (e) {
      alert(e);
    }
  }


  const renderContent = () => {
    return (
      <View style={{padding: 16}}>
        <FormScreen handleSubmit={handleSubmit}/>
      </View>
    )
  }

  return (
    <View style={{flex: 1}}>
      <ScrollableHeader
        style={{backgroundColor: '#fff'}}
        renderContent={ renderContent }
        renderNavigation={ () => <BackButton /> }
        title={title}
        largeTitle={title}
      />
    </View>
  )
}

export default ProfileFormScreen;
