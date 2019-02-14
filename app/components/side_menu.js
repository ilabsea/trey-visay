import React, {Component} from 'react';
import { DrawerItems } from 'react-navigation';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';

import { connect } from 'react-redux'

import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';

// Utils
import User from '../utils/user';

import headerStyles from '../assets/style_sheets/header';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default class SideMenu extends Component {
  user;
  constructor(props){
    super(props);
    this.state = {
      isOpen: true
    }

  }

  componentDidUpdate() {
    this.user = User.getCurrent();
  }

  toggleScreen() {
    this.setState({isOpen: !this.state.isOpen });
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
    if(route == 'Home'){
      this.logout();
    }else{
      const navigateAction = NavigationActions.navigate({
        routeName: route
      });
      this.props.navigation.dispatch(navigateAction);
    }
  }

  logout() {
    User.logout();
    this.props.screenProps.rootNavigation.dispatch({
      type: 'Navigation/RESET',
      index: 0,
      actions: [{ type: 'Navigation/NAVIGATE', routeName:'Home'}]
    })
  }

  _renderMenuItem(options={}) {
    let Icon = options.type == 'material'? MaterialIcon : AwesomeIcon;
    return (
      <TouchableOpacity onPress={() => this.navigateToScreen(options.screenName)} style={this.isActive}>
        <View style={this.getWrapperStyle(options.screenName)}>
          <Icon name={ options.iconName } size={ options.iconSize || 16 } style={this.getIconStyle(options.screenName)} />
          <Text style={this.getMenuTextStyle(options.screenName)}>{options.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _renderMenuHeader() {
    let TouchablePlatformSpecific = Platform.OS === 'ios' ?
        TouchableHighlight :
        TouchableNativeFeedback;
    let photo = require('../assets/images/default_profile.png');
    let cover = require('../assets/images/header_bg.jpg');

    if (!!this.user && !!this.user.photo) {
      photo = {uri: user.photo, CACHE: 'reload'};
    }
    if (!!this.user && !!this.user.cover) {
      cover = {uri: user.cover, CACHE: 'reload'};
    }

    return(
      <TouchablePlatformSpecific onPress={this.toggleScreen.bind(this)}>
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

          <View style={{position: 'absolute', bottom: 0, left: 0, padding: 24, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.name}>
              {!!this.user && this.user.fullName}
              {!this.user && 'ភ្ញៀវ'}
            </Text>
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
            { this._renderMenuItem({title: 'ទំព័រដើម', screenName: 'Dashboard', iconName: 'home', iconSize: 18}) }
            { this._renderMenuItem({title: 'វាយតម្លៃមុខរបរ និង អាជីព', screenName: 'AccountStack', iconName: 'briefcase'}) }
            { this._renderMenuItem({title: 'គ្រឹះស្ថានសិក្សា', screenName: 'InstitutionStack', iconName: 'business', type: 'material'}) }
            { this._renderMenuItem({title: ' វីដេអូមុខរបរ', screenName: 'VideoScreen', iconName: 'play-circle-o', iconSize: 18}) }
            { this._renderMenuItem({title: 'ជំនាញវិជ្ជាជីវៈ', screenName: 'VocationalJobStack', iconName: 'photo-filter', type: 'material'}) }
            { this._renderMenuItem({title: 'អំពីកម្មវិធី', screenName: 'About', iconName: 'list'}) }
          </View>
        }

        { !!this.user && !this.state.isOpen &&
          <View>
            { this._renderMenuItem({title: 'ប្រវត្តិរូបសង្ខេប', screenName: 'ProfileStack', iconName: 'user', iconSize: 18}) }
            { this._renderMenuItem({title: 'ប្តូរលេខសម្ងាត់', screenName: 'ChangePasswordStack', iconName: 'key', iconSize: 18}) }
            { this._renderMenuItem({title: 'ចាកចេញពីគណនី', screenName: 'Home', iconName: 'unlock-alt', iconSize: 18}) }
          </View>
        }

        { !this.user && !this.state.isOpen &&
          <View>
            { this._renderMenuItem({title: 'ចូលគណនី', screenName: 'Login', iconName: 'user', iconSize: 18}) }
          </View>
        }
      </ScrollView>
    )
  }
};

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
