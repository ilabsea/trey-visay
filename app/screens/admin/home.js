import React from 'react';
import {
  createDrawerNavigator
} from 'react-navigation';

// Screens
import AboutStack from '../stackNav/about_stack';
import Dashboard from './dashboard_stack';

import SideMenu from './side_menu/side_menu';

const AdminHomeScreen = createDrawerNavigator(
  {
<<<<<<< 00e0a9a2f172b363fa2432f68c337d1e971f98b1
    AdminDashboard: { screen: Dashboard },
    About: { screen: AboutStack }
=======
    Dashboard: { screen: Dashboard },
    About: { screen: AboutStack },
>>>>>>> fix admin login route + remove bio for admin
  },
  {
    initialRouteName: 'AdminDashboard',
    contentComponent: SideMenu,
    contentOptions: {
      activeTintColor: '#1976d2',
    },
  }
);

export default AdminHomeScreen;
