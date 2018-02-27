import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
  Icon,
} from 'react-native-material-ui';

// Utils
import realm from '../../schema';
import User from '../../utils/user';

// Components
import ScrollableHeader from '../../components/scrollable_header';

const PROFILE_SIZE = 120;

export default class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    title: 'ប្រវត្តិរូបសង្ខេប',
    drawerIcon: ({ tintColor }) => (
      <ThemeProvider uiTheme={{}}>
        <Icon name="person" color={tintColor} />
      </ThemeProvider>
    ),
  });

  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  componentWillMount() {
    this.refreshState();
  }

  refreshState() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    this.setState({user: user});
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
    return (
      <View style={[styles.box, {marginTop: 60}]}>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>ព័ត៌មានផ្ទាល់ខ្លួន</Text>
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
          <Text style={styles.itemLabel}>លេខទូរស័ព្ទ</Text>
          <Text style={styles.itemValue}>: {this.state.user.phoneNumber || '-'}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>ប្រចាំការនៅសាលា</Text>
          <Text style={styles.itemValue}>: {this.state.user.schoolName}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>អាស័យដ្ឋានបច្ចុប្បន្ន</Text>
          <Text style={styles.itemValue}>: {this.state.user.address}</Text>
        </View>
      </View>
    )
  }

  _renderHeader() {
    return(
      <Toolbar
        leftElement="menu"
        onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
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
      <ThemeProvider uiTheme={{}}>
        <ScrollableHeader
          customView={ this._renderScrollViewContent.bind(this) }
          imageBgSrc={ cover }
          customHeader={ this._renderHeader.bind(this) }
          profile={ photo }
          profileSize={ PROFILE_SIZE }
          title={this.state.user.fullName}
        />
      </ThemeProvider>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    marginTop: 10,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff'
  },
  item: {
    flexDirection: 'row',
    padding: 16
  },
  itemTitle: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'KhmerOureang',
    color: '#111'
  },
  itemLabel: {
    flex: 1,
  },
  itemValue: {
    flex: 2,
    fontSize: 16,
    fontFamily: 'KantumruyBold',
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
