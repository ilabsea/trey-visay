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
import provinces from '../../../data/json/address/provinces.json';

const categories = {
  'public': 'សាលារដ្ឋ',
  'private': 'សាលាឯកជន',
  'ngo': 'អង្គការ'
}

class FilterScreen extends Component {
  _keyExtractor = (item, index) => item.toString();

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
    SchoolUtil.getSelectedProvince((province) => {
      this.setState({ selectedProvince: province || '' });
    });
    SchoolUtil.getSelectedCategory(category => {
      this.setState({ selectedCategory: category })
    })
    SchoolUtil.getSelectedDepartment(department => {
      this.setState({selectedDepartment: department})
    })
    SchoolUtil.getSelectedMajor((major) => {
      major = major == 'គ្រប់ជំនាញ' ? '': major;
      this.setState({ selectedValue: major });
    });

    setTimeout(() => {
      this.setState({majors: SchoolUtil.getMajors(this.state.selectedProvince, this.state.selectedCategory || 'public', this.state.selectedDepartment)})
    }, 300)
  }

  resetValues = () => {
    SchoolUtil.clearSelectedValues();
    this.setState({ selectedValue: '', selectedProvince: '', selectedCategory: '', selectedDepartment: '' });
    this.refreshProvinceValue();
  }

  setActive(value){
    this.setState({selectedValue: value});
  }

  setFilterValues(){
    let selectedValue = this.state.selectedValue == null ? '' : this.state.selectedValue;
    SchoolUtil.setSelectedMajor(selectedValue);
    SchoolUtil.setSelectedCategory(!this.state.selectedCategory ? '' : this.state.selectedCategory);
    SchoolUtil.setSelectedDepartment(!this.state.selectedDepartment ? '' : this.state.selectedDepartment);

    // firebase.analytics().logEvent(keyword.INSTITUTION_FILTER_APPLIED);

    this.props.route.params.refreshValue();
    this.props.navigation.goBack();
  }

  refreshProvinceValue() {
    SchoolUtil.getSelectedProvince((province) => {
      // province = province || '';
      this.setState({
        selectedProvince: province || '',
        // majors: SchoolUtil.getMajors(this.state.selectedProvince, 'public')
        majors: SchoolUtil.getMajors(province, this.state.selectedCategory || 'public', this.state.selectedDepartment)
      });
      // SchoolUtil.getSelectedMajor((major) => {
      //   major = major == 'គ្រប់ជំនាញ' ? '': major;
      //   this.setState({ selectedValue: major });
      // });
      // SchoolUtil.getSelectedCategory(category => {
      //   this.setState({ selectedCategory: category })
      //   SchoolUtil.getSelectedDepartment(department => {
      //     this.setState({selectedDepartment: department})
      //   })
      // })
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
    return <FilterDepartmentButtons selectedDepartment={this.state.selectedDepartment}
              updateSelectedDepartment={(department) => this.setState({selectedDepartment: department, majors: SchoolUtil.getMajors(this.state.selectedProvince, this.state.selectedCategory || 'public', department)})}
           />
  }

  renderCategories() {
    return <FilterCategoryButtons
              selectedCategory={this.state.selectedCategory}
              updateSelectedCategory={(category) => this.setState({selectedCategory: category, majors: SchoolUtil.getMajors(this.state.selectedProvince, category || 'public', this.state.selectedDepartment)})}
           />
  }

  renderTopSection() {
    let province = !!this.state.selectedProvince ? provinces.filter(province => province.code == this.state.selectedProvince)[0].label : 'គ្រប់ទីកន្លែង';
    return (
      <React.Fragment>
        <OneList text='ជ្រើសរើសទីតាំង' selectedValue={province}
          onPress={() => {
            this.props.navigation.navigate('FilterProvinces', {
              title: 'ជ្រើសរើសទីតាំង',
              kind: this.state.kind,
              selectedProvince: this.state.selectedProvince,
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
