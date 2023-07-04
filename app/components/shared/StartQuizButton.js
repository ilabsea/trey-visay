import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'

import AppButton from './button';
import { FontSetting } from '../../assets/style_sheets/font_setting';
import Text from '../Text';
import ConfirmationModal from './ConfirmationModal';
import BoldLabelComponent from './BoldLabelComponent';
import useAuth from "../../auth/useAuth";
import IntelligentQuiz from '../../models/IntelligentQuiz';
import {setCurrentQuiz} from '../../redux/features/quiz/intelligentQuizSlice';
import {resetAnswer} from '../../redux/features/quiz/intelligentSlice';

const StartQuizButton = ({type}) => {
  const { user } = useAuth();
  const [visible, setVisible] = React.useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentIntelligentQuiz = useSelector((state) => state.currentIntelligentQuiz.value);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const goToNewProfile = () => {
    hideDialog();
    navigation.navigate('ProfileFormScreen', {type: type});
  }

  const startWithCurrentUser = () => {
    hideDialog();
    if (type == 'hollandTest')
      return navigation.navigate('PersonalUnderstandingTestScreen');

    IntelligentQuiz.write(() => {
      const intelligentQuiz = IntelligentQuiz.create({userUuid: user.uuid});
      if (!!currentIntelligentQuiz)
        IntelligentQuiz.delete(currentIntelligentQuiz.uuid);

      dispatch(setCurrentQuiz(intelligentQuiz));
      dispatch(resetAnswer());
    })
    navigation.navigate('MultiIntelligentInstructionScreen');
  }

  const getStart = () => {
    if(!user) {
      return goToNewProfile();
    }

    showDialog();
  }

  return (
    <View style={{flex: 1}}>
      <ConfirmationModal
        visible={visible}
        message={() => <Text>តើប្អូននឹងបន្តធ្វើតេស្តក្រោមគណនី <BoldLabelComponent label={!!user && user.fullName} /> ដែរឬទេ?</Text>}
        leftButtonLabel='បាទ/ចាស'
        rightButtonLabel='ចូលគណនីថ្មី'
        onLeftPress={startWithCurrentUser}
        onRightPress={goToNewProfile}
        onDismiss={() => setVisible(false)}
      />
      <AppButton style={styles.button} onPress={() => getStart() }>
        <Text style={styles.btnText}>ធ្វើតេស្តថ្មី</Text>
      </AppButton>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '100%',
    marginTop: 20
  },
  btnText: {
    fontSize: FontSetting.button_text,
    color: '#fff',
  }
});

export default StartQuizButton;