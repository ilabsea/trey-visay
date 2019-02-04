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
import highSchoolList from '../../data/json/high_schools';

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
    let school = highSchoolList.find((school) => school.id == user.highSchoolId);

    this.setState({user: user, schoolName: !!school && school.name || ''});
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
        { this._renderFamilySituation() }
      </View>
    )
  }

  _renderPersonalInfo() {
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
          <Text style={styles.itemLabel}>ឈ្មោះគណនី</Text>
          <Text style={styles.itemValue}>: {this.state.user.username}</Text>
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
          <Text style={styles.itemLabel}>សញ្ជាតិ</Text>
          <Text style={styles.itemValue}>: {this.state.user.nationality}</Text>
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
          <Text style={styles.itemLabel}>រៀននៅសាលា</Text>
          <Text style={styles.itemValue}>: {this.state.schoolName}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>អាស័យដ្ឋានបច្ចុប្បន្ន</Text>
          <Text style={styles.itemValue}>: {this.state.user.address}</Text>
        </View>
      </View>
    )
  }

  _renderFamilySituation() {
    return (
      <View style={styles.box}>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>ស្ថានភាពគ្រួសារ</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('EditFamilySituation', { refresh: this.refreshState.bind(this) })}>
            <Icon name="edit" />
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <Text style={[styles.itemLabel, {flex: 2}]}>ឪពុកម្តាយលែងលះ</Text>
          <Text style={[styles.itemValue, {flex: 1}]}>: {this.state.user.isDivorce ? 'លែងលះ' : 'គ្មានទេ'}</Text>
        </View>

        <View style={styles.item}>
          <Text style={[styles.itemLabel, {flex: 2}]}>ពិការភាពក្នុងគ្រួសារ</Text>
          <Text style={[styles.itemValue, {flex: 1}]}>: {this.state.user.isDisable ? 'មាន' : 'គ្មានទេ'}</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.itemLabel, {flex: 2}]}>អំពើហិង្សាក្នុងគ្រួសារ</Text>
          <Text style={[styles.itemValue, {flex: 1}]}>: {this.state.user.isDomesticViolence ? 'មាន' : 'គ្មានទេ'}</Text>
        </View>

        <View style={styles.item}>
          <Text style={[styles.itemLabel, {flex: 2}]}>សាមាជិកគ្រួសារណាមួយជក់បារី</Text>
          <Text style={[styles.itemValue, {flex: 1}]}>: {this.state.user.isSmoking ? 'មាន' : 'គ្មានទេ'}</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.itemLabel, {flex: 2}]}>សាមាជិកគ្រួសារណាមួយញៀនសុរា</Text>
          <Text style={[styles.itemValue, {flex: 1}]}>: {this.state.user.isAlcoholic ? 'មាន' : 'គ្មានទេ'}</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.itemLabel, {flex: 2}]}>សាមាជិកគ្រួសារណាមួយជក់គ្រឿងញៀន</Text>
          <Text style={[styles.itemValue, {flex: 1}]}>: {this.state.user.isDrug ? 'មាន' : 'គ្មានទេ'}</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.itemLabel, {flex: 2}]}>ប្រភេទផ្ទះរបស់សិស្ស</Text>
          <Text style={[styles.itemValue, {flex: 1}]}>: {this.state.user.houseType}</Text>
        </View>

        <View style={styles.item}>
          <Text style={[styles.itemLabel, {flex: 2}]}>ចំណូលប្រចាំខែគិតជាលុយរៀល</Text>
          <Text style={[styles.itemValue, {flex: 1}]}>: {this.state.user.collectiveIncome}</Text>
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
    color: '#111'
  },
  itemLabel: {
    flex: 1,
  },
  itemValue: {
    flex: 2,
    fontSize: 16,
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
