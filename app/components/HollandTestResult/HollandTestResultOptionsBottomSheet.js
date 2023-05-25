import React from 'react';
import { View } from 'react-native';
import {Divider} from 'react-native-paper';

import Text from '../Text';
import ButtonList from '../list/button_list';
import Color from '../../themes/color';
import {FontFamily} from '../../themes/font';
import {FontSetting} from '../../assets/style_sheets/font_setting'

const HollandTestResultOptionsBottomSheet = () => {
  const renderButton = (label) => {
    return <React.Fragment>
              <ButtonList title={label} boldFont={{color: 'black', fontFamily: FontFamily.bold, fontSize: FontSetting.title}} buttonListStyle={{height: 56}} />
              <Divider style={{backgroundColor: Color.grayColor}}/>
           </React.Fragment>
  }

  return (
    <View style={{marginTop: 16, flex: 1}}>
      <Text style={{color: 'black', paddingHorizontal: 16, marginBottom: 8}}>
        សូមប្អូនបន្តសិក្សាឈ្វេងយល់បន្ថែម និងជ្រើសរើសមុខជំនាញសិក្សា ឬអាជីពការងារដែលស័ក្ដិសមនឹងបុគ្គលិកលក្ខណៈរបស់ប្អូន!
      </Text>

      {renderButton('ជំនាញកម្រិតឧត្ដមសិក្សា')}
      {renderButton('អាជីពការងារស័ក្ដិសម')}
    </View>
  )
}

export default HollandTestResultOptionsBottomSheet