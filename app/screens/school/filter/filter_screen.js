import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import API from '../../../api/schools';

import OneList from '../../../components/list/one_list';

class FilterScreen extends Component {

  constructor(props){
    super(props);

    this.state ={
      selectedProvince: '',
      selectedMajor: ''
    }
  }

  componentDidMount(){
    this.refreshState();
    this.props.navigation.setParams({_handleBack: this._handleBack.bind(this)});
  }

  _handleBack(){
    this.props.navigation.state.params.refresh();
  }

  refreshState() {
    API.getSelectedProvince((province) => {
      this.setState({ selectedProvince: province });
    });

    API.getSelectedMajor((major) => {
      this.setState({ selectedMajor: major });
    });
  }

  render(){
    let province = this.state.selectedProvince ? this.state.selectedProvince : 'គ្រប់ទីកន្លែង';
    let major = this.state.selectedMajor ? this.state.selectedMajor: "គ្រប់ជំនាញ";
    return (
      <View>
        <OneList onPress={() => {
            this.props.navigation.navigate('FilterProvinces', {
              title: 'ជ្រើសរើសទីតាំង',
              category: this.props.navigation.state.params.category,
              selectedProvince: province,
              refresh: this.refreshState.bind(this)
            })
          }} text='ជ្រើសរើសទីតាំង' selectedValue={province}/>

        <OneList onPress={() => {
            this.props.navigation.navigate('FilterMajors', {
              title: 'ជ្រើសរើសជំនាញ',
              category: this.props.navigation.state.params.category,
              selectedProvince: province,
              selectedMajor: major,
              refresh: this.refreshState.bind(this)
            })
          }} text='ជ្រើសរើសជំនាញ' selectedValue={major} />
      </View>
    )
  }
}

export default FilterScreen;
