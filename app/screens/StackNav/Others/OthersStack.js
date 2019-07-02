import React from 'react';
import { Platform } from 'react-native';

import {
  createStackNavigator
} from 'react-navigation';

// Screens
import Others from '../../Others/Others';
import About from '../../About/About';
import ChangePassword from '../../Account/change_password_screen';
import TermsCondition from '../../TermsCondition/TermsCondition';

const OthersStack = createStackNavigator({
  Others: {
    screen: Others,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  },
  About: {
    screen: About,
    navigationOptions: ({navigation}) => ({
      title: 'អំពីកម្មវិធី',
      header: null
    }),
  },
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  },
  TermsCondition: {
    screen: TermsCondition,
    navigationOptions: ({navigation}) => ({
      title: 'Terms & Condition',
      header: null
    }),
  }
},
{
  navigationOptions: ({
    headerStyle: {
      // marginTop: Platform.OS == 'android' ? 24: 0
    },
  }),
  initialRouteName: 'Others',
});

OthersStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

export default OthersStack;
