import React from 'react';
import { View, FlatList } from 'react-native';

const CarouselItem = (props) =>  {
  return (
    <FlatList
      contentContainerStyle={{paddingHorizontal: 22, marginTop: 4}}
      data={props.data}
      keyExtractor={(option, index) => `${option.value.toString()}_${index}`}
      renderItem={({ item, index }) => props.renderItem({item, index})}
      horizontal={true}
      ItemSeparatorComponent={<View style={{width: 20}}/>}
      showsHorizontalScrollIndicator={false}
    />
  )
}

export default CarouselItem;
