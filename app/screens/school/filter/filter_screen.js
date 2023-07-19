import React, { Component } from 'react';
import { View, FlatList } from 'react-native';

// import firebase from 'react-native-firebase';

import SchoolUtil from '../../../utils/school_util';
import {Text} from '../../../components';
import FilterNavigationHeader from '../../../components/schools/FilterNavigationHeader'
import OneList from '../../../components/list/one_list';
import FooterBar from '../../../components/footer/FooterBar';
import FilterButton from './filter_button';
import FilterCategoryButtons from './filter_category_buttons';
import FilterDepartmentButtons from './filter_department_buttons';
import keyword from '../../../data/analytics/keyword';
import Color from '../../../themes/color';

const categories = {
  'public': 'សាលារដ្ឋ',
  'private': 'សាលាឯកជន',
  'ngo': 'អង្គការ'
}

class FilterScreen extends Component {
  _keyExtractor = (item, index) => index.toString();

  constructor(props){
    super(props);
    this.state={
      majors: [],
      selectedValue: '',
      selectedProvince: '',
      selectedCategory: '',
      selectedDepartment: '',
      kind: props.route.params.kind
    }
  }

  componentDidMount() {
    this.refreshProvinceValue();
  }

  resetValues = () => {
    SchoolUtil.clearSelectedValues();
    this.setState({ selectedValue: '', selectedProvince: '', selectedCategory: '' });
    this.refreshProvinceValue();
  }

  setActive(value){
    this.setState({selectedValue: value});
  }

  setFilterValues(){
    let selectedValue = this.state.selectedValue == null ? '' : this.state.selectedValue;
    SchoolUtil.setSelectedMajor(selectedValue);
    SchoolUtil.setSelectedCategory(!this.state.selectedCategory ? '' : this.state.selectedCategory);

    // firebase.analytics().logEvent(keyword.INSTITUTION_FILTER_APPLIED);

    this.props.route.params.refreshValue();
    this.props.navigation.goBack();
  }

  refreshProvinceValue() {
    SchoolUtil.getSelectedProvince((province) => {
      province = province == 'គ្រប់ទីកន្លែង'? '' : province;
      this.setState({
        selectedProvince: province,
        majors: SchoolUtil.getMajors(this.state.selectedProvince, 'public')
      });
      SchoolUtil.getSelectedMajor((major) => {
        major = major == 'គ្រប់ជំនាញ' ? '': major;
        this.setState({ selectedValue: major });
      });
      SchoolUtil.getSelectedCategory(category => {
        this.setState({ selectedCategory: category })
      })
    });
  }

  renderButton(major,i){
    return <FilterButton
              key={`major-${i}`}
              item={major}
              label={major}
              isSelected={this.state.selectedValue == major}
              updateSelectedItem={(item) => this.setActive(item)}
           />
  }

  renderTvetDepartments() {
    return <FilterDepartmentButtons selectedDepartment={this.state.selectedDepartment} updateSelectedDepartment={(department) => this.setState({selectedDepartment: department})} />
  }

  renderCategories() {
    return <FilterCategoryButtons
              selectedCategory={this.state.selectedCategory}
              updateSelectedCategory={(category) => this.setState({selectedCategory: category})}
           />
  }

  renderTopSection() {
    let province = this.state.selectedProvince ? this.state.selectedProvince : 'គ្រប់ទីកន្លែង';
    return (
      <React.Fragment>
        <OneList text='ជ្រើសរើសទីតាំង' selectedValue={province}
          onPress={() => {
            this.props.navigation.navigate('FilterProvinces', {
              title: 'ជ្រើសរើសទីតាំង',
              kind: this.state.kind,
              selectedProvince: province,
              refreshValue: this.refreshProvinceValue.bind(this)
            })
          }}
        />
        {this.renderCategories()}
        {this.props.route.params.kind == 'tvet_institute' && this.renderTvetDepartments()}

        <Text style={{marginLeft: 16, marginTop: 10, marginBottom: 6, color: Color.paleBlackColor}}>
          ជ្រើសរើសជំនាញ
        </Text>
      </React.Fragment>
    )
  }

  render(){
    let majors = ['គ្រប់ជំនាញ'].concat(this.state.majors);
    return (
      <View style={{flex: 1}}>
        <FilterNavigationHeader resetValues={() => this.resetValues()} />
        <FlatList
          data={ majors }
          renderItem={ ({item, index}) => this.renderButton(item, index) }
          refreshing={false}
          keyExtractor={this._keyExtractor}
          horizontal={false}
          numColumns={2}
          ListHeaderComponent={() => this.renderTopSection()}
        />
        <FooterBar text='យល់ព្រម' onPress={this.setFilterValues.bind(this)} />
      </View>
    )
  }
}

export default FilterScreen;
