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

class FilterMajors extends Component {
  constructor(props){
    super(props);

    this.state = {
      majors: [],
      selectedMajor: props.navigation.state.params.selectedMajor
    }
  }

  componentWillMount(){
    this.getMajors();
    this.props.navigation.setParams({
      handleSubmit: this._handleSubmit.bind(this)
    });
  }

  setSelectedMajor(major){
    this.setState({ selectedMajor: major });
  }

  _handleSubmit(){
    API.setSelectedMajor(this.state.selectedMajor);
    this.props.navigation.state.params.refresh();
    this.props.navigation.goBack();
  }

  getMajors(){
    let province = 'គ្រប់ទីកន្លែង' ? '' : this.props.navigation.state.params.selectedProvince;
    let category = this.props.navigation.state.params.category;
    API.getSchools(1, {category: category, province: province })
      .then(result => {
        let departments = result.records.map(school => school.departments);
        departments = [].concat.apply([], departments);

        let majors = departments.map(department => department.majors);
        majors = [].concat.apply([], majors);
        majors = [...new Set(majors)]

        this.setState({majors: majors});
      })
      .catch(error => console.log('error get schools'));
  }

  renderMajors(major, i){
    return (
      <View>
        <TouchableOpacity
          style={mainStyles.btnList}
          onPress={()=> this.setSelectedMajor(major)}
          key={i}
        >
          <Text style={mainStyles.title}>{major}</Text>
          { this.state.selectedMajor == major &&
            <AwesomeIcon name='check' size={18} color='green' />
          }
        </TouchableOpacity>
        <Divider style={{marginLeft: 16}}/>
      </View>
    )
  }

  render(){
    let majors = ['គ្រប់ជំនាញ'].concat(this.state.majors)
    return(
      <ScrollView style={mainStyles.box}>
        { majors.map((major, i) => {
          { return (this.renderMajors(major, i))}
        })}
      </ScrollView>
    )
  }
}

export default FilterMajors;
