import React, {Component} from 'react';
import { DrawerItems } from 'react-navigation';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';

import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';

// Utils
import realm from '../schema';
import User from '../utils/user';
import headerStyles from '../assets/style_sheets/header';
import AppStyles from '../assets/style_sheets/app_styles';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default class SideMenu extends Component {
  state = {user: '', photo: '', cover: '', isOpen: true}

  componentWillMount() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    let photo = require('../assets/images/default_profile.png');
    let cover = require('../assets/images/header_bg.jpg');

    if (!!user && !!user.photo) {
      photo = {uri: user.photo};
    }
    if (!!user && !!user.cover) {
      cover = {uri: user.cover};
    }

    this.setState({user: user, photo: photo, cover: cover});
  }

  toggleScreen() {
    this.setState({isOpen: !this.state.isOpen});
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
    User.logout();
    this.props.screenProps.rootNavigation.dispatch({type: 'Navigation/RESET', routeName: 'Home', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'Login'}]})
  }

  _renderMenuItem(options={}) {
    return (
      <TouchableOpacity onPress={() => this.navigateToScreen(options.screenName)} style={this.isActive}>
        <View style={this.getWrapperStyle(options.screenName)}>
          <AwesomeIcon name={ options.iconName } size={ options.iconSize || 16 } style={this.getIconStyle(options.screenName)} />
          <Text style={this.getMenuTextStyle(options.screenName)}>{options.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _renderMenuItemWithMaterialIcon(options={}) {
    return (
      <TouchableOpacity onPress={() => this.navigateToScreen(options.screenName)} style={this.isActive}>
        <View style={this.getWrapperStyle(options.screenName)}>
          // <MaterialIcon name={ options.iconName } size={ options.iconSize || 18 } style={this.getIconStyle(options.screenName)} />
          <Text style={this.getMenuTextStyle(options.screenName)}>{options.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <ScrollView>
        <TouchableNativeFeedback onPress={this.toggleScreen.bind(this)}>
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
        </TouchableNativeFeedback>

        { this.state.isOpen &&
          <View>
            { this._renderMenuItem({title: 'ទំព័រដើម', screenName: 'Dashboard', iconName: 'home', iconSize: 18}) }
            { this._renderMenuItem({title: 'វាយតម្លៃមុខរបរ និង អាជីព', screenName: 'CareerCounsellorScreen', iconName: 'briefcase'}) }
            { this._renderMenuItemWithMaterialIcon({title: 'គ្រឹះស្ថានសិក្សា', screenName: 'InstitutionStack', iconName: 'business'}) }
            { this._renderMenuItem({title: 'វីដេអូមុខរបរ', screenName: 'VideoScreen', iconName: 'play-circle-o', iconSize: 18}) }
            { this._renderMenuItemWithMaterialIcon({title: 'ជំនាញវិជ្ជាជីវៈ', screenName: 'VocationalJobStack', iconName: 'photo-filter'}) }
            { this._renderMenuItem({title: 'អំពីកម្មវិធី', screenName: 'About', iconName: 'list'}) }
          </View>
        }

        { !this.state.isOpen &&
          <View>
            { this._renderMenuItem({title: 'ប្រវត្តិរូបសង្ខេប', screenName: 'ProfileStack', iconName: 'user', iconSize: 18}) }
            { this._renderMenuItem({title: 'ប្តូរលេខសម្ងាត់', screenName: 'ChangePasswordScreen', iconName: 'key', iconSize: 18}) }

            <TouchableOpacity onPress={this.logout.bind(this)}>
              <View style={styles.row}>
                // <AwesomeIcon name='unlock-alt' size={18} style={styles.icon} />
                <Text style={styles.menuLabel}>ចាកចេញពីគណនី</Text>
              </View>
            </TouchableOpacity>
          </View>
        }
      </ScrollView>
    )
  }
};

const styles = StyleSheet.create({
  name: {
    fontSize: 14,
    fontFamily: AppStyles.fonts.second,
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
    fontFamily: AppStyles.fonts.second,
    fontSize: 14,
  },
});
