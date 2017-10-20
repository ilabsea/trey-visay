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
import realm from '../schema';
import User from '../utils/user';

// Components
import ScrollableHeader from '../components/scrollable_header';

const PROFILE_SIZE = 120;

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  componentWillMount() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    this.setState({user: user})
  }

  _renderScrollViewContent() {
    return (
      <View>
        <View style={styles.avataContainer}>
          <Image
            style={styles.avata}
            source={require('../assets/images/default_profile.png')}
          />
        </View>

        { this._renderPersonalInfo() }
        { this._renderFamilyInfo() }
        { this._renderFamilySituation() }
      </View>
    )
  }

  _renderPersonalInfo() {
    return (
      <View style={[styles.box, {marginTop: 60}]}>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>ព័ត៌មានផ្ទាល់ខ្លួន</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('EditPersonalInfo')}>
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
          <Text style={styles.itemValue}>: {this.state.user.schoolName}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>អាស័យដ្ឋានបច្ចុប្បន្ន</Text>
          <Text style={styles.itemValue}>: {this.state.user.address}</Text>
        </View>
      </View>
    )
  }

  _renderFamilyInfo() {
    return (
      <View style={styles.box}>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>ព័ត៌មានគ្រួសារ</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('EditFamilyInfo')}>
            <Icon name="edit" />
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>ឪពុកឈ្មោះ</Text>
          <Text style={styles.itemValue}>: {this.state.user.fatherName}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>ម្តាយឈ្មោះ</Text>
          <Text style={styles.itemValue}>: {this.state.user.motherName}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>អាណាព្យាបាល</Text>
          <Text style={styles.itemValue}>: {this.state.user.guidance}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>លេខទូរស័ព្ទឪពុកម្តាយ</Text>
          <Text style={styles.itemValue}>: {this.state.user.parentContactNumber || '-'}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>ចំនួនសមាជិកគ្រួសារ</Text>
          <Text style={styles.itemValue}>: {this.state.user.numberOfFamilyMember} (ស្រី{this.state.user.numberOfSisters} ប្រុស{this.state.user.numberOfBrothers})</Text>
        </View>
      </View>
    )
  }

  _renderFamilySituation() {
    return (
      <View style={styles.box}>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>ស្ថានភាពគ្រួសារ</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('EditFamilySituation')}>
            <Icon name="edit" />
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <Text style={[styles.itemLabel, {flex: 2}]}>ឪពុកម្តាយលែងលះ</Text>
          <Text style={[styles.itemValue, {flex: 1}]}>: {this.state.user.isDivorce ? 'លែងលះ' : 'គ្មានទេ'}</Text>
        </View>

        <View style={styles.item}>
          <Text style={[styles.itemLabel, {flex: 2}]}>មានពិការភាពក្នុងគ្រួសារ</Text>
          <Text style={[styles.itemValue, {flex: 1}]}>: {this.state.user.isDisable ? 'មាន' : 'គ្មានទេ'}</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.itemLabel, {flex: 2}]}>មានអំពើហិង្សាក្នុងគ្រួសារ</Text>
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
        centerElement="My Profile"
        rightElement='edit'
        onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
        onRightElementPress={() => this.props.navigation.navigate('EditProfilePhoto')}
        style={{
          container: {backgroundColor: 'transparent'}
        }}
      />
    )
  }

  render() {
    return (
      <ThemeProvider uiTheme={{}}>
        <ScrollableHeader
          customView={ this._renderScrollViewContent.bind(this) }
          imageBgSrc={ require('../assets/images/header_bg.jpg') }
          customHeader={ this._renderHeader.bind(this) }
          profile={require('../assets/images/default_profile.png')}
          profileSize={PROFILE_SIZE}
        />
      </ThemeProvider>
    )
  }
}

const styles = StyleSheet.create({
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
    fontFamily: 'KhmerOureang',
    color: '#111'
  },
  itemLabel: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Kantumruy',
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
