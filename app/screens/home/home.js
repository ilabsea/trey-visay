import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import CarouselView from '../../components/home/carousel_view';

import { Container, Header} from "native-base";

import User from '../../utils/user';
import SchoolUtil from '../../utils/School/School';
import scrollHeaderStyles from '../../assets/style_sheets/scroll_header';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null
    }
  }

  componentWillMount() {
    SplashScreen.hide();
    User.isLoggedin(() => {
      let user = User.getCurrent();
      this.setState({ user: user});
    });
    SchoolUtil.clearSelectedValues();

    this.subs = [this.props.navigation.addListener('didFocus', (payload) => this.componentDidFocus(payload))];
  }

  componentWillUnmount(){
    this.subs.forEach(sub => sub.remove());
  }

  componentDidFocus() {
    StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.251)');
    StatusBar.setBarStyle('dark-content');
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          span
          androidStatusBarColor="rgba(0, 0, 0, 0.251)"
          style={{backgroundColor: '#fff', height: (140 - StatusBar.currentHeight)}}
        >
          <Text style={[scrollHeaderStyles.largeTitle, scrollHeaderStyles.largeTitlePosition]}>ទំព័រដេីម</Text>
        </Header>

        <CarouselView navigation={this.props.navigation} user={this.state.user}/>
      </View>
    );
  }
}
