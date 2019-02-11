import React, {Component} from 'react';
import { DrawerItems } from 'react-navigation';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';

import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';

// Utils
import realm from '../../schema';
import User from '../../utils/user';
import headerStyles from '../../assets/style_sheets/header';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

class SideMenu extends Component {
  state = {user: '', photo: '', cover: '', isOpen: true}

  componentWillMount() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    let photo = require('../../assets/images/default_profile.png');
    let cover = require('../../assets/images/header_bg.jpg');

    if (!!user && !!user.photo) {
      photo = {uri: user.photo};
    }
    if (!!user && !!user.cover) {
      cover = {uri: user.cover};
    }

    this.setState({user: user});
    this.setState({photo: photo});
    this.setState({cover: cover});
  }

  toggleScreen() {
    this.setState({isOpen: !this.state.isOpen})
  }

  isActive(routeName) {
    return this.props.navigation.state.routes[this.props.navigation.state.index].routeName == routeName;
  }

  getWrapperStyle(routeName) {
    if (this.isActive(routeName)) {
      return [styles.row, {backgroundColor: 'rgba(0,0,0,0.05)'}];
    }

    return styles.row;
  }

  getIconStyle(routeName) {
    if (this.isActive(routeName)) {
      return [styles.icon, {color: '#1976d2'}]
    }

    return styles.icon;
  }

  getMenuTextStyle(routeName) {
    if (this.isActive(routeName)) {
      return [styles.menuLabel, {color: '#4285f4'}];
    }
    return styles.menuLabel;
  }

  navigateToScreen = (route) => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  logout() {
    User.removeToken();
    User.logout();
    this.props.screenProps.rootNavigation.dispatch({type: 'Navigation/RESET', routeName: 'Home', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'Login'}]})
  }

  _renderMenuHeader() {
    let TouchablePlatformSpecific = Platform.OS === 'ios' ?
        TouchableHighlight :
        TouchableNativeFeedback;
    return(
      <TouchablePlatformSpecific onPress={this.toggleScreen.bind(this)}>
        <View>
          <View style={{position: 'relative'}}>
            <Image
              source={this.state.cover}
              style={{width: null, height: 180}} />
          </View>

          <View style={{position: 'absolute', top: 24, left: 24}}>
            <Image
              source={this.state.photo}
              style={{borderRadius: 32, width: 64, height: 64 }} />
          </View>

          <View style={{position: 'absolute', bottom: 0, left: 0, padding: 24, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.name}>{!!this.state.user && this.state.user.fullName}</Text>
            { this.state.isOpen && <AwesomeIcon name='caret-down' color='#fff' size={16} /> }
            { !this.state.isOpen && <AwesomeIcon name='caret-up' color='#fff' size={16} /> }
          </View>
        </View>
      </TouchablePlatformSpecific>
    )
  }

  render() {
    return (
      <ScrollView>
        { this._renderMenuHeader() }

        { this.state.isOpen &&
          <View>
            <TouchableOpacity onPress={() => this.navigateToScreen('Dashboard')} style={this.isActive}>
              <View style={this.getWrapperStyle('Dashboard')}>
                <AwesomeIcon name='home' size={18} style={this.getIconStyle('Dashboard')} />
                <Text style={this.getMenuTextStyle('Dashboard')}>ទំព័រដើម</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.navigateToScreen('About')}>
              <View style={this.getWrapperStyle('About')}>
                <AwesomeIcon name='list' size={16} style={this.getIconStyle('About')} />
                <Text style={this.getMenuTextStyle('About')}>អំពីកម្មវិធី</Text>
              </View>
            </TouchableOpacity>
          </View>
        }

        {
          !this.state.isOpen &&
          <View>
            <TouchableOpacity onPress={() => this.navigateToScreen('Profile')}>
              <View style={this.getWrapperStyle('Profile')}>

                <AwesomeIcon name='user' size={18} style={this.getIconStyle('Profile')} />
                <Text style={this.getMenuTextStyle('Profile')}>ប្រវត្តិរូបសង្ខេប</Text>

              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.logout.bind(this)}>
              <View style={styles.row}>
                <AwesomeIcon name='unlock-alt' size={18} style={styles.icon} />
                <Text style={styles.menuLabel}>ចាកចេញពីគណនី</Text>
              </View>
            </TouchableOpacity>
          </View>
        }
      </ScrollView>
    )
  }
};

export default SideMenu;

const styles = StyleSheet.create({
  name: {
    fontSize: 14,
    color: '#fff',
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 48
  },
  icon: {
    width: 54,
    color: 'rgba(0,0,0,0.54)'
  },
  menuLabel: {
    fontSize: 14,
  },
});
