import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { Container, Content } from 'native-base';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';
import SchoolUtil from '../../../utils/School/School';
import mainStyles from '../../../assets/style_sheets/main/main';

class FilterProvinces extends Component {
  constructor(props){
    super(props);

    this.state = {
      provinces: [],
      category: props.navigation.state.params.category,
      selectedProvince: props.navigation.state.params.selectedProvince
    }
  };

  componentWillMount(){
    this.setProvinces();
  }

  setProvinces() {
    let provinces = SchoolUtil.getProvinces(this.state.category);
    this.setState({provinces: provinces});
  }

  setSelectedProvince(province){
    this.setState({ selectedProvince: province });

    SchoolUtil.setSelectedProvince(province);
    this.props.navigation.state.params.refreshValue();
    this.props.navigation.goBack();
  }

  renderProvinces(province, i) {
    return (
      <View key={i}>
        <TouchableOpacity
          style={mainStyles.btnList}
          onPress={()=> this.setSelectedProvince(province)}
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

      <Container>
        <Content style={mainStyles.box}>
          { provinces.map((province, i) => {
            { return (this.renderProvinces(province, i))}
          })}
        </Content>
      </Container>
    )
  }
}

export default FilterProvinces;
