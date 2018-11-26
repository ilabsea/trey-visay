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
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

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
      title: 'គ្រឹះស្ថានសិក្សា',
      headerTitleStyle: [headerStyles.headerTitleStyle, {marginLeft: -100}],
      headerStyle: headerStyles.headerStyle,
      headerLeft:(<TouchableOpacity onPress={()=> {screenProps.drawerNavigation.openDrawer()} } style={{marginHorizontal: 16}}>
                    <MaterialIcon name='menu' color='#fff' size={24} />
                  </TouchableOpacity>)})
  },
  InstitutionDetail: {
    screen: InstitutionDetail,
  }
});

export default StacksOverTabs;
