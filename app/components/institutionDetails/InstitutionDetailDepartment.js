import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import mainStyles from '../../assets/style_sheets/main/main';
import { Colors } from '../../assets/style_sheets/main/colors';
import Text from '../Text';

const InstitutionDetailDepartment = (props) => {
  let {departments} = props.school
  departments = JSON.parse(departments)

  const renderMajors = (majors) => {
    return majors.map((major, i) => {
              return (
                <View style={[styles.btn, i % 2 == 0 && {borderRightWidth: 0.5}]} key={`major-${i}`}>
                  <View style={styles.iconWrapper}>
                    <Image source={require("../../assets/icons/school/major.png")} resizeMode='contain' style={styles.icon} />
                  </View>
                  <Text numberOfLines={2} style={{ flex: 1 , paddingRight: 16}}>{major}</Text>
                </View>
              )
           })
  }

  const renderDepartments = () => {
    return departments.map((department, i) => {
              return (
                <View key={`departure-${i}`} style={[mainStyles.box, {marginTop: i == 0 ? 0 : 6}]}>
                  { !!department.name &&
                    <Text style={mainStyles.sectionText}> {department.name} </Text>
                  }
                  <View style={[mainStyles.grid, { justifyContent: 'flex-start', margin: 0 }]}>
                    {renderMajors(department.majors)}
                  </View>
                </View>
              )
           })
  }


  if (!departments || !departments.length)
    return (null);

  return <View style={{backgroundColor: 'rgb(239, 240, 244)'}}>
            <Text style={[mainStyles.sectionText, {marginLeft: 16}]}>ជំនាញ</Text>
            {renderDepartments()}
          </View>
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    width: wp('49.8%'),
    height: hp('10%'),
    backgroundColor: 'white',
    borderBottomColor: 'rgb(200, 199, 204)',
    borderRightColor: 'rgb(200, 199, 204)',
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  iconWrapper:{
    width: 32,
    height: 32,
    borderRadius: 12,
    marginRight: 16,
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:  Colors.blue
  },
  icon:{
    width: 18,
    height: 18
  }
});

export default InstitutionDetailDepartment