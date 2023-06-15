import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import firebase from 'react-native-firebase';

import SchoolUtil from '../../../utils/School/School';

import mainStyles from '../../../assets/style_sheets/main/main';
import { Colors } from '../../../assets/style_sheets/main/colors';
import { FontSetting } from '../../../assets/style_sheets/font_setting';

import {Text} from '../../../components';
import BoldLabelComponent from '../../../components/shared/BoldLabelComponent';
import FilterNavigationHeader from '../../../components/schools/FilterNavigationHeader'
import OneList from '../../../components/list/one_list';
import GridList from '../../../components/list/grid_list';
import universities from '../../../data/json/universities';
import FooterBar from '../../../components/footer/FooterBar';
import keyword from '../../../data/analytics/keyword';
import Color from '../../../themes/color';

class FilterScreen extends Component {
  _keyExtractor = (item, index) => index.toString();

  constructor(props){
    super(props);
    this.state={
      majors: [],
      selectedValue: '',
      selectedProvince: '',
      category: props.route.params.category
    }
  }

  // componentWillMount(){
  //   this.refreshProvinceValue();
  // }

  componentDidMount() {
    this.refreshProvinceValue();

    this.props.navigation.setParams({
      handleReset: this.resetValues
    });
  }

  resetValues = () => {
    SchoolUtil.clearSelectedValues();
    this.setState({ selectedValue: '', selectedProvince: '' });
    this.refreshProvinceValue();
  }

  getMajors() {
    let category = this.state.category;
    let province = this.state.selectedProvince;
    let departments = [];
    universities.map(school => {
      if(province){
        if((school.category == category) && (school.province == province)){
          departments.push(school.departments);
        }
      }else{
        if(school.category == category){
          departments.push(school.departments);
        }
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

  setFilterValues(){
    let selectedValue = this.state.selectedValue == null ? '' : this.state.selectedValue;
    SchoolUtil.setSelectedMajor(selectedValue);

    // firebase.analytics().logEvent(keyword.INSTITUTION_FILTER_APPLIED);

    this.props.route.params.refreshValue();
    this.props.navigation.goBack();
  }

  refreshProvinceValue() {
    SchoolUtil.getSelectedProvince((province) => {
      province = province == 'គ្រប់ទីកន្លែង'? '' : province;
      this.setState({ selectedProvince: province });
      this.getMajors();
      SchoolUtil.getSelectedMajor((major) => {
        major = major == 'គ្រប់ជំនាញ' ? '': major;
        this.setState({ selectedValue: major });
      });
    });
  }

  renderButton(major,i){
    let active = this.state.selectedValue == major;
    let activeIconBg = active ? { backgroundColor: Colors.blue }: { backgroundColor: Colors.gray };
    let activeText = active ? { color: Colors.blue }: '';
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
        <Text numberOfLines={2} style={[activeText , { flex: 1 , paddingRight: 16, lineHeight: 28}]}>{major}</Text>
      </TouchableOpacity>
    )
  }

  renderTopSection() {
    let province = this.state.selectedProvince ? this.state.selectedProvince : 'គ្រប់ទីកន្លែង';
    return (
      <React.Fragment>
        <OneList onPress={() => {
            this.props.navigation.navigate('FilterProvinces', {
              title: 'ជ្រើសរើសទីតាំង',
              category: this.state.category,
              selectedProvince: province,
              refreshValue: this.refreshProvinceValue.bind(this)
            })
          }} text='ជ្រើសរើសទីតាំង' selectedValue={province}
        />
        <Text style={{marginLeft: 16, marginTop: 10, marginBottom: 6, color: Color.paleBlackColor}}>
          ជ្រេីសរេីសជំនាញ
        </Text>
      </React.Fragment>
    )
  }

  renderMajors(){
    let majors = ['គ្រប់ជំនាញ'].concat(this.state.majors);
    return <FlatList
              data={ majors }
              renderItem={ ({item, index}) => this.renderButton(item, index) }
              refreshing={false}
              keyExtractor={this._keyExtractor}
              horizontal={false}
              numColumns={2}
              ListHeaderComponent={() => this.renderTopSection()}
           />
  }

  render(){
    let province = this.state.selectedProvince ? this.state.selectedProvince : 'គ្រប់ទីកន្លែង';
    return (
      <View style={{flex: 1}}>
        <FilterNavigationHeader/>
        { this.renderMajors() }
        <FooterBar text='យល់ព្រម' onPress={this.setFilterValues.bind(this)} />
      </View>
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
