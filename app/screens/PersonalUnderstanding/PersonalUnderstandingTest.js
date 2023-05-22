import React, {Component, useRef} from 'react';
import {
  Text,
  View,
  Platform,
} from 'react-native';

// import Toast, { DURATION } from 'react-native-easy-toast';

import QuestionForm from './QuestionForm';
import realm from '../../db/schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';

import * as Progress from 'react-native-progress';
import { FooterBar, BackButton, ScrollableHeader } from '../../components';
import { Colors } from '../../assets/style_sheets/main/colors';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import firebase from 'react-native-firebase';
import Toast, { DURATION } from 'react-native-easy-toast';
import keyword from '../../data/analytics/keyword';
// import navigate from '../StackNav/RootNavigation';
// import { useNavigation } from '@react-navigation/native';

import { Form, SubmitButton } from '../../components/forms';

export default PersonalUnderstandingTest = ({navigation}) => {
  const toastRef = useRef();
  // const navigation = useNavigation();

  const _renderContent = () => {
    return (<QuestionForm />)
  }

  const _renderNavigation = () => {
    return (<BackButton buttonColor='#fff' onPress={() => navigation.popToTop()} />)
  }

  // Todo
  const submitForm = () => {
    // let user = User.getCurrent();
    // let game = user.games[user.games.length - 1];
    // let list = game.personalUnderstandings;

    // realm.write(() => {
    //   // firebase.analytics().logEvent(resultKeyword);

    //   list.push(values);

    // });
  }

  const handleSubmit = (values, {resetForm}) => {
    if (!!values && !Object.keys(values).length) {
      return toastRef.current?.show('សូមបំពេញសំណួរខាងក្រោមជាមុនសិន...!', DURATION.SHORT);
    }

    navigation.navigate('HollandInstructionScreen')
    // resetForm();
    // resetForm({values: {"3_1": null, "4_1": null}});
  }

  return (
    <Form
      initialValues={{}}
      onSubmit={ handleSubmit }>

      <View style={{flex: 1}}>
        <ScrollableHeader
          backgroundColor={Colors.blue}
          textColor={'#fff'}
          statusBarColor={Colors.blueStatusBar}
          barStyle={'light-content'}
          renderContent={ _renderContent }
          renderNavigation={ _renderNavigation }
          title={'ស្វែងយល់ពីខ្លួនឯង'}
          largeTitle={'ស្វែងយល់ពីខ្លួនឯង'}
        />

        { <SubmitButton title="បន្តទៀត"/> }
      </View>

      <Toast ref={toastRef} positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
    </Form>
  )
}
