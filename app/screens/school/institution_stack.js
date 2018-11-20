import React from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import PrivateSchoolScreen from './private_school_screen';
import NGOSchoolScreen from './ngo_school_screen';
import GovernmentSchoolScreen from './government_school_screen';
import InstitutionDetail from './institution_detail';
import headerStyles from '../../assets/style_sheets/header';

import {
  ThemeContext,
  Toolbar,
  getTheme,
  Icon
} from 'react-native-material-ui';

const uiTheme = {
  palette: {
    primaryColor: '#1976d2',
  }
};

const InstitutionTab = createMaterialTopTabNavigator({
  GovernmentSchoolScreen: { screen: GovernmentSchoolScreen , navigationOptions: {tabBarLabel: 'សាលារដ្ឋ'}},
  PrivateSchoolScreen: { screen: PrivateSchoolScreen , navigationOptions: {tabBarLabel: 'សាលាឯកជន'}},
  NGOSchoolScreen: { screen: NGOSchoolScreen, navigationOptions: {tabBarLabel: 'អង្គការ'} },
}, {
  tabBarPosition: 'top',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#fff',
    labelStyle: {
      fontWeight: 'bold',
      fontSize: 14,
    },
    style: {
      backgroundColor: '#1976d2'
    }
  },
});

const StacksOverTabs = createStackNavigator({
  Root: {
    screen: InstitutionTab,
    navigationOptions: ({navigation, screenProps}) => ({
      headerStyle: {backgroundColor: '#1976d2'},
      headerLeft:
        <ThemeContext.Provider value={getTheme(uiTheme)}>
          <Toolbar
            leftElement="menu"
            centerElement={<Text style={[headerStyles.headerTitleStyle, {marginLeft: 0}]}>គ្រឹះស្ថានសិក្សា</Text>}
            onLeftElementPress={() => screenProps.drawerNavigation.navigate('DrawerOpen') }
          />
        </ThemeContext.Provider>,})
  },
  InstitutionDetail: {
    screen: InstitutionDetail,
  }
});

export default StacksOverTabs;
