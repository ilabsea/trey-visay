import React, {Component} from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Toolbar } from 'react-native-material-ui';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Button, Icon } from 'native-base';

// Utils
import realm from '../../db/schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';

import BackButton from '../../components/shared/back_button';

import provinces from '../../data/json/address/provinces.json';
import communes from '../../data/json/address/communes.json';
import districts from '../../data/json/address/districts.json';
import highSchools from '../../data/json/address/highSchools.json';
import te from '../../data/translates/km';

export default class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    title: 'ប្រវត្តិរូបសង្ខេប',
  });

  componentWillMount() {
    this.refreshState();
  }

  refreshState() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];

    this.setState({ user: user });
  }

  _renderListItem(title, value) {
    return (
      <ListItem thumbnail key={uuidv4()}>
        <Left>
          <Icon name="medical" />
        </Left>
        <Body>
          <Text>{title}</Text>
        </Body>
        <Right>
          <Text>{value || '-'}</Text>
        </Right>
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
      {name: 'schoolName', value: schoolName},
      {name: 'communeName', value: communeName},
      {name: 'districtName', value: districtName},
      {name: 'provinceName', value: provinceName}];

    let doms = arr.map((item, i) => this._renderListItem(te[item.name], item.value))
    doms.unshift(this._renderListItem('រៀនថ្នាក់ទី', this.state.user.grade));

    return doms;
  }

  _renderPersonalInfo() {
    let arr = ['fullName', 'username', 'sex', 'dateOfBirth', 'phoneNumber'];
    let info = arr.map((item, i) => this._renderListItem(te[item], this.state.user[item]));

    return (
      <List style={{}}>
        <ListItem itemDivider itemHeader>
          <Text style={{flex: 1}}>ប្រវត្តិរូបសង្ខេប</Text>

          <Right>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('EditPersonalInfo', { refresh: this.refreshState.bind(this) })}>
              <Text style={{color: 'blue'}}>កែតម្រូវ</Text>
            </TouchableOpacity>
          </Right>
        </ListItem>

        { info }

        <ListItem itemDivider itemHeader>
          <Text>ប្រវត្តិការសិក្សា</Text>
        </ListItem>

        { this._renderStudy() }
      </List>
    );
  }

  _renderHeader() {
    return(
      <Header>
        <Toolbar
          leftElement={<BackButton navigation={this.props.navigation}/>}
          onLeftElementPress={() => this.props.navigation.goBack(null)}
          style={{
            container: {backgroundColor: 'transparent', flex: 1}
          }}
        />
      </Header>
    )
  }

  _renderPhoto() {
    let photo = require('../../assets/images/default_profile.png');

    if (!!this.state.user.photo) {
      photo = {uri: this.state.user.photo};
    }

    return (
      <ListItem avatar>
        <Left>
          <Thumbnail small source={photo} />
        </Left>

        <Body>
          <Text>{this.state.user.username}</Text>
          <Text note>កែតម្រូវ</Text>
        </Body>

        <Right>
          <Button transparent onPress={() => this.props.navigation.navigate('EditProfilePhoto', { refresh: this.refreshState.bind(this) })}>
            <AwesomeIcon name='angle-right' size={24} color='#bbb' />
          </Button>
        </Right>
      </ListItem>
    );
  }

  render() {
    return (
      <Container>
        { this._renderHeader() }

        <Content>
          <List>
            { this._renderPhoto() }
            { this._renderPersonalInfo() }
          </List>
        </Content>
      </Container>
    );
  }
}
