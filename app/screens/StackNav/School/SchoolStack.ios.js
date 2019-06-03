import React from 'react';
import {
  TouchableOpacity
} from 'react-native';
import { Header, Left, Title, Body, Right, Button, Icon, Text } from 'native-base';

import { createStackNavigator } from 'react-navigation';
import BackButton from '../../../components/shared/back_button';
import SaveButton from '../../../components/shared/save_button';

import SchoolScreen from '../../school/school_screen';
import InstitutionDetail from '../../school/institution_detail';
import FilterScreen from '../../school/filter/filter_screen';
import FilterProvinces from '../../school/filter/filter_provinces';

import API from '../../../api/schools';

const SchoolStack = createStackNavigator(
  {
    Root: {
      screen: SchoolScreen,
      navigationOptions: ({navigation}) => ({
        header: (
          <Header hasSegment>
            <Left>
              <Button transparent onPress={() => {
                navigation.goBack(null);
                API.clearSelectedValues();
              }}>
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
        header: null
      })
    },
    FilterScreen: {
      screen: FilterScreen,
      navigationOptions: ({navigation}) => ({
        header: (
          <Header>
            <Left>
              <Button transparent onPress={() => navigation.goBack() }>
                <Text> បោះបង់</Text>
              </Button>
            </Left>
            <Body>
              <Title>គ្រឹះស្ថានសិក្សា</Title>
            </Body>
            <Right>
              <Button transparent>
                <Text>Reset</Text>
              </Button>
            </Right>
          </Header>
        )
      }),
    },
    FilterProvinces: {
      screen: FilterProvinces,
      navigationOptions: ({navigation, screenProps}) => ({
        title: 'ជ្រេីសរេីសទីតាំង',
        headerRight:(<SaveButton noIcon={true} navigation={navigation} />)
      })
    }
  }
);

export default SchoolStack;
