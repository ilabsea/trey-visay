import {
  StackNavigator,
} from 'react-navigation';

import PersonalUnderstandingForm from './personal_understanding_form/personal_understanding_form';

const AppNav = StackNavigator({

  PersonalUnderstandingForm: {screen: PersonalUnderstandingForm},
});

export default AppNav;
