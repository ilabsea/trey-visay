import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  ThemeProvider,
  Divider,
  Avatar,
  Card,
  Toolbar,
  TouchableOpacity,
} from 'react-native-material-ui';

import ScrollableHeader from '../components/scrollable_header';

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this._renderPersonalInfor = this._renderPersonalInfor.bind(this);
    this._renderFamilyInfo = this._renderFamilyInfo.bind(this);
    this._renderFamilySituation = this._renderFamilySituation.bind(this);
  }

  _renderScrollViewContent() {
    const PROFILE_SIZE = 120;

    return (
      <View>
        <View style={{position: 'absolute', left: 24, top: -PROFILE_SIZE*2/3, zIndex: 1}}>
          <Image
            style={{width: PROFILE_SIZE, height: PROFILE_SIZE, borderRadius: PROFILE_SIZE/2}}
            source={require('../assets/images/default_profile.png')}
          />
        </View>

        { this._renderPersonalInfor() }
        { this._renderFamilyInfo() }
        { this._renderFamilySituation() }
      </View>
    )
  }

  _renderPersonalInfor() {
    return (
      <View style={[styles.box, {marginTop: 60}]}>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>Title</Text>
          <Text>action</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>Title </Text>
          <Text style={styles.itemValue}>: Value</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>Title </Text>
          <Text style={styles.itemValue}>: Value</Text>
        </View>
      </View>
    )
  }

  _renderFamilyInfo() {
    return (
      <View style={styles.box}>
        <Text>_renderFamilyInfo</Text>
      </View>
    )
  }

  _renderFamilySituation() {
    return (
      <View style={styles.box}>
        <Text>_renderFamilySituation</Text>
      </View>
    )
  }

  _renderHeader() {
    return(
      <ThemeProvider uiTheme={{}}>
      <Toolbar
        leftElement="menu"
        centerElement="My Profile"
        rightElement='edit'
        searchable={null}
        searchValue=''
        onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
        onRightElementPress={() => this.props.navigation.navigate('About')}
        style={{
          container: {backgroundColor: 'transparent'}
        }}
      />
      </ThemeProvider>
    )
  }

  render() {
    return (
      <ScrollableHeader
        customView={ this._renderScrollViewContent.bind(this) }
        imageBgSrc={ require('../assets/images/cat.jpg') }
        customHeader={ this._renderHeader.bind(this) }
        profile={require('../assets/images/default_profile.png')}
        profileSize={120}
      />
    )
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    marginTop: 10,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
    backgroundColor: '#fff'
  },
  item: {
    flexDirection: 'row',
    padding: 10
  },
  itemTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold'
  },
  itemLabel: {
    fontSize: 16,
    flex: 1,
  },
  itemValue: {
    flex: 2,
    fontSize: 16,
    fontWeight: 'bold',
  }

});
