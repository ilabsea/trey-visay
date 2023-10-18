import React from 'react';

import {View} from 'react-native';
import { Text } from '../../components';
import Color from '../../themes/color';
import {FontFamily} from '../../themes/font';
import {getStyleOfOS} from '../../utils/responsive_util';

const InfoAccordionContent = ({info}) => {
  const renderNoData = (style) => {
    return <Text style={[{color: Color.blackColor}, style]}>មិនទាន់មានទិន្នន័យ</Text>
  }

  const renderDetail = (detail, style) => {
    if (!detail)
      return renderNoData(style)

    if (Array.isArray(detail))
      return detail.length == 0 ? renderNoData(style) : renderUnorderedList(detail.map(item => item.name)) 

    let arr = (detail + "").split('- ');
    let arr2 = (arr.slice(1, arr.length) || []);

    return (
      <View style={style}>
        { (!!arr[0] && arr[0] != ' ') &&
          <Text style={{color: Color.blackColor}}>
            { arr[0] }
          </Text>
        }
        {renderUnorderedList(arr2, !!arr[0])}
      </View>
    )
  }

  const renderUnorderedList = (items, hasTitle) => {
    return items.map((item, i) => {
      return <View key={`detail-${i}`} style={[{flexDirection: 'row', paddingRight: 10}, hasTitle && {marginLeft: 12}]}>
                <Text style={{fontSize: getStyleOfOS(6, 10), marginRight: 8, marginTop: getStyleOfOS(0, -1)}}>{'\u2B24'}</Text>
                <Text>{item.split('\r\n')[0]}</Text>
             </View>
    })
  }

  const renderAccordionDetail = () => {
    if(!info.children.length)
      return renderDetail(info.detail)

    return (
      <View>
        {info.children.map((obj, i) =>
          <View key={i}>
            <Text style={{color: Color.gray, marginTop: i == 0 ? 0 : 12, fontFamily: FontFamily.bold}}>{obj.title}</Text>
            { renderDetail(obj.detail, {marginLeft: 12}) }
          </View>
        )}
      </View>
    )
  }

  return renderAccordionDetail()
}

export default InfoAccordionContent