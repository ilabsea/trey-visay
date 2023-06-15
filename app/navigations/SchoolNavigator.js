import React from 'react';
import {
  Platform,
  StyleSheet,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import SaveButton from '../components/shared/save_button';

import SchoolScreen from '../screens/school/SchoolScreen';
import InstitutionDetail from '../screens/school/institution_detail';
import FilterScreen from '../screens/school/filter/filter_screen';
import FilterProvinces from '../screens/school/filter/filter_provinces';
import { Colors } from '../assets/style_sheets/main/colors';
import { FontSetting } from '../assets/style_sheets/font_setting';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const headerStyle = {backgroundColor: '#fff'}
const colorStyle = Platform.OS == 'android' ? {color: '#111'} : {}

function SchoolNavigator() {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName="Root">
      <Stack.Screen name ="Root" component={SchoolScreen} options={{headerShown: false}} />

      {/* <Stack.Screen name="Root" component={SchoolScreen} options={({ navigation, route }) => ({
          // headerLeft: () => (
          //   <Button transparent onPress={() => {
          //     navigation.goBack(null);
          //     SchoolUtil.clearSelectedValues();
          //   }}>
          //     <Icon name="arrow-back" style={colorStyle} />
          //   </Button>
          // ),
          headerTitle: (props) => (<Title style={[styles.title, colorStyle]}>គ្រឹះស្ថានសិក្សា</Title>)
      })}/> */}
      <Stack.Screen name="InstitutionDetail" component={InstitutionDetail} options={{headerShown: false}} />
      <Stack.Screen name="FilterScreen" component={FilterScreen} options={{headerShown: false}}/>
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

export default SchoolNavigator;
