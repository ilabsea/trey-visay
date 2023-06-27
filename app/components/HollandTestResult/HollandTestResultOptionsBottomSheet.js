import React from 'react';
import { View } from 'react-native';
import {Divider} from 'react-native-paper';

import Text from '../Text';
import ButtonList from '../list/button_list';
import Color from '../../themes/color';
import {FontFamily} from '../../themes/font';
import {FontSetting} from '../../assets/style_sheets/font_setting'

const options = [
  { name: "ជំនាញកម្រិតឧត្ដមសិក្សា", route: 'MajorSelectMultipleScreen' },
  { name: "អាជីពការងារស័ក្ដិសម", route: 'JobSelectMultipleScreen' },
];

const HollandTestResultOptionsBottomSheet = ({navigation, modalRef, quiz}) => {
  const renderButton = (option, index) => {
    return <React.Fragment key={index} >
              <ButtonList
                onPress={ () => {
                  modalRef.current?.dismiss();
                  navigation.navigate(option.route, {quizUuid: quiz.uuid});
                }}
                title={option.name} boldFont={{color: 'black', fontFamily: FontFamily.bold, fontSize: FontSetting.title}} buttonListStyle={{height: 56}} />
              <Divider style={{backgroundColor: Color.grayColor}} />
           </React.Fragment>
  }

  return (
    <View style={{marginTop: 16, flex: 1}}>
      <Text style={{color: 'black', paddingHorizontal: 16, marginBottom: 8}}>
        សូមប្អូនបន្តសិក្សាឈ្វេងយល់បន្ថែម និងជ្រើសរើសមុខជំនាញសិក្សា ឬអាជីពការងារដែលស័ក្ដិសមនឹងបុគ្គលិកលក្ខណៈរបស់ប្អូន!
      </Text>

      { options.map((option, index) => renderButton(option, index)) }
    </View>
  )
}

export default HollandTestResultOptionsBottomSheet
