import React from 'react'
import { View, Image, BackHandler } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';

import Color from '../../themes/color';
import { Text, FooterBar } from '../../components';
import images from '../../assets/images';
import ScrollableHeader from '../../components/scrollable_header';
import ConfirmationModal from '../../components/shared/ConfirmationModal';

const ratings = [
  {
    "name": "មិនឯកភាពទាំងស្រុង",
    "icon": "very_dislike",
    "value": 1
  },
  {
    "name": "មិនឯកភាព",
    "icon": "dislike",
    "value": 2
  },
  {
    "name": "ឯកភាព",
    "icon": "like",
    "value": 3
  },
  {
    "name": "ឯកភាពទាំងស្រុង",
    "icon": "very_like",
    "value": 4
  }
]

const MultiIntelligentInstructionScreen = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  let backHandler = null
  useFocusEffect(
    React.useCallback(() => {
      backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.popToTop()
        return true;
      })
      return () => !!backHandler && backHandler.remove()
    }, [])
  )

  const renderRating = (item, index) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 16}} key={index}>
        <View style={{padding: 8, borderWidth: 1, borderRadius: 5, marginRight: 16, borderColor: Color.gray}}>
          <Image source={ images[item.icon] } style={{width: 50, height: 50}} />
        </View>

        <Text>{item.name}</Text>
      </View>
    )
  }

  const renderContent = () => {
    return (
      <View style={{padding: 16, backgroundColor: '#fff'}}>
        <Text style={{marginBottom: 10}}>
          ក្នុងតេស្តពហុបញ្ញានេះ អ្នកនឹងត្រូវឆ្លើយសំណួរចំនួន ៣៥ ដែលសួរអំពីខ្លួនអ្នក។
        </Text>
        <Text style={{marginBottom: 13}}>
          ចូរអ្នកឆ្លើយដោយយកចិត្តទុកដាក់តាមរយៈការកំណត់ពិន្ទុដូចខាងក្រោម
        </Text>

        { ratings.sort((a, b) => b.value - a.value).map(renderRating) }
      </View>
    )
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollableHeader
        backgroundColor={Color.blue}
        textColor={'#fff'}
        statusBarColor={Color.blueStatusBar}
        barStyle={'light-content'}
        renderContent={ renderContent }
        onPressBack={() => navigation.popToTop()}
        title={'តេស្តពហុបញ្ញា'}
        largeTitle={'តេស្តពហុបញ្ញា'}
        buttonColor={Color.whiteColor}
      />

      <ConfirmationModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        message={() => <Text>ប្អូនត្រូវ​ចងចាំថាការធ្វើតេស្ដនេះមិនមានឡើយពាក្យថាជាប់ ឬធ្លាក់ ប៉ុន្ដែវាគឺជាមាគ៌ាមួយជួយដល់ប្អូនក្នុងការ​សិក្សាឈ្វេងយល់ពីបុគ្គលិកលក្ខណៈផ្ទាល់ខ្លួន ផ្សារភ្ជាប់ទៅនឹងជម្រើសមុខជំនាញសិក្សា និងអាជីពការងារនាថ្ងៃអនាគតបានសមរម្យ!</Text>}
        rightButtonLabel='បាទ/ចាស ខ្ញុំចងចាំ'
        onRightPress={() => {
          setModalVisible(false)
          navigation.navigate('MultiIntelligentQuestionnaireScreen')
        }}
      />
      <FooterBar icon='keyboard-arrow-right' text='បន្តទៀត' onPress={() => setModalVisible(true)} />
    </View>
  )
}

export default MultiIntelligentInstructionScreen
