import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Divider } from 'react-native-paper';
import SchoolUtil from '../../../utils/School/School';
import CustomNavigationHeader from '../../../components/shared/CustomNavigationHeader'
import {Text} from '../../../components'
import {pressableItemSize, screenHorizontalPadding} from '../../../constants/component_constant'
import Color from '../../../themes/color'
import {isShortScreenDevice} from '../../../utils/responsive_util'

class FilterProvinces extends Component {
  constructor(props){
    super(props);

    this.state = {
      provinces: [],
      category: props.route.params.category,
      selectedProvince: props.route.params.selectedProvince
    }
  };

  componentDidMount() {
    this.setProvinces();
  }

  setProvinces() {
    let provinces = SchoolUtil.getProvinces(this.state.category);
    this.setState({provinces: provinces});
  }

  setSelectedProvince(province){
    this.setState({ selectedProvince: province });

    SchoolUtil.setSelectedProvince(province);
    this.props.route.params.refreshValue();
    this.props.navigation.goBack();
  }

  renderProvinces(province, i) {
    return (
      <View key={i}>
        <TouchableOpacity
          style={{flexDirection: 'row', minHeight: isShortScreenDevice() ? pressableItemSize : 56, paddingHorizontal: screenHorizontalPadding, alignItems: 'center', paddingVertical: 6}}
          onPress={()=> this.setSelectedProvince(province)}
        >
          <Text style={{flex: 1, marginTop: 2}}>{province}</Text>
          { this.state.selectedProvince == province &&
            <Icon name='check' size={24} color={Color.pressable} />
          }
        </TouchableOpacity>
        <Divider style={{marginHorizontal: screenHorizontalPadding}}/>
      </View>
    )
  }

  render(){
    let provinces = ['គ្រប់ទីកន្លែង'].concat(this.state.provinces)
    return (
      <View style={{flexGrow: 1}}>
        <CustomNavigationHeader title="ជ្រើសរើសទីតាំង"/>
        <ScrollView>
          { provinces.map((province, i) => {
            { return (this.renderProvinces(province, i))}
          })}
        </ScrollView>
      </View>
    )
  }
}

export default FilterProvinces;