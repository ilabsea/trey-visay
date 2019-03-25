import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';

import API from '../../../api/schools';
import { mainStyles } from '../../../assets/style_sheets/main/main';

class FilterProvinces extends Component {
  constructor(props){
    super(props);

    this.state = {
      provinces: [],
      selectedProvince: props.navigation.state.params.selectedProvince
    }
  };

  componentWillMount(){
    this.getProvinces();
    this.props.navigation.setParams({
      _handleBack: this._handleBack.bind(this),
      handleSubmit: this._handleSubmit.bind(this)
    });
  }

  getProvinces() {
    API
      .getProvinces(this.props.navigation.state.params.category)
      .then(result => this.setState({provinces: result.provinces}))
      .catch(error => {console.log(error)})
  }

  setSelectedProvince(province){
    this.setState({ selectedProvince: province });
  }

  _handleBack(){
    this.props.navigation.state.params.refresh();
  }

  _handleSubmit(){
    API.setSelectedProvince(this.state.selectedProvince);
  }

  renderProvinces(province, i) {
    return (
      <View>
        <TouchableOpacity
          style={mainStyles.btnList}
          onPress={()=> this.setSelectedProvince(province)}
          key={i}
        >
          <Text style={mainStyles.title}>{province}</Text>
          { this.state.selectedProvince == province &&
            <AwesomeIcon name='check' size={18} color='green' />
          }
        </TouchableOpacity>
        <Divider style={{marginLeft: 16}}/>
      </View>
    )
  }

  render(){
    let provinces = ['គ្រប់ទីកន្លែង'].concat(this.state.provinces)
    return(
      <ScrollView style={mainStyles.box}>
        { provinces.map((province, i) => {
          { return (this.renderProvinces(province, i))}
        })}
      </ScrollView>
    )
  }
}

export default FilterProvinces;
