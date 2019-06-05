import React, {Component} from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Button, Icon, Separator } from 'native-base';

// Utils
import realm from '../../db/schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';

import provinces from '../../data/json/address/provinces.json';
import communes from '../../data/json/address/communes.json';
import districts from '../../data/json/address/districts.json';
import highSchools from '../../data/json/address/highSchools.json';
import te from '../../data/translates/km';

import ScrollableHeader from '../../components/scrollable_header';
import BackButton from '../../components/shared/back_button';

export default class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  componentWillMount() {
    this.refreshState();
  }

  refreshState() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];

    this.setState({ user: user });
  }

  _renderListItem(title, value, icon) {
    return (
      <ListItem icon key={uuidv4()}>
        <Left>{ !!icon && <Icon name={icon} /> }</Left>
        <Body><Text>{title}</Text></Body>
        <Right><Text>{value || '-'}</Text></Right>
      </ListItem>
    );
  }

  _renderStudy() {
    let user = this.state.user;
    let provinceName = user.provinceCode ? provinces.find((province) => province.code == user.provinceCode).label : '';
    let districtName = user.districtCode ? districts.find((district) => district.code == user.districtCode).label : '';
    let communeName = user.communeCode ? communes.find((commune) => commune.code == user.communeCode).label : '';
    let schoolName = user.highSchoolCode ? highSchools.find((school) => school.code == user.highSchoolCode).label : '';

    let arr = [
      {name: 'schoolName', value: schoolName, icon: 'school'},
      {name: 'communeName', value: communeName, icon: 'pin'},
      {name: 'districtName', value: districtName, icon: 'pin'},
      {name: 'provinceName', value: provinceName, icon: 'pin'}];

    let doms = arr.map((item, i) => this._renderListItem(te[item.name], item.value, item.icon))
    doms.unshift(this._renderListItem('រៀនថ្នាក់ទី', this.state.user.grade, 'school'));

    return doms;
  }

  _renderPersonalInfo() {
    let arr = [
      {name: 'fullName', icon: 'md-person'},
      {name: 'username',icon: 'md-person'},
      {name: 'sex', icon: 'transgender'},
      {name: 'dateOfBirth', icon: 'calendar'},
      {name: 'phoneNumber', icon: 'call'}];
    let info = arr.map((item, i) => this._renderListItem(te[item.name], this.state.user[item.name], item.icon));

    return (
      <List style={{}}>
        <ListItem >
          <Text style={{flex: 1}}>ប្រវត្តិរូបសង្ខេប</Text>

          <Right>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('EditPersonalInfo', { refresh: this.refreshState.bind(this) })}>
              <Text style={{color: '#1976d2'}}>កែតម្រូវ</Text>
            </TouchableOpacity>
          </Right>
        </ListItem>

        { info }
        { this._renderStudy() }
      </List>
    );
  }

  _renderPhoto() {
    let photo = require('../../assets/images/default_profile.png');

    if (!!this.state.user.photo) {
      photo = {uri: this.state.user.photo};
    }

    return (
      <ListItem thumbnail button onPress={() => this.props.navigation.navigate('EditProfilePhoto', { refresh: this.refreshState.bind(this) })}>
        <Left>
          <Thumbnail large source={photo} />
        </Left>

        <Body>
          <Text>{this.state.user.username}</Text>
          <Text note>កែតម្រូវ</Text>
        </Body>

        <Right>
          <Button transparent>
            <Icon name='ios-arrow-forward' size={24} />
          </Button>
        </Right>
      </ListItem>
    );
  }

  _renderContent = () => {
    return (
      <Content>
        <List>
          <Separator bordered />
          { this._renderPhoto() }
          <Separator bordered />
          { this._renderPersonalInfo() }
        </List>
      </Content>
    )
  }

  render() {
    let title = 'ប្រវត្តិរូបសង្ខេប';
    let user = User.getCurrent();

    if (!user) {
      return (null)
    }

    return (
      <Container>
        <ScrollableHeader
          renderContent={ this._renderContent }
          renderNavigation={ () => <BackButton navigation={this.props.navigation}/> }
          title={title}
          largeTitle={title}
        />
      </Container>
    )
  }
}
