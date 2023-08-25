import React from 'react';
import { View, ScrollView } from 'react-native';

import Text from '../../components/Text';
import CustomNavigationHeader from '../../components/shared/CustomNavigationHeader';
import BoldLabelComponent from '../../components/shared/BoldLabelComponent';
import {screenHorizontalPadding} from '../../constants/component_constant';
import characteristics from '../../components/HollandTestResult/json/characteristics';

const HollandAboutScreen = ({route, navigation}) => {
  renderCharacteristics = () => {
    const items = [
      { shortcut: 'R', label: 'ប្រភេទប្រាកដនិយម (Realistic-R: Doers' },
      { shortcut: 'I', label: 'ប្រភេទពូកែអង្កេត (Investigative-I: Thinkers)' },
      { shortcut: 'A', label: 'ប្រភេទសិល្បៈ (Artistic-A: Creators)' },
      { shortcut: 'S', label: 'ប្រភេទសង្គម (Social-S: Helpers)' },
      { shortcut: 'E', label: 'ប្រភេទសហគ្រិន (Enterprising-E: Persuaders)' },
      { shortcut: 'C', label: 'ប្រភេទសណ្ដាប់ធ្នាប់ (Conventional-C: Organizers)' },
    ]
    return items.map((item, index) => {
      const color = characteristics.filter(characteristic => characteristic.shortcut == item.shortcut)[0].color;
      return (
        <View key={index} style={{flexDirection: 'row', alignItems: 'center', height: 62}}>
          <View style={{borderWidth: 2, borderRadius: 6, width: 38, height: 38, marginRight: 10, justifyContent: 'center', alignItems: 'center', borderColor: color}}>
            <Text style={{color: color, fontWeight: 'bold', lineHeight: 20}}>{item.shortcut}</Text>
          </View>
          <Text style={{flexShrink: 1, lineHeight: 28}}>{item.label}</Text>
        </View>
      )
    });
  }

  renderContent = () => {
    return (
      <View style={{padding: screenHorizontalPadding, paddingTop: 8, backgroundColor: 'white', flex: 1}}>
        <Text style={{marginBottom: 10}}>
          លោកបណ្ឌិត John Holland ជាចិត្តវិទូសញ្ជាតិអាមេរិក បានបង្កើត <BoldLabelComponent label="«ទ្រឹស្ដីហូឡែន ឬហូឡែនកូដ» "/>
          ដោយផ្ដោតលើការវិភាគពីចំណាប់អារម្មណ៍របស់មនុស្ស ដើម្បីកំណត់ពីបរិស្ថាន ការងារ ដែលគេចូលចិត្ត និងស្របតាមលក្ខណៈសម្បត្តិរបស់ពួកគេ។ ឧបករណ៍តេស្ដស្វ័យវាយតម្លៃហូឡែនកូដនេះ ត្រូវបានប្រើប្រាស់ ដើម្បីជួយឱ្យសិស្ស និស្សិត ឬអ្នកស្វែងរកការងារធ្វើ អាចបន្ស៊ីចំណាប់អារម្មណ៍ផ្ទាល់ខ្លួនទៅនឹងការជ្រើសរើស មុខជំនាញសិក្សា និងអាជីពការងារ បានសមរម្យទៅតាមស្ថានភាពបុគ្គលរៀងៗខ្លួន។ នៅពេលអនុវត្តតេស្ដ ហូឡែនកូដនេះចប់ អ្នកនឹងទទួលបានកូដផ្ទាល់ខ្លួន ៣អក្សរ ដែលបញ្ជាក់អំពីប្រភេទបុគ្គលិកលក្ខណៈ។ អ្នកអាចប្រើប្រាស់កូដដែលទទួលបាននោះ ដើម្បីជ្រើស​រើសមុខជំនាញសិក្សា ឬអាជីពការងារដែលស័ក្ដិសមនឹងអ្នក។
        </Text>

        <Text style={{marginVertical: 12}}>តាមរយៈទ្រឹស្ដីហូឡែននេះ បុគ្គលិកលក្ខណៈរបស់មនុស្សត្រូវបានបែងចែកជា <BoldLabelComponent label="៦ ក្រុម" /> (RIASEC)៖</Text>
        { renderCharacteristics() }
      </View>
    )
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <CustomNavigationHeader title='អំពីការវាយតម្លៃមុខរបរនិងអាជីព' headerStyle={{zIndex: 1}} />
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 16}}>
        {renderContent()}
      </ScrollView>
    </View>
  )
}

export default HollandAboutScreen