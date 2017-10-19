import {
  StackNavigator,
} from 'react-navigation';

import PersonalUnderstandingForm from './PersonalUnderstandingForm/PersonalUnderstandingForm';

const AppNav = StackNavigator({
  PersonalUnderstandingForm: {screen: PersonalUnderstandingForm},
});

export default AppNav;
