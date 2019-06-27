import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import CarouselView from '../../components/home/carousel_view';
import StatusBar from '../../components/shared/status_bar';

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
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar/>

        <Header
          span
          androidStatusBarColor="rgba(0, 0, 0, 0.251)"
          style={{backgroundColor: '#fff', height: 140}}
        >
          <Text style={[scrollHeaderStyles.largeTitle, scrollHeaderStyles.largeTitlePosition]}>ទំព័រដេីម</Text>
        </Header>

        <CarouselView navigation={this.props.navigation} user={this.state.user}/>
      </View>
    );
  }
}
