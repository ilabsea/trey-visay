import React from 'react'
import { View, Image, Alert } from 'react-native'

import Color from '../../themes/color';
import { Text, BackButton, FooterBar } from '../../components';
import images from '../../assets/images';
import ratings from './json/list_ratings';
import ScrollableHeader from '../../components/scrollable_header';

const HollandTestInstruction = ({route, navigation}) => {
  const renderRating = (item, index) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 16}} key={index}>
        <View style={{padding: 8, borderWidth: 1, borderRadius: 5, marginRight: 16, borderColor: Color.gray}}>
          <Image
            source={ images[item.icon] }
            style={{width: 50, height: 50}}
          />
        </View>

        <Text>{item.name}</Text>
      </View>
    )
  }

  const renderContent = () => {
    return (
      <View style={{padding: 16, backgroundColor: '#fff'}}>
        <Text style={{marginBottom: 16}}>
          ខាងក្រោមនេះ ជារូបតំណាងចំណាប់អារម្មណ៍ របស់អ្នកដែលអ្នកនឹងត្រូវចុចជ្រើសរើសយករូបតំណាងកម្រិតចំណាប់អារម្មណ៍ផ្ទាល់ខ្លួនណាមួយ បន្ទាប់ពីបានធ្វើការឆ្លុះបញ្ចាំងធៀបទៅ នឹងខ្លឹមសារដូចមានក្នុងល្បះនីមួយៗនៅទំព័របន្ទាប់
        </Text>

        { ratings.map(renderRating) }
      </View>
    )
  }

  const renderNavigation = () => {
    return (<BackButton buttonColor='#fff' />)
  }

  const handleAlert = () => {
    Alert.alert('', 'ប្អូនអ្នកចងចាំថា ការធ្វើតេស្ដនេះ មិនមាន ឡើយពាក្យថាជាប់ ឬធ្លាក់ ប៉ុន្ដែវាគឺជាមាគ៌ា មួយជួយដល់ប្អូនក្នុងសិក្សាឈ្វេងយល់ពី បុគ្គលិកលក្ខណៈផ្ទាល់ខ្លួន ផ្សារភ្ជាប់ទៅ នឹងជម្រើសមុខជំនាញសិក្សា និងអាជីព ការងារនាថ្ងៃអនាគតបានសមរម្យ!', [
      {
        text: 'បាទ/ចាស ខ្ញុំចងចាំ',
        onPress: () => navigation.navigate('HollandTest'),
      },
    ])
  }

  return (
    <View style={{flex: 1}}>
      <ScrollableHeader
        backgroundColor={Color.blue}
        textColor={'#fff'}
        statusBarColor={Color.blueStatusBar}
        barStyle={'light-content'}
        renderContent={ renderContent }
        renderNavigation={ renderNavigation }
        title={'តេស្តបុគ្គលិកលក្ខណៈ'}
        largeTitle={'តេស្តបុគ្គលិកលក្ខណៈ'}
      />

      <FooterBar icon='keyboard-arrow-right' text='បន្តទៀត' onPress={handleAlert} />
    </View>
  )
}

export default HollandTestInstruction
