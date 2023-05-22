import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
// import firebase from 'react-native-firebase';

import AppButton from '../../components/shared/button';
import { Colors } from '../../assets/style_sheets/main/colors';
import { FontSetting } from '../../assets/style_sheets/font_setting';

import ScrollableHeader from '../../components/scrollable_header';
import BackButton from '../../components/shared/back_button';
import { Content, Body, Right, Icon, CardItem } from 'native-base';
import ButtonList from '../../components/list/button_list';
import Text from '../../components/Text';
import { useSelector } from 'react-redux'
import { Dialog, Portal, Button } from 'react-native-paper';

const HollandHomeScreen = ({route, navigation}) => {
  const [visible, setVisible] = React.useState(false);
  const title = 'វាយតម្លៃមុខរបរនិងអាជីព';
  const currentUser = useSelector((state) => state.currentUser.value);

  const renderAboutItem = () => {
    return (
      <View style={{marginVertical: 12, backgroundColor: 'white'}}>
        <ButtonList
          hasLine={true}
          icon={{color: Colors.blue, src: require('../../assets/icons/others/info.png')}}
          onPress={() => { navigation.navigate('HollandAboutScreen') }}
          title='អំពីការធ្វើតេសវាយតម្លៃមុខរបរ និងអាជីព' />
      </View>
    )
  }

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
    navigation.navigate('HollandQuestionnaireScreen')
    // if(!currentUser) {
    //   return goToNewProfile();
    // }

    // showDialog();
  }

  const renderDialog = () => {
    return (
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Text>តើប្អូននឹងបន្តធ្វើតេស្តក្រោមគណនី {!!currentUser && currentUser.fullName}</Text>
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={goToPersonalUnderstandingTest}>បាទ/ចាស</Button>
            <Button onPress={goToNewProfile}>ចូលគណនីថ្មី</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  }

  const renderInstruction = () => {
    return (
      <Content>
        { renderAboutItem() }

        <CardItem>
          <Body>
            <Text>សួស្តីសាជាថ្មី</Text>
            <Text>ការធ្វើតេស្តវាយតម្លៃមុខរបរ និងអាជីព </Text>

            <AppButton style={styles.button} onPress={() => getStart() }>
              <Text style={styles.btnText}>ធ្វើតេស្តថ្មី</Text>
            </AppButton>
          </Body>
        </CardItem>
      </Content >
    )
  }

  renderContent = () => {
    return (
      <View>
        { renderInstruction() }
        { renderDialog() }
      </View>
    )
  }

  return(
    <ScrollableHeader
      renderContent={ renderContent }
      renderNavigation={ () => <BackButton /> }
      title={title}
      largeTitle={title}
    />
  )
}

export default HollandHomeScreen;

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
    fontWeight: 'bold'
  }
});
