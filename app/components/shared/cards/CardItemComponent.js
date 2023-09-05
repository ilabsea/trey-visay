import React from 'react';
import {View} from 'react-native'

import HorizontalCardComponent from './HorizontalCard/HorizontalCardComponent';
import TiltedCardComponent from './TitledCard/TitledCardComponent';
import {ROW_CARD, TILTED_CARD} from '../../../constants/card_constant';
import {getStyleOfDevice} from '../../../utils/responsive_util';

export default function CardListComponent({item, onPress}) {
  const renderCard = () => {
    switch (item.display) {
      case ROW_CARD:
        return <HorizontalCardComponent
                  item={item}
                  containerStyle={{marginTop: 16}}
                  onPress={onPress}
                />
        break;
      default:
        return <TiltedCardComponent
                  item={item}
                  containerStyle={{marginTop: getStyleOfDevice(68, 50), elevation: 0}}
                  onPress={onPress}
                />
    }
  }

  return renderCard();
}
