// https://codeburst.io/custom-drawer-using-react-navigation-80abbab489f7

import React, {Component} from 'react';
import { DrawerItems } from 'react-navigation';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';

// Utils
import realm from '../schema';
import User from '../utils/user';
import headerStyles from '../assets/style_sheets/header';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default DrawerMenu = (props) => {

  let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
  let photo = require('../assets/images/default_profile.png');
  let cover = require('../assets/images/header_bg.jpg');

  if (!!user && !!user.photo) {
    photo = {uri: user.photo};
  }
  if (!!user && !!user.cover) {
    cover = {uri: user.cover};
  }

  let isOpen = true;

  function toggleScreen() {
    isOpen = !isOpen;
  }

  return (
    <ScrollView>
      <TouchableNativeFeedback onPress={() => toggleScreen()}>
        <View>
          <View style={{position: 'relative'}}>
            <Image
              source={cover}
              style={{width: null, height: 180}} />
          </View>

          <View style={{position: 'absolute', top: 24, left: 24}}>
            <Image
              source={photo}
              style={{borderRadius: 32, width: 64, height: 64 }} />
          </View>

          <View style={{position: 'absolute', bottom: 0, left: 0, padding: 24, flexDirection: 'row'}}>
            <Text style={styles.name}>{!!user && user.fullName}</Text>
            { isOpen && <AwesomeIcon name='caret-down' color='#fff' size={24} /> }
            { !isOpen && <AwesomeIcon name='caret-up' color='#fff' size={24} /> }
          </View>
        </View>
      </TouchableNativeFeedback>

      <View>
        <DrawerItems {...props} />
      </View>

      <View>
        <TouchableOpacity>
          <View style={styles.row}>
            <AwesomeIcon name='key' size={18} style={styles.icon} />
            <Text>ប្តូរលេខសម្ងាត់</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.row}>
            <AwesomeIcon name='unlock-alt' size={18} style={styles.icon} />
            <Text>ចាកចេញពីគណនី</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  name: {
    fontSize: 14,
    fontFamily: 'KhmerOureang',
    color: '#fff',
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16
  },
  icon: {
    width: 54
  }
});
