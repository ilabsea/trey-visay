import React, { useEffect } from 'react';
import { View, Text, StatusBar, Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import CarouselView from '../../components/home/carousel_view';

import { Header } from "native-base";

import SchoolUtil from '../../utils/School/School';
import scrollHeaderStyles from '../../assets/style_sheets/scroll_header';

export default function Home({ navigation }) {
  const height = Platform.OS == 'android' ? 140 - StatusBar.currentHeight : 140;

  useEffect(() => {
    SplashScreen.hide();

    const unsubscribe = navigation.addListener('focus', () => {
      SchoolUtil.clearSelectedValues();

      if (Platform.OS == 'android') {
        StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.251)');
        StatusBar.setBarStyle('dark-content');
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{flex: 1}}>
      <Header
        span
        androidStatusBarColor="rgba(0, 0, 0, 0.251)"
        style={{backgroundColor: '#fff', height: height}}
      >
        <Text style={[scrollHeaderStyles.largeTitle, scrollHeaderStyles.largeTitlePosition]}>ទំព័រដេីម</Text>
      </Header>

      <CarouselView />
    </View>
  );
}
