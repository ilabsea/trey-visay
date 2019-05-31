import React, {Component} from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';

import {
  Container, Header, Title, Button, Icon, Left, Right, Body, Content
} from "native-base";

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
      <View style={{ padding: 10,paddingLeft: 8}}>
        <ListItem contact={{data: school.address, icon: 'map-marker'}} />
        <ListItem contact={{data: school.phoneNumbers, icon: 'phone'}} />
        <ListItem contact={{data: school.faxes, icon: 'fax'}}/>
        <ListItem contact={{data: school.emails, icon: 'envelope', isLink: true}} />
        <ListItem contact={{data: school.mailbox, icon: 'markunread-mailbox'}} />
        <ListItem contact={{data: school.websiteOrFacebook, icon: 'globe', isLink: true}} />
      </View>
    )
  }

  _openLink(url) {
    Linking.openURL('http://' + url);
  }

  renderItem(item, index){
    return(
      <CardItem text={item} index={index}/>
    )
  }

  renderMajor(department, index){
    return(
      <View key={index}>
        <Text style={mainStyles.sectionText}>{department.name}</Text>
        <CarouselItem
          data={department.majors}
          renderItem={({item, index}) => this.renderItem(item, index)}/>
      </View>
    )
  }

  renderDepartments() {
    let departments = this.state.school.departments;
    if (!departments || !departments.length) {
      return (null);
    }

    return (
      <View style={{marginLeft: 16}}>
        <Text style={mainStyles.sectionText}> ជំនាញ </Text>

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
      <View style={{paddingBottom: 40, backgroundColor: 'white'}}>

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
  }
});
