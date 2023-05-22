import React, {useEffect} from 'react';

import GradientScrollViewComponent from '../../components/shared/GradientScrollViewComponent';
import CardItemComponent from '../../components/shared/cards/CardItemComponent';
import home_categories from '../../components/home/home_categories';
import SplashScreen from 'react-native-splash-screen';
import {View} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const onPress = (item) => {
    // firebase.analytics().logEvent(item.firebase_event_name);
    navigation.navigate(item.url);
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
