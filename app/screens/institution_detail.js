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
} from 'react-native-material-ui';

// Components
import ScrollableHeader from '../components/scrollable_header';
import shareStyles from '../assets/style_sheets/profile_form';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import schoolList from '../data/json/schools';

const PROFILE_SIZE = 120;

export default class InstitutionDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    title: '',
  });

  componentWillMount() {
    this.state = {
      school: schoolList.filter((school) => school.id == this.props.navigation.state.params.id)[0]
    }
  }

  _renderContact() {
    return (
      <View style={[shareStyles.box]}>
        <Text style={shareStyles.subTitle}>ទំនាក់ទំនង</Text>

        <View style={{flex: 1, marginLeft: 16}}>
          { this._renderCommunication({data: this.state.school.address, icon: 'map-marker'}) }
          { this._renderCommunication({data: this.state.school.phoneNumbers, icon: 'phone'}) }
          { this._renderCommunication({data: this.state.school.faxes, icon: 'fax', iconSize: 20}) }
          { this._renderCommunication({data: this.state.school.emails, icon: 'envelope', iconSize: 20}) }
          { this._renderCommunication({data: this.state.school.mailbox, icon: 'markunread-mailbox'}) }
          { this._renderCommunication({data: this.state.school.websiteOrFacebook, icon: 'globe'}) }
        </View>
      </View>
    )
  }

  _renderCommunication(com) {
    let iconSize = com.iconSize || 24;
    let data = com.data;

    if (Array.isArray(data)) {
      data = data.join('; ');
    }

    return (
      <View>
        { !!data.length &&
          <View style={styles.communicationWrapper}>
            <View style={styles.iconWrapper}>
              { com.icon != 'markunread-mailbox' &&
                <AwesomeIcon name={com.icon} color='#1976d2' size={iconSize} />
              }
              { com.icon == 'markunread-mailbox' &&
                <MaterialIcon name={com.icon} color='#1976d2' size={iconSize} />
              }
            </View>
            <Text>{data}</Text>
          </View>
        }
      </View>
    )
  }

  _renderMajor() {
    return (
      <View style={[shareStyles.box]}>
        <Text style={shareStyles.subTitle}>ជំនាញ</Text>

        { this.state.school.departments.map((department, i) => {
          return (
            <View key={i} style={{marginBottom: 20}}>
              <Text style={styles.departmentName}>{department.name}</Text>
              <View style={{paddingLeft: 16}}>
                { department.majors.map((major, j) => {
                  return (
                    <View style={styles.majorWrapper} key={j}>
                      <AwesomeIcon name='graduation-cap' color='#1976d2' size={20} />
                      <Text style={{marginLeft: 8}}>{major}</Text>
                    </View>
                  )
                })}
              </View>
            </View>
          )
        }) }

      </View>
    )
  }

  _renderScrollViewContent() {
    let photo = require('../assets/images/schools/default.png');

    // if (!!this.state.user.photo) {
    //   photo = {uri: this.state.user.photo};
    // }
    return (
      <View style={{paddingBottom: 40}}>
        <View style={styles.avataContainer}>
          <Image
            style={styles.avata}
            source={photo}
          />
        </View>

        <View style={{marginTop: 60, marginHorizontal: 16}}>
          { this._renderContact() }
          { this._renderMajor() }
        </View>
      </View>
    )
  }

  _renderHeader() {
    return(
      <Toolbar
        leftElement="arrow-back"
        centerElement=""
        onLeftElementPress={() => this.props.navigation.goBack()}
        style={{
          container: {backgroundColor: 'transparent'}
        }}
      />
    )
  }

  render() {
    let photo = require('../assets/images/schools/default.png');
    let cover = require('../assets/images/header_bg.jpg');

    return (
      <ThemeProvider uiTheme={{}}>
        <ScrollableHeader
          customView={ this._renderScrollViewContent.bind(this) }
          imageBgSrc={ cover }
          customHeader={ this._renderHeader.bind(this) }
          profile={ photo }
          profileSize={ PROFILE_SIZE }
          title={this.state.school.universityName}
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
    borderRadius: 0,
  },
  iconWrapper: {
    width: 24,
    alignItems: 'center',
    marginRight: 10
  },
  communicationWrapper: {
    flexDirection: 'row'
  },
  departmentName: {
    fontFamily: 'KantumruyBold',
    fontSize: 16,
    marginBottom: 8
  },
  majorWrapper: {
    flexDirection: 'row',
    paddingVertical: 4,
    alignItems: 'center'
  }
});
