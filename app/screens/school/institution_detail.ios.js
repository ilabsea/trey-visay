import React, {Component} from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';

import {
  Container, Header, Title, Button, Icon, Left, Right, Body, Content
} from "native-base";

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import mainStyles from '../../assets/style_sheets/main/main';
import ListItem from '../../components/schools/list_item';
import CarouselItem from '../../components/shared/carousel_item';
import CardItem from '../../components/list/card_item';

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
        <ListItem contact={{data: school.faxes, icon: 'fax', iconSize: 14}}/>
        <ListItem contact={{data: school.emails, icon: 'envelope', iconSize: 14, isLink: true}} />
        <ListItem contact={{data: school.mailbox, icon: 'markunread-mailbox'}} />
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
      <View style={{backgroundColor: 'white'}}>
        <Text style={mainStyles.sectionText}> ជំនាញ </Text>

        { departments.map((department, i) => {
          { return (this.renderMajor(department, i))}
        })}
      </View>
    )
  }

  renderContent() {
    return (
      <View style={{paddingBottom: 40}}>

        <View style={styles.container}>
          { this.renderContact() }
          { this.renderDepartments() }
        </View>
      </View>
    )
  }


  render() {
    return (
      <Container>
        <Content>
          { this.renderContent() }
        </Content>
      </Container>
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
  majorWrapper: {
    flexDirection: 'row',
    paddingLeft: 16,
  }
});
