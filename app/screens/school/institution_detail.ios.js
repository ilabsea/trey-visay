import React, {Component} from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';

import {
  Container, Header, Title, Button, Icon, Left, Right, Body, Content
} from "native-base";

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import mainStyles from '../../assets/style_sheets/main/main';
import ListItem from '../../components/schools/list_item';
import Major from '../../components/schools/major';

const PROFILE_SIZE = 120;

export default class InstitutionDetail extends Component {
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


  _renderMajor() {
    if (!this.state.school.departments || !this.state.school.departments.length) {
      return (null);
    }

    return (
      <Major departments={this.state.school.departments}/>
    )
  }

  renderContent() {
    return (
      <View style={{paddingBottom: 40}}>

        <View style={styles.container}>
          { this._renderContact() }
          { this._renderMajor() }
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
