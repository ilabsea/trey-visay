import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Platform
} from 'react-native';

// Components
import ScrollableHeader from '../../components/scrollable_header';
import mainStyles from '../../assets/style_sheets/main/main';
import {FontSetting} from '../../assets/style_sheets/font_setting';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Divider } from 'react-native-elements';
import schoolList from '../../data/json/universities';
import Images from '../../assets/images';
import BackButton from '../../components/shared/back_button';

const PROFILE_SIZE = 120;

export default class InstitutionDetail extends Component {
  static navigationOptions = {
    header: null
  }

  componentWillMount() {
    this.setState({
      school: this.props.navigation.state.params.school
    })
  }

  _renderContact() {
    school = this.state.school;
    if(!school.id){
      school = {
        address: 'មិនមាន',
        phoneNumbers: 'មិនមាន',
        faxes: 'មិនមាន',
        emails: 'មិនមាន',
        mailbox: 'មិនមាន',
        websiteOrFacebook: []
      }
    }

    return (
      <View style={[mainStyles.box, { padding: 10,paddingLeft: 8}]}>
        { this._renderCommunication({data: school.address, icon: 'map-marker'}) }
        { this._renderCommunication({data: school.phoneNumbers, icon: 'phone'}) }
        { this._renderCommunication({data: school.faxes, icon: 'fax', iconSize: 14}) }
        { this._renderCommunication({data: school.emails, icon: 'envelope', iconSize: 14, isLink: true}) }
        { this._renderCommunication({data: school.mailbox, icon: 'markunread-mailbox'}) }
        { this._renderWebsiteOrFacebook({data: school.websiteOrFacebook, icon: 'globe'}) }
      </View>
    )
  }

  _openLink(url) {
    Linking.openURL('http://' + url);
  }

  _renderWebsiteOrFacebook(com) {
    if(!com.data.length) {
      return (null)
    }

    return (
      <View style={styles.communicationWrapper}>
        <View style={styles.iconWrapper}>
          <AwesomeIcon name={com.icon} color='#8E8E93' size={18} />
        </View>

        { com.data.map((data, i) => {
            return (
              <Text key={i}
                onPress={() => this._openLink(data)}
                style={mainStyles.link}>
                {data} { (i < com.data.length - 1) && <Text>; </Text> }
              </Text>
            )
          })
        }
      </View>
    )
  }

  _renderCommunication(com) {
    let iconSize = com.iconSize || 18;
    let data = com.data;

    if (Array.isArray(data)) {
      data = data.join('; ');
    }

    return (
      <View>
        { !!data && !!data.length &&
          <View style={styles.communicationWrapper}>
            <View style={styles.iconWrapper}>
              { com.icon != 'markunread-mailbox' &&
                <AwesomeIcon name={com.icon} color='#8E8E93' size={iconSize} />
              }
              { com.icon == 'markunread-mailbox' &&
                <MaterialIcon name={com.icon} color='#8E8E93' size={iconSize} />
              }
            </View>
            { !!com.isLink && data!='មិនមាន' &&
              <Text
                onPress={()=> Linking.openURL('mailto:' + data)}
                style={mainStyles.link}>
                {data}
              </Text>
            }
            { (!com.isLink || data=='មិនមាន') &&
              <Text
                style={mainStyles.text}>
                {data}
              </Text>
            }

          </View>
        }
      </View>
    )
  }

  _renderMajor() {
    if (!this.state.school.departments || !this.state.school.departments.length) {
      return (null);
    }

    return (
      <View style={mainStyles.box}>
        <Text style={mainStyles.sectionText}>ជំនាញ</Text>

        <Divider />
        { this.state.school.departments.map((department, i) => {
          return (
            <View key={i} style={{flex:1, margin: 16, marginBottom: 6}}>
              <Text style={mainStyles.text}>{department.name}</Text>
              { department.majors.map((major, j) => {
                return (
                  <View style={styles.majorWrapper} key={j}>
                    <View style={styles.iconWrapper}>
                      <AwesomeIcon name='graduation-cap' color='#8E8E93' size={16} />
                    </View>
                    <Text style={[mainStyles.text, {marginLeft: 5}]}>{major}</Text>
                  </View>
                )
              })}
            </View>
          )
        }) }

      </View>
    )
  }

  _renderScrollViewContent() {
    let photo = require('../../assets/images/schools/default.png');

    if (!!this.state.school.logoName) {
      photo = Images[this.state.school.logoName];
    }

    return (
      <View style={{paddingBottom: 40}}>
        <View style={styles.avataContainer}>
          <Image
            style={styles.avata}
            source={photo}
          />
        </View>

        <View style={styles.container}>
          { this._renderContact() }
          { this._renderMajor() }
        </View>
      </View>
    )
  }

  _renderHeader() {
    return(
      <BackButton navigation={this.props.navigation}/>
    )
  }

  render() {
    let photo = require('../../assets/images/schools/default.png');
    if (!!this.state.school.logoName) {
      photo = Images[this.state.school.logoName];
    }
    let cover = require('../../assets/images/header_bg.jpg');

    return (
      <ScrollableHeader
        customView={ this._renderScrollViewContent.bind(this) }
        imageBgSrc={ cover }
        customHeader={ this._renderHeader.bind(this) }
        profile={ photo }
        profileSize={ PROFILE_SIZE }
        title={this.state.school.universityName}
        subTitle={this.state.school.category}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60
  },
  avataContainer: {
    position: 'absolute',
    left: 24,
    top: -PROFILE_SIZE*2/3,
    zIndex: 1,
  },
  avata: {
    width: PROFILE_SIZE,
    height: PROFILE_SIZE,
    borderRadius: PROFILE_SIZE/2,
  },
  iconWrapper: {
    width: 24,
    marginTop: 2,
    marginRight: 3
  },
  communicationWrapper: {
    flexDirection: 'row',
    padding: 6,
    marginRight: 30
  },
  majorWrapper: {
    flexDirection: 'row',
    paddingLeft: 16,
  }
});
