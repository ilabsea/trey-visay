import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Container, Content, Footer } from 'native-base';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';

import FooterBar from '../../../components/footer/FooterBar';

import API from '../../../api/schools';
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
    this.getProvinces();
  }

  getProvinces() {
    API
      .getProvinces(this.props.navigation.state.params.category)
      .then(result => this.setState({provinces: result.provinces}))
      .catch(error => { console.log(error)} )
  }

  setSelectedProvince(province){
    this.setState({ selectedProvince: province });
  }

  setFilterValue(){
    API.setSelectedProvince(this.state.selectedProvince);
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

        <FooterBar text='យល់ព្រម' onPress={this.setFilterValue.bind(this)} />
      </Container>
    )
  }
}

export default FilterProvinces;
