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
    return (
      <View>
        <OneList onPress={() => {
            this.props.navigation.navigate('FilterProvinces', {
              title: 'ជ្រើសរើសទីតាំង',
              category: this.props.navigation.state.params.category,
              selectedProvince: this.state.selectedProvince,
              refresh: this.refreshState.bind(this)
            })
          }} text='ជ្រើសរើសទីតាំង' selectedValue={this.state.selectedProvince}/>

        <OneList onPress={() => {
            this.props.navigation.navigate('FilterMajors', {
              title: 'ជ្រើសរើសជំនាញ',
              category: this.props.navigation.state.params.category,
              selectedProvince: this.state.selectedProvince,
              selectedMajor: this.state.selectedMajor,
              refresh: this.refreshState.bind(this)
            })
          }} text='ជ្រើសរើសជំនាញ' selectedValue={this.state.selectedMajor}/>
      </View>
    )
  }
}

export default FilterScreen;
