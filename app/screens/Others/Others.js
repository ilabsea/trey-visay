import React, { useEffect } from 'react';
import {
  View,
  StatusBar,
  Platform
} from 'react-native';
import ButtonList from '../../components/list/button_list';
import Color from '../../themes/color';
import ScrollableHeader from '../../components/scrollable_header';
import MyStatusBar from '../../components/shared/status_bar';
import Share from 'react-native-share';
// import firebase from 'react-native-firebase';
import keyword from '../../data/analytics/keyword';
import useAuth from "../../auth/useAuth";
import { useNavigation } from '@react-navigation/native';

export default function Others(props) {
  const { user, logOut } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS == 'android') {
      StatusBar.setBackgroundColor(Color.grayStatusBar);
      StatusBar.setBarStyle('dark-content');
    }
  }, []);

  const onPressShareApp = () => {
    let url = Platform.OS === 'ios' ? 'https://apps.apple.com/kh/app/trey-visay/id1445506569' : 'https://play.google.com/store/apps/details?id=com.treyvisay';

    let shareOptions = {
      title: 'កម្មវិធីត្រីវិស័យ',
      message: 'ជាកម្មវិធីព្រឹក្សាអាជីពការងារ',
      url: url,
      subject: "កម្មវិធីត្រីវិស័យ"
    };

    Share.open(shareOptions).then((res) => {
      // firebase.analytics().logEvent(keyword.SHARE_APP);
    })
  }

  const renderContent = () => {
    return (
      <View>
        <MyStatusBar />
        <View style={{marginTop: 16, backgroundColor: 'white'}}>
          <ButtonList
            hasLine={true}
            icon={{color: Color.blue, src: require('../../assets/icons/others/info.png')}}
            onPress={() => { navigation.navigate('About') }}
            title='អំពីកម្មវិធី' />
        </View>

        <View style={{marginTop: 16, backgroundColor: 'white'}}>
          <ButtonList
            hasLine={true}
            icon={{color: 'rgb(53, 174, 235)', src: require('../../assets/icons/others/share.png')}}
            onPress={() => onPressShareApp() }
            title='Share App' />

          <ButtonList
            hasLine={true}
            icon={{color: 'rgb(172, 175, 193)', src: require('../../assets/icons/others/term_condition.png')}}
            onPress={() => { navigation.navigate('TermsCondition') }}
            title='Terms & Conditions' />
        </View>

      </View>
    );
  }

  return (
    <ScrollableHeader
      renderContent={ renderContent }
      title={'ផ្សេងៗ'}
      largeTitle={'ផ្សេងៗ'}
    />
  )
}
