import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Platform
} from 'react-native';

const DashboardView = (props) => {
  let PlatformView = Platform.OS == 'ios' ? View : ScrollView;
  return (
    <PlatformView>
      {props.children}
    </PlatformView>
  )
}

export default DashboardView;
