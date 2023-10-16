import React, { useEffect } from 'react';
import {
  View,
  StatusBar,
  Platform
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonList from '../../components/list/button_list';
import Color from '../../themes/color';
import ScrollableHeader from '../../components/scrollable_header';
import MyStatusBar from '../../components/shared/status_bar';
import Share from 'react-native-share';
// import firebase from 'react-native-firebase';
import keyword from '../../data/analytics/keyword';
import useAuth from "../../auth/useAuth";
import { useNavigation } from '@react-navigation/native';
import {getStyleOfOS} from '../../utils/responsive_util';
import urlUtil from '../../utils/url_util';
import urlService from '../../services/url_service';

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
            iconColor={Color.blue}
            icon={<Icon name='information-variant' size={25} color={Color.blue} />}
            onPress={() => { navigation.navigate('About') }}
            title='អំពីកម្មវិធី' />
        </View>

        <View style={{marginTop: 16, backgroundColor: 'white'}}>
          <ButtonList
            hasLine={true}
            iconColor='rgb(53, 174, 235)'
            icon={<Icon name='share-variant' size={18} color='rgb(53, 174, 235)' />}
            onPress={() => onPressShareApp() }
            title='ចែករំលែកកម្មវិធី' />

          <ButtonList
            hasLine={true}
            iconColor='rgb(172, 175, 193)'
            icon={<Icon name='file-document-outline' size={21} color='rgb(172, 175, 193)' />}
            onPress={() => { urlService.openUrl(urlUtil.getAbsoluteUrl('/terms-and-conditions')) }}
            title='គោលការណ៏ និងលក្ខខណ្ឌ' />
        </View>

      </View>
    );
  }

  return (
    <ScrollableHeader
      renderContent={ renderContent }
      title={'ផ្សេងៗ'}
      largeTitle={'ផ្សេងៗ'}
      hideNavigation={true}
      headerMaxHeight={getStyleOfOS(DeviceInfo.hasNotch() ? 80 : 85, 60)}
      style={{marginTop: getStyleOfOS(DeviceInfo.hasNotch() ? 40 : 17, 0)}}
    />
  )
}
