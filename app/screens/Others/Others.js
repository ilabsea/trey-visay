import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Platform
} from 'react-native';
import ButtonList from '../../components/list/button_list';
import User from '../../utils/user';
import { Colors } from '../../assets/style_sheets/main/colors';
import ScrollableHeader from '../../components/scrollable_header';
import MyStatusBar from '../../components/shared/status_bar';
import Share from 'react-native-share';
import firebase from 'react-native-firebase';
import keyword from '../../data/analytics/keyword';

export default class Others extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: User.getCurrent()
    }
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('didFocus', (payload) => this.componentDidFocus(payload)),
    ];
  }

  componentDidFocus() {
    this.setState({user: User.getCurrent()});

    if (Platform.OS == 'android') {
      StatusBar.setBackgroundColor(Colors.grayStatusBar);
      StatusBar.setBarStyle('dark-content');
    }
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  _logOut() {
    User.logout(() => {
      this.setState({user: false})
      this.props.navigation.navigate('Home');
    })
  }

  onPressShareApp() {
    let url = Platform.OS === 'ios' ? 'https://apps.apple.com/kh/app/trey-visay/id1445506569' : 'https://play.google.com/store/apps/details?id=com.treyvisay';

    let shareOptions = {
      title: 'កម្មវិធីត្រីវិស័យ',
      message: 'ជាកម្មវិធីព្រឹក្សាអាជីពការងារ',
      url: url,
      subject: "កម្មវិធីត្រីវិស័យ"
    };

    Share.open(shareOptions).then((res) => {
      firebase.analytics().logEvent(keyword.SHARE_APP);
    })
  }

  renderContent = () => {
    return (
      <View>
        <MyStatusBar />
        <View style={{marginTop: 16, backgroundColor: 'white'}}>
          <ButtonList
            hasLine={true}
            icon={{color: Colors.blue, src: require('../../assets/icons/others/info.png')}}
            onPress={() => { this.props.navigation.navigate('About') }}
            title='អំពីកម្មវិធី' />
          { !!this.state.user &&
            <ButtonList
              hasLine={true}
              icon={{color: 'rgb(245, 166, 35)', src: require('../../assets/icons/others/key.png')}}
              onPress={() => { this.props.navigation.navigate('ChangePassword') }}
              title='ផ្លាស់ប្តូរលេខសំងាត់' />
          }
        </View>

        <View style={{marginTop: 16, backgroundColor: 'white'}}>
          <ButtonList
            hasLine={true}
            icon={{color: 'rgb(53, 174, 235)', src: require('../../assets/icons/others/share.png')}}
            onPress={() => this.onPressShareApp() }
            title='Share App' />

          <ButtonList
            hasLine={true}
            icon={{color: 'rgb(172, 175, 193)', src: require('../../assets/icons/others/term_condition.png')}}
            onPress={() => { this.props.navigation.navigate('TermsCondition') }}
            title='Terms & Conditions' />
        </View>

        { !!this.state.user &&
          <View style={{marginTop: 16, backgroundColor: 'white'}}>
            <ButtonList
              hasLine={true}
              icon={{color: 'rgb(238, 18, 45)', src: require('../../assets/icons/others/logout.png')}}
              onPress={() => { this._logOut() }}
              title='ចាកចេញ' />
          </View>
        }
      </View>
    );
  }

  render(){
    return(
      <ScrollableHeader
        renderContent={ this.renderContent }
        title={'ផ្សេងៗ'}
        largeTitle={'ផ្សេងៗ'}
      />
    )
  }
}
