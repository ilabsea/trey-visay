import React from 'react';
import {
  TabNavigator,
} from 'react-navigation';

import SkillScreen from './skill_screen';
import UniversityScreen from './university_screen';

const InstitutionTab = TabNavigator({
  University: { screen: UniversityScreen },
  Skill: { screen: SkillScreen },
}, {
  tabBarPosition: 'top',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});


export default InstitutionTab;
