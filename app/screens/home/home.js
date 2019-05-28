import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import CarouselView from '../../components/shared/home/carousel_view';

import User from '../../utils/user';
import API from '../../api/schools';

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
  }

  clearSelectedValues(){
    API.setSelectedProvince('');
    API.setSelectedMajor('');
  }

  render() {
    this.clearSelectedValues();
    return (
      <CarouselView navigation={this.props.navigation} user={this.state.user}/>
    );
  }
}
