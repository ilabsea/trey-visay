import React from 'react';
import {
  TouchableOpacity,
  Platform
} from 'react-native';
import { View, Header, Left, Title, Body, Right, Button, Icon, Text } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { createStackNavigator } from 'react-navigation';
import BackButton from '../../../components/shared/back_button';
import SaveButton from '../../../components/shared/save_button';

import SchoolScreen from '../../school/school_screen';
import InstitutionDetail from '../../school/institution_detail';
import FilterScreen from '../../school/filter/filter_screen';
import FilterProvinces from '../../school/filter/filter_provinces';
import { Colors } from '../../../assets/style_sheets/main/colors';

import API from '../../../api/schools';

const headerStyle = Platform.OS == 'android' ? {backgroundColor: Colors.blue} : {}
const SchoolStack = createStackNavigator(
  {
    Root: {
      screen: SchoolScreen,
      navigationOptions: ({navigation}) => ({
        header: (
          <Header hasSegment style={headerStyle}>
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
      navigationOptions: ({navigation, screenProps}) => ({
        title: 'គ្រឹះស្ថានសិក្សា',
        headerRight:(<Button transparent onPress={() => navigation.state.params.handleReset()} >
                      <Text style={{width: wp('30%')}}>កំណត់ឡេីងវិញ</Text>
                    </Button>)
      })
    },
    FilterProvinces: {
      screen: FilterProvinces,
      navigationOptions: ({navigation, screenProps}) => ({
        title: 'ជ្រេីសរេីសទីតាំង',
        headerRight:(<SaveButton noIcon={true} navigation={navigation} />)
      })
    }
  },

);

export default SchoolStack;
