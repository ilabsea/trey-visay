import React from 'react'
import {View} from 'react-native'
import Svg, {Polygon} from 'react-native-svg'

import BoldLabelComponent from '../shared/BoldLabelComponent';
import Color from '../../themes/color';

const ProgressArrow = ({step}) => {
  const progressStepStyles = (index) => {
    let defaultStyles = { width: '100%', height: 12, justifyContent: 'center', width: '100%', position: 'relative' }
    return (index + 1 == step) ? {...defaultStyles, backgroundColor: 'white'} : defaultStyles
  }

  const renderArrowHead = (index) => {
    if (index >= 6) return;

    const color = index == (step - 2) ? Color.blue : 'white'
    const points = (index == (step - 1) || index == (step - 2)) ? "20,0 28,15 20,30 18,30 18,0" : "20,0 28,15 20,30 18,30 26,15 18,0"
    return <Svg height="30" width="30" style={{position: 'absolute', right: -22, top: 0}}>
              <Polygon points={points} fill={color} scale="0.4" />
           </Svg>
  }

  const renderArrows = () => {
    return [...Array(5)].map((num, index) => {
      return <View key={`arrow-${index}`} style={{zIndex: 7 - index, flex: 1}}>
                <View style={progressStepStyles(index)}>
                  {renderArrowHead(index)}
                  <BoldLabelComponent label={index + 1} style={{alignSelf: 'center', marginLeft: 2, paddingTop: 0.3, fontSize: 9, color: index + 1 == step ? Color.blue : 'white'}}/>
                </View>
             </View>
    })
  }

  return <View style={{flexDirection: 'row', borderWidth: 0.8, borderColor: 'white', borderLeftWidth: 0, borderRightWidth: 0, backgroundColor: Color.blue}}>
            {renderArrows()}
         </View>
}

export default ProgressArrow