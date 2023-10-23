import React, {useEffect} from 'react'
import { View, ScrollView, BackHandler } from 'react-native'
import { Text, FooterBar } from '../../components';
import { Card } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import ConfirmationModal from '../../components/shared/ConfirmationModal';
import HtmlRenderComponent from '../../components/shared/HtmlRenderComponent';
import CustomNavigationHeader from '../../components/shared/CustomNavigationHeader';
import SchoolList from '../../components/schools/school_list';
import Quiz from '../../models/Quiz';
import {screenHorizontalPadding} from '../../constants/component_constant';
import { FontSetting } from '../../assets/style_sheets/font_setting';
import School from '../../models/School';

const MajorRecommendationScreen = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const currentQuiz = Quiz.findByUuid(route.params.quizUuid);
  const major = currentQuiz.selectedMajor || {};

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.dispatch(StackActions.replace('HollandNavigator'))
      return true;
    })
    return () => !!backHandler && backHandler.remove()
  }, [])

  const renderModal = () => {
    return <ConfirmationModal visible={modalVisible} message={() => <Text>តើអ្នកចង់បន្តឈ្វេងយល់ពីជម្រើសអាជីពការងារស័ក្តិសមសម្រាប់អ្នកទៀតដែរឬទេ?</Text>}
              leftButtonLabel='បញ្ចប់ត្រឹមនេះ'
              rightButtonLabel='បាទ/ចាស បន្ត'
              onLeftPress={() => {
                setModalVisible(false)
                navigation.dispatch(StackActions.replace('HollandNavigator'))
              }}
              onRightPress={() => {
                setModalVisible(false)
                navigation.navigate('JobSelectMultipleScreen', {quizUuid: currentQuiz.uuid})
              }}
           />
  }

  const onPressDone = () => {
    if (!currentQuiz.jobCodeSelected)
      return setModalVisible(true)
    
    navigation.dispatch(StackActions.replace('HollandNavigator'))
  }

  const renderTitle = (label) => {
    return <Text style={{marginLeft: screenHorizontalPadding, fontSize: FontSetting.title, marginBottom: 6, marginTop: 16}}>{label}</Text>
  }

  const renderRelatedSchools = () => {
    const schools = major.school_ids.map(schoolId => School.findById(schoolId));
    return (
      <React.Fragment>
        {renderTitle('គ្រឺះស្ថានសិក្សា')}
        <SchoolList navigation={navigation} data={schools} />
      </React.Fragment>
    )
  }

  return (
    <View style={{flex: 1}}>
      <CustomNavigationHeader title='ជម្រើសជំនាញកម្រិតឧត្តមសិក្សា' headerStyle={{zIndex: 1}} onPressBack={() => navigation.dispatch(StackActions.replace('HollandNavigator'))} />
      <ScrollView>
        {renderTitle('ការផ្តល់អនុសាសន៍')}
        <Card style={{padding: 16}}>
          <HtmlRenderComponent source={!!major.recommendation ? major.recommendation : 'មិនមានអនុសាសន៍'} />
        </Card>
        {renderRelatedSchools()}
      </ScrollView>
      {renderModal()}
      <FooterBar icon='keyboard-arrow-right' text='រួចរាល់' onPress={() => onPressDone()} />
    </View>
  )
}

export default MajorRecommendationScreen;
