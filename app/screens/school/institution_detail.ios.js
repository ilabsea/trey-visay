import React, {Component} from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity, Image } from 'react-native';

import {
  Container, Header, Title, Button, Icon, Left, Right, Body, Content
} from "native-base";
import { Divider } from 'react-native-elements';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import mainStyles from '../../assets/style_sheets/main/main';
import Images from '../../assets/images';
import ListItem from '../../components/schools/list_item';
import CarouselItem from '../../components/shared/carousel_item';
import CardItem from '../../components/list/card_item';
import BackButton from '../../components/shared/back_button';
import ScrollableHeader from '../../components/scrollable_logo_header';

const PROFILE_SIZE = 120;

export default class InstitutionDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      school: this.props.navigation.state.params.school
    }
  }

  renderContact() {
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
      <View style={{ paddingLeft: 8 }}>
        <ListItem contact={{data: school.address, icon: 'map-marker'}} />
        <ListItem contact={{data: school.phoneNumbers, icon: 'phone'}} />
        <ListItem contact={{data: school.faxes, icon: 'fax'}}/>
        <ListItem contact={{data: school.emails, icon: 'envelope', isLink: true}} />
        <ListItem contact={{data: school.mailbox, icon: 'markunread-mailbox'}} />
        <ListItem contact={{data: school.websiteOrFacebook, icon: 'globe', isLink: true}} />
        <Divider />
      </View>
    )
  }

  _openLink(url) {
    Linking.openURL('http://' + url);
  }

  renderItem(item, i){
    return(
      <TouchableOpacity
        style={styles.btn}
        key={i}>
        <View style={styles.iconWrapper}>
          <Image
            source={require("../../assets/icons/school/major.png")}
            resizeMode='contain'
            style={styles.icon}
          />
        </View>
        <Text style={{ flex: 1 , paddingRight: 16}}>{item}</Text>
      </TouchableOpacity>
    )
  }

  renderMajor(department, index){
    let padding = department.name ? 16: 0;
    return(
      <View key={index} style={mainStyles.box}>
        <Text style={[mainStyles.sectionText, { padding: padding }]}>{department.name}</Text>
        <View style={[mainStyles.grid, { justifyContent: 'flex-start', margin: 0 }]}>
          { department.majors.map((major, i) => {
              { return (this.renderItem(major, i))}
            })
          }
        </View>
      </View>
    )
  }

  renderDepartments() {
    let departments = this.state.school.departments;
    if (!departments || !departments.length) {
      return (null);
    }
    return (
      <View style={{backgroundColor: 'rgb(239, 240, 244)'}}>
        <Text style={[mainStyles.sectionText, {marginLeft: 16, padding: 8, marginTop: 16}]}> ជំនាញ </Text>
        { departments.map((department, i) => {
          { return (this.renderMajor(department, i))}
        })}
      </View>
    )
  }

  _renderHeader() {
    return(
      <BackButton navigation={this.props.navigation}/>
    )
  }

  renderContent(){
    return(
      <View style={{backgroundColor: 'white'}}>
        <View style={styles.container}>
          { this.renderContact() }
          { this.renderDepartments() }
        </View>
      </View>
    )
  }

  render() {
    let photo = require('../../assets/images/schools/default.png');
    if (!!this.state.school.logoName) {
      photo = Images[this.state.school.logoName];
    }
    return (
      <ScrollableHeader
        customView={ this.renderContent.bind(this) }
        customHeader={ this._renderHeader.bind(this) }
        profileSize={ PROFILE_SIZE }
        profile={ photo }
        title={this.state.school.universityName}
        subTitle={this.state.school.category}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 150
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
  majorWrapper: {
    flexDirection: 'row',
    paddingLeft: 16,
  },
  btn: {
    flexDirection: 'row',
    width: wp('49.8%'),
    height: hp('10%'),
    backgroundColor: 'white',
    borderBottomColor: 'rgb(200, 199, 204)',
    borderRightColor: 'rgb(200, 199, 204)',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
  },
  iconWrapper:{
    width: 32,
    height: 32,
    borderRadius: 12,
    marginRight: 16,
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:  'rgb(24, 118, 211)'
  },
  icon:{
    width: 18,
    height: 18
  }
});
