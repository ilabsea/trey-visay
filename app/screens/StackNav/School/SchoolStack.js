import React from 'react';
import {
  Platform,
  StyleSheet,
} from 'react-native';
import {  Title, Body, Right, Button, Icon, Text } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import BackButton from '../../../components/shared/back_button';
import SaveButton from '../../../components/shared/save_button';

import SchoolScreen from '../../school/school_screen';
import InstitutionDetail from '../../school/institution_detail';
import FilterScreen from '../../school/filter/filter_screen';
import FilterProvinces from '../../school/filter/filter_provinces';
import { Colors } from '../../../assets/style_sheets/main/colors';
import { FontSetting } from '../../../assets/style_sheets/font_setting';

import SchoolUtil from '../../../utils/School/School';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const headerStyle = {backgroundColor: '#fff'}
const colorStyle = Platform.OS == 'android' ? {color: '#111'} : {}

function SchoolStack() {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName="Root">
      <Stack.Screen name="Root" component={SchoolScreen} options={({ navigation, route }) => ({
          headerLeft: (props) => (
            <Button transparent onPress={() => {
              navigation.goBack(null);
              SchoolUtil.clearSelectedValues();
            }}>
              <Icon name="arrow-back" style={colorStyle} />
            </Button>
          ),
          headerTitle: (props) => (<Title style={[styles.title, colorStyle]}>គ្រឹះស្ថានសិក្សា</Title>)
      })}/>
      <Stack.Screen name="InstitutionDetail" component={InstitutionDetail} options={{headerShown: false}} />
      <Stack.Screen name="FilterScreen" component={FilterScreen} options={({ navigation, route }) => ({
        title: "គ្រឹះស្ថានសិក្សា",
        headerRight: (props) => (
          <Button transparent onPress={() => route.params.handleReset()} >
            <Text style={{width: wp('30%'), color: Colors.blue, paddingTop: 6}}>កំណត់ឡេីងវិញ</Text>
          </Button>
        )
      })}/>

      <Stack.Screen name="FilterProvinces" component={FilterProvinces} options={({ navigation, route }) => ({
        title: "ជ្រេីសរេីសទីតាំង",
        headerRight: (props) => <SaveButton noIcon={true} navigation={navigation} />
      })}/>

    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: FontSetting.nav_title,
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'KantumruyLight'
  }
});

export default SchoolStack;
