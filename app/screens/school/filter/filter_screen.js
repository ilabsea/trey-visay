import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import mainStyles from '../../../assets/style_sheets/main/main';

import ButtonList from '../../../components/list/button_list';
import GridList from '../../../components/list/grid_list';
import universities from '../../../data/json/universities.json';

class FilterScreen extends Component {

  constructor(props){
    super(props);
    this.state={
      majors: [],
      selectedValue: 'គ្រប់ជំនាញ'
    }
  }

  componentWillMount(){
    this.getMajors();
  }

  getMajors(){
    let category = "សាលារដ្ឋ";
    let province = "ត្បូងឃ្មុំ";
    let departments = [];
    universities.map(school => {
      if(school.category == category && school.province == province){
        departments.push(school.departments);
      }
    });
    departments = [].concat.apply([], departments);
    let majors = departments.map(department => department.majors);
    majors = [].concat.apply([], majors);
    majors = [...new Set(majors)];
    this.setState({majors : majors});
  }

  setActive(value){
    this.setState({selectedValue: value});
  }

  renderButton(major,i){
    let active = this.state.selectedValue == major;
    let activeIconBg = active ? { backgroundColor: 'rgb(24, 118, 211)' }: { backgroundColor:  'rgb(155, 155, 155)' };
    let activeText = active ? { color: 'rgb(24, 118, 211)' }: '';
    return(
      <TouchableOpacity
        style={styles.btn}
        key={i}
        onPress={() => this.setActive(major)}>
        <View style={[styles.iconWrapper, activeIconBg]}>
          <Image
            source={require("../../../assets/icons/school/major.png")}
            resizeMode='contain'
            style={styles.icon}
          />
        </View>
        <Text style={[activeText , { flex: 1 , paddingRight: 16}]}>{major}</Text>
      </TouchableOpacity>
    )
  }

  render(){
    let majors = ['គ្រប់ជំនាញ'].concat(this.state.majors);
    return (
      <ScrollView>
        <View style={{marginTop: 16, backgroundColor: 'white'}}>
          <ButtonList
            hasLine={true}
            onPress={() => {
              console.log('hello button list')
            }}
            title='ជ្រេីសរេីសទីតាំង'
          />
        </View>

        <Text style={[mainStyles.sectionText, { margin: 16 }]}>ជ្រេីសរេីសជំនាញ</Text>
        <View style={[mainStyles.grid, {justifyContent: 'flex-start',margin: 0}]}>
          { majors.map((major , i) => {
            { return (this.renderButton(major,i))}
          })}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    width: wp('50%'),
    height: hp('10%'),
    backgroundColor: 'white',
    borderColor: 'rgb(200, 199, 204)',
    borderWidth: 0.5,
    alignItems: 'center'
  },
  iconWrapper:{
    width: 32,
    height: 32,
    borderRadius: 12,
    marginRight: 16,
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:  'rgb(155, 155, 155)'
  },
  icon:{
    width: 18,
    height: 18
  }
})


export default FilterScreen;
