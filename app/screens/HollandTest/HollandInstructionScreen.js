import React from 'react'
import { View, Image, BackHandler } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';

import Color from '../../themes/color';
import { Text, FooterBar } from '../../components';
import images from '../../assets/images';
import ratings from './json/list_ratings';
import ScrollableHeader from '../../components/scrollable_header';
import ConfirmationModal from '../../components/shared/ConfirmationModal';

const HollandTestInstruction = ({route, navigation}) => {
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

  return (
    <View style={{flex: 1}}>
      <ScrollableHeader
        backgroundColor={Color.blue}
        textColor={'#fff'}
        statusBarColor={Color.blueStatusBar}
        barStyle={'light-content'}
        renderContent={ renderContent }
        onPressBack={() => navigation.popToTop()}
        title={'តេស្តបុគ្គលិកលក្ខណៈ'}
        largeTitle={'តេស្តបុគ្គលិកលក្ខណៈ'}
        buttonColor={Color.whiteColor}
      />

      <ConfirmationModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        message={() => <Text>ប្អូនត្រូវ​ចងចាំថាការធ្វើតេស្ដនេះមិនមានឡើយពាក្យថាជាប់ ឬធ្លាក់ ប៉ុន្ដែវាគឺជាមាគ៌ាមួយជួយដល់ប្អូនក្នុងការ​សិក្សាឈ្វេងយល់ពីបុគ្គលិកលក្ខណៈផ្ទាល់ខ្លួន ផ្សារភ្ជាប់ទៅនឹងជម្រើសមុខជំនាញសិក្សា និងអាជីពការងារនាថ្ងៃអនាគតបានសមរម្យ!</Text>}
        rightButtonLabel='បាទ/ចាស ខ្ញុំចងចាំ'
        onRightPress={() => {
          setModalVisible(false)
          navigation.navigate('HollandQuestionnaireScreen')
        }}
      />
      <FooterBar icon='keyboard-arrow-right' text='បន្តទៀត' onPress={() => setModalVisible(true)} />
    </View>
  )
}

export default HollandTestInstruction
