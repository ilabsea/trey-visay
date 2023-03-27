import React, {useEffect} from 'react';

import GradientScrollViewComponent from '../../components/shared/GradientScrollViewComponent';
import CardItemComponent from '../../components/shared/cards/CardItemComponent';
import home_categories from '../../components/home/home_categories';
import SplashScreen from 'react-native-splash-screen';
import {View} from 'react-native';
import User from '../../utils/user';
import { navigate } from '../../screens/StackNav/RootNavigation';

const HomeScreen = ({navigation}) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const handleLoginParams = (item) => {
    let option = Object.assign({}, item);
    option.params = {};

    if (option.url != 'CareerCounsellorStack' && option.url != 'PersonalityAssessmentStack') {
      return option;
    }

    if (!!User.getCurrent()) {
      return option;
    }

    option.params = { screen: 'Login', params: {from: option.url} };
    option.url = 'AccountStack';

    return option
  }

  const onPress = (item) => {
    let option = handleLoginParams(item);
    // firebase.analytics().logEvent(item.firebase_event_name);
    navigate(option.url, option.params);
  }

  const renderBody = () => {
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
        { home_categories.map((item, index) =>
          <CardItemComponent key={index} item={item} onPress={() => onPress(item)}/>
        )}
      </View>
    )
  }

  return (
    <GradientScrollViewComponent
      header={<></>}
      body={ renderBody() }
    />
  )
}

export default HomeScreen
