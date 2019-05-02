import React from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';
import { Header, Left, Title, Body, Right, Button, Icon } from 'native-base';

import { createStackNavigator } from 'react-navigation';
import Filter from '../../components/schools/filter';
import BackButton from '../../components/shared/back_button';
import SaveButton from '../../components/shared/save_button';

import SchoolScreen from './school_screen';
import InstitutionDetail from './institution_detail';
import FilterScreen from './filter/filter_screen';
import FilterProvinces from './filter/filter_provinces';
import FilterMajors from './filter/filter_majors';

const InstitutionStack = createStackNavigator(
  {
    Root: {
      screen: SchoolScreen,
      navigationOptions: ({navigation}) => ({
        header: (
          <Header hasSegment>
            <Left>
              <Button transparent onPress={() => navigation.goBack(null) }>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>គ្រឹះស្ថានសិក្សា</Title>
            </Body>
            <Right>
            </Right>
          </Header>
        )
      }),
    },
    InstitutionDetail: {
      screen: InstitutionDetail,
      navigationOptions: ({navigation}) => ({
        header: (
          <Header span>
            <Left>
              <Button transparent onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
            </Body>
            <Right />
          </Header>
        )
      })
    },
    FilterScreen: {
      screen: FilterScreen
    },
    FilterProvinces: {
      screen: FilterProvinces,
      navigationOptions: ({navigation, screenProps}) => ({
        title: 'ជ្រេីសរេីសទីតាំង',
        headerRight:(<SaveButton noIcon={true} navigation={navigation} />)
      })
    },
    FilterMajors: {
      screen: FilterMajors,
      navigationOptions: ({navigation, screenProps}) => ({
        title: 'ជ្រេីសរេីសជំនាញ',
        headerRight:(<SaveButton noIcon={true} navigation={navigation} />)
      })
    }
  },
  {
    navigationOptions: ({navigation}) => ({
      headerLeft: <BackButton navigation={navigation}/>
    })
  }
);

export default InstitutionStack;
