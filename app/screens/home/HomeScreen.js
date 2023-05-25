import React from 'react';
import GradientScrollViewComponent from '../../components/shared/GradientScrollViewComponent';
import CardItemComponent from '../../components/shared/cards/CardItemComponent';
import home_categories from '../../components/home/home_categories';
import { View } from 'react-native';

const HomeScreen = ({navigation}) => {
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

export default HomeScreen;
