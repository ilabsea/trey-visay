import React from 'react';
import {View, Text } from 'react-native';
import scrollHeaderStyles from '../../assets/style_sheets/scroll_header';
import { Icon } from 'native-base';
import Color from '../../themes/color';

const ProgressStep = (props) => {
  const renderNumberIcon = (step) => {
    let iconStyle = props.step == step ? {} : scrollHeaderStyles.inactiveIcon;

    return (
      <View key={step}>
        { props.step > step &&
          <View style={[scrollHeaderStyles.numberWrapper, scrollHeaderStyles.doneIconWrapper]} >
            <View style={[scrollHeaderStyles.doneIcon]}>
              <Icon name='checkmark' style={{fontSize: 12, color: Color.blue}} />
            </View>
          </View>
        }

        <View style={scrollHeaderStyles.numberWrapper} key={step}>
          <View style={[scrollHeaderStyles.numberIcon, iconStyle]}>
            <Text style={scrollHeaderStyles.iconText}>{step}</Text>
          </View>
        </View>
      </View>
    )
  }

  const renderLine = (key) => {
    return <View style={scrollHeaderStyles.line} key={key}></View>
  }
    
  const renderContent = () => {
    let arr = [1, 2, 3, 4, 5];
    let doms = [];

    for(let i=0; i<arr.length; i++) {
      let step = i + 1;
      doms.push(renderNumberIcon(step));

      if (i != arr.length-1) {
        let key = arr.length + step + 1;
        doms.push(renderLine(key))
      }
    }
    return doms
  }

  return (
    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 12}}>
      {renderContent()}
    </View>
  )
}

export default ProgressStep