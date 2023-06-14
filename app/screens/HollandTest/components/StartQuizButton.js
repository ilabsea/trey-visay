import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import AppButton from '../../../components/shared/button';
import { FontSetting } from '../../../assets/style_sheets/font_setting';
import Text from '../../../components/Text';
import ConfirmationModal from '../../../components/shared/ConfirmationModal';
import BoldLabelComponent from '../../../components/shared/BoldLabelComponent';
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import useAuth from "../../../auth/useAuth";

const StartQuizButton = () => {
  const { user } = useAuth();
  const [visible, setVisible] = React.useState(false);
  const navigation = useNavigation();

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const goToNewProfile = () => {
    hideDialog();
    navigation.navigate('ProfileFormScreen');
  }

  const goToPersonalUnderstandingTest = () => {
    hideDialog();
    navigation.navigate('PersonalUnderstandingTestScreen');
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
        onLeftPress={goToPersonalUnderstandingTest}
        onRightPress={goToNewProfile}
        onDismiss={() => setVisible(false)}
      />
      <AppButton style={styles.button} onPress={() => getStart() }>
        <Text style={styles.btnText}>ធ្វើតេស្តថ្មី</Text>
      </AppButton>
    </View>
  )
}

export default StartQuizButton;

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
