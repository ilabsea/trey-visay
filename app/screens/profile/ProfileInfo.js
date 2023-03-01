import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentUser } from '../../redux/features/user/userSlice';
import ScrollableHeader from '../../components/scrollable_header';

import provinces from '../../data/json/address/provinces.json';
import communes from '../../data/json/address/communes.json';
import districts from '../../data/json/address/districts.json';
import highSchools from '../../data/json/address/highSchools.json';
import te from '../../data/translates/km';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Button, Icon, Separator } from 'native-base';
import { View, TouchableOpacity, StatusBar, Platform } from 'react-native';
import Login from '../Account/login';
import uuidv4 from '../../utils/uuidv4';
import grades from '../../data/json/grades.json';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Profile({route, navigation}) {
  const currentUser = useSelector((state) => state.currentUser.value)
  const title = 'ប្រវត្តិរូបសង្ខេប';
  // const navigation = useNavigation();

  useEffect(() => {
    navigation.setParams({from: 'ProfileScreen', disableNavigationBar: true});
  }, []);

  const _renderPhoto = () => {
    let photo = require('../../assets/images/default_profile.png');

    if (!!currentUser.photo) {
      photo = {uri: currentUser.photo};
    }

    return (
      <ListItem
        thumbnail
        button
        style={{marginTop: 16, marginBottom: 20, marginLeft: 0, paddingLeft: 16, backgroundColor: '#fff'}}
        onPress={() => navigation.navigate('EditProfilePhoto')}>
        <Left>
          <Thumbnail large source={photo} />
        </Left>

        <Body>
          <Text>{currentUser.username}</Text>
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

  const _renderListItem = (title, value, icon) => {
    return (
      <ListItem icon key={uuidv4()}>
        <Left>{ !!icon && <Icon name={icon} /> }</Left>
        <Body><Text>{title}</Text></Body>
        <Right><Text>{value || '-'}</Text></Right>
      </ListItem>
    );
  }

  const _renderPersonalInfo = () => {
    let arr = [
      {name: 'fullName', icon: 'md-person'},
      {name: 'username',icon: 'md-key'},
      {name: 'sex', icon: 'transgender'},
      {name: 'dateOfBirth', icon: 'calendar'},
      {name: 'phoneNumber', icon: 'call'}];
    let info = arr.map((item, i) => _renderListItem(te[item.name], currentUser[item.name], item.icon));

    return (
      <List style={{backgroundColor: '#fff'}}>
        <ListItem>
          <Text style={{flex: 1}}>{title}</Text>

          <Right>
            <TouchableOpacity onPress={() => navigation.navigate('EditPersonalInfo')}>
              <Text style={{color: '#1976d2'}}>កែតម្រូវ</Text>
            </TouchableOpacity>
          </Right>
        </ListItem>

        { info }
        { _renderStudy() }
      </List>
    );
  }

  const _renderStudy = () => {
    let user = currentUser;
    let provinceName = user.provinceCode ? provinces.find((province) => province.code == user.provinceCode).label : '';
    let districtName = user.districtCode ? districts.find((district) => district.code == user.districtCode).label : '';
    let communeName = user.communeCode ? communes.find((commune) => commune.code == user.communeCode).label : '';
    let schoolName = user.highSchoolCode ? highSchools.find((school) => school.code == user.highSchoolCode).label : '';

    let arr = [
      {name: 'schoolName', value: schoolName, icon: 'school'},
      {name: 'communeName', value: communeName, icon: 'pin'},
      {name: 'districtName', value: districtName, icon: 'pin'},
      {name: 'provinceName', value: provinceName, icon: 'pin'}];

    let doms = arr.map((item, i) => _renderListItem(te[item.name], item.value, item.icon))
    let grade = grades.find(x => x.value == currentUser.grade);
    grade = grade && grade.name;

    doms.unshift(_renderListItem('រៀនថ្នាក់ទី', grade, 'school'));

    return doms;
  }

  const _renderContent = () => {
    return (
      <View>
        { _renderPhoto() }
        { _renderPersonalInfo() }
      </View>
    )
  }

  if (!currentUser) {
    return (<Login route={route} />);
  } else {
    return (
      <ScrollableHeader
        renderContent={ _renderContent }
        title={title}
        largeTitle={title}
      />
    )
  }
}
