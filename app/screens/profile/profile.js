import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform
} from 'react-native';

import {
  Toolbar,
  Icon,
  Avatar,
} from 'react-native-material-ui';

// Utils
import realm from '../../schema';
import User from '../../utils/user';

// Components
import ScrollableHeader from '../../components/scrollable_header';
import provinces from '../../data/json/address/provinces.json';
import communes from '../../data/json/address/communes.json';
import districts from '../../data/json/address/districts.json';
import highSchools from '../../data/json/address/highSchools.json';
import { FontSetting } from '../../assets/style_sheets/font_setting';

const PROFILE_SIZE = 120;

export default class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    title: 'ប្រវត្តិរូបសង្ខេប',
    drawerIcon: ({ tintColor }) => (
      <Icon name="person" color={tintColor} />
    ),
  });

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.refreshState();
  }

  refreshState() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];

    this.setState({ user: user });
  }

  _renderScrollViewContent() {
    let photo = require('../../assets/images/default_profile.png');

    if (!!this.state.user.photo) {
      photo = {uri: this.state.user.photo};
    }
    return (
      <View style={{paddingBottom: 24}}>
        <View style={styles.avataContainer}>
          <Image
            style={styles.avata}
            source={photo}
          />
        </View>

        { this._renderPersonalInfo() }
      </View>
    )
  }

  _renderPersonalInfo() {
    let user = this.state.user;
    let provinceName = user.provinceCode ? provinces.find((province) => province.code == user.provinceCode).label : '';
    let districtName = user.districtCode ? districts.find((district) => district.code == user.districtCode).label : '';
    let communeName = user.communeCode ? communes.find((commune) => commune.code == user.communeCode).label : '';
    let schoolName = user.highSchoolCode ? highSchools.find((school) => school.code == user.highSchoolCode).label : '';

    return (
      <View style={[styles.box, {marginTop: 60}]}>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>ព័ត៌មានផ្ទាល់ខ្លួន</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('EditPersonalInfo', { refresh: this.refreshState.bind(this) })}>
            <Icon name="edit" />
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>ឈ្មោះពេញ</Text>
          <Text style={styles.itemValue}>: {this.state.user.fullName}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>ភេទ</Text>
          <Text style={styles.itemValue}>: {this.state.user.sex}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>ថ្ងៃខែឆ្នាំកំណើត</Text>
          <Text style={styles.itemValue}>: {this.state.user.dateOfBirth}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>លេខទូរស័ព្ទ</Text>
          <Text style={styles.itemValue}>: {this.state.user.phoneNumber || '-'}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>រៀនថ្នាក់ទី</Text>
          <Text style={styles.itemValue}>: {this.state.user.grade}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>ខេត្ត</Text>
          <Text style={styles.itemValue}>: {provinceName}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>ស្រុក</Text>
          <Text style={styles.itemValue}>: {districtName}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>ឃុំ</Text>
          <Text style={styles.itemValue}>: {communeName}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>រៀននៅសាលា</Text>
          <Text style={styles.itemValue}>: {schoolName}</Text>
        </View>
      </View>
    )
  }

  _renderHeader() {
    return(
      <Toolbar
        leftElement="menu"
        rightElement={
          <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProfilePhoto', { refresh: this.refreshState.bind(this) })} >
            <Avatar icon='edit' size={30} style={{container: {backgroundColor: 'rgba(0, 0, 0, 0.26)'}}} />
          </TouchableOpacity>
        }
        onLeftElementPress={() => this.props.navigation.openDrawer()}
        style={{
          container: {backgroundColor: 'transparent'}
        }}
      />
    )
  }

  render() {
    let photo = require('../../assets/images/default_profile.png');
    let cover = require('../../assets/images/header_bg.jpg');

    if (!!this.state.user.photo) {
      photo = {uri: this.state.user.photo};
    }
    if (!!this.state.user.cover) {
      cover = {uri: this.state.user.cover};
    }

    return (
      <ScrollableHeader
        customView={ this._renderScrollViewContent.bind(this) }
        imageBgSrc={ cover }
        customHeader={ this._renderHeader.bind(this) }
        profile={ photo }
        profileSize={ PROFILE_SIZE }
        title={this.state.user.fullName}
      />
    )
  }
}

const styles = StyleSheet.create({
  box: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    ...Platform.select({
      android: {
        marginHorizontal: 16,
      },
      ios: {
        marginHorizontal: 0,
      }
    })
  },
  item: {
    flexDirection: 'row',
    padding: 16
  },
  itemTitle: {
    flex: 1,
    fontSize: FontSetting.medium_title,
    color: '#111'
  },
  itemLabel: {
    flex: 1,
  },
  itemValue: {
    flex: 2,
    fontSize: FontSetting.text,
    fontWeight: 'bold',
    color: '#111'
  },
  avataContainer: {
    position: 'absolute',
    left: 24,
    top: -PROFILE_SIZE*2/3,
    zIndex: 1
  },
  avata: {
    width: PROFILE_SIZE,
    height: PROFILE_SIZE,
    borderRadius: PROFILE_SIZE/2,
  }
});
