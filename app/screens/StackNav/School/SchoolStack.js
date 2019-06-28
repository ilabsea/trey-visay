import React from 'react';
import {
  TouchableOpacity,
  Platform,
  StatusBar
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
import { FontSetting } from '../../../assets/style_sheets/font_setting';

import SchoolUtil from '../../../utils/School/School';

const headerStyle = {backgroundColor: '#fff', marginTop: StatusBar.currentHeight}
const SchoolStack = createStackNavigator(
  {
    Root: {
      screen: SchoolScreen,
      navigationOptions: ({navigation}) => ({
        header: (
          <Header hasSegment style={headerStyle} androidStatusBarColor="rgba(0, 0, 0, 0.251)">
            <Left>
              <Button transparent onPress={() => {
                navigation.goBack(null);
                SchoolUtil.clearSelectedValues();
              }}>
                <Icon name="arrow-back" style={{color: '#111'}} />
              </Button>
            </Left>
            <Body>
              <Title style={{fontSize: FontSetting.title, color: '#111'}}>គ្រឹះស្ថានសិក្សា</Title>
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
                      <Text style={{width: wp('30%'), color: Colors.blue, paddingTop: 6}}>កំណត់ឡេីងវិញ</Text>
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
  {
    navigationOptions: ({
      headerTitleStyle: {
        fontSize: FontSetting.nav_title
      }
    }),
  }

);

export default SchoolStack;
