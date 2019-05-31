import React, { Component } from 'react';

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
      // if (!user) {
      //   return this.props.navigation.navigate('AccountStack');
      // }
      let user = User.getCurrent();
      this.setState({ user: user});
    });
    API.clearSelectedValues();
  }


  render() {
    return (
      <CarouselView navigation={this.props.navigation} user={this.state.user}/>
    );
  }
}
