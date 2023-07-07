import React, {useEffect} from 'react';
import GradientScrollViewComponent from '../../components/shared/GradientScrollViewComponent';
import CardItemComponent from '../../components/shared/cards/CardItemComponent';
import home_categories from '../../components/home/home_categories';
import HomeNavigationHeader from '../../components/home/HomeNavigationHeader'
import { View } from 'react-native';
import SidekiqService from '../../services/SidekiqService';
import visitService from '../../services/visit_service';

const HomeScreen = ({navigation}) => {
  useEffect(() => {
    const unsubscribe = SidekiqService.syncToServer();

    return () => {
      unsubscribe();
    };
  })

  const onPress = (item) => {
    // firebase.analytics().logEvent(item.firebase_event_name);
    visitService.recordVisitPage(item.visit_code, item.title);
    navigation.navigate(item.url);
  }

  const renderBody = () => {
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingBottom: 16}}>
        { home_categories.map((item, index) =>
          <CardItemComponent key={index} item={item} onPress={() => onPress(item)}/>
        )}
      </View>
    )
  }

  return (
    <GradientScrollViewComponent
      header={<HomeNavigationHeader/>}
      body={ renderBody() }
    />
  )
}

export default HomeScreen;
