import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Picker,
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
} from 'react-native-material-ui';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import headerStyles from '../assets/style_sheets/header';
import shareStyles from '../assets/style_sheets/profile_form';

import schoolList from '../data/json/schools';
import Images from '../assets/images';

const uiTheme = {
  palette: {
    primaryColor: '#1976d2',
  }
};

export default class GovernmentSchoolScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      header:
        <ThemeProvider uiTheme={{}}>
          <Toolbar
            leftElement="menu"
            centerElement={<Text style={[headerStyles.headerTitleStyle, {marginLeft: 0}]}>គ្រឹះស្ថានសិក្សា</Text>}
            onLeftElementPress={() => screenProps.drawerNavigation.navigate('DrawerOpen') }
          />
        </ThemeProvider>,
      tabBarLabel: 'សាលារដ្ឋ',
    }
  };

  govSchools = [];
  provinceSchools = [];

  componentWillMount() {
    this.govSchools = schoolList.filter(school => school.category == 'សាលារដ្ឋ');

    this.state = {
      schools: this.govSchools,
      location: '',
      major: '',
      majors: [],
      provinces: [...new Set(this.govSchools.map(school => school.province))],
    }
  }

  _getMajors(schools) {
    let departments = schools.map(school => school.departments);
    departments = [].concat.apply([], departments);

    let majors = departments.map(department => department.majors);
    majors = [].concat.apply([], majors);
    majors = [...new Set(majors)]

    return majors;
  }

  _renderSchool(school, i) {
    let logo = require('../assets/images/schools/default.png');
    if (!!school.logoName) {
      logo = Images[school.logoName];
    }

    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('InstitutionDetail', {id: school.id})} key={i}>
        <View style={[shareStyles.box, {flexDirection: 'row'}]}>
          <View>
            <Image source={logo} style={{width: 100, height: 100}} />
          </View>

          <View style={{flex: 1, marginLeft: 16}}>
            <Text style={shareStyles.subTitle}>{school.universityName}</Text>

            <View style={{flexDirection: 'row'}}>
              <AwesomeIcon name='map-marker' color='#1976d2' size={24} />
              <Text style={{marginLeft: 8}}>{school.address}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _renderContent() {
    return (
      <View>
        { this.state.schools.map((school, i) => {
          { return (this._renderSchool(school, i)) }
        })}
      </View>
    )
  }

  _onChangeProvince(province) {
    this.setState({location: province, major: ''});
    let schools = this.govSchools;
    let majors = [];

    if (!!province) {
      schools = this.govSchools.filter(school => school.province == province);
      majors = this._getMajors(schools);
    }

    this.provinceSchools = schools;
    this.setState({majors: majors});
    this.setState({schools: schools});
  }

  _onChangeMajor(major) {
    this.setState({major: major});
    let schools = this.provinceSchools;

    if (!!major) {
      schools = schools.filter((school) => {
        let departments = school.departments.filter((department) => department.majors.includes(major));
        return !!departments.length;
      });
    }

    this.setState({schools: schools});
  }

  _renderFilters() {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{width: 200}}>
          <Picker
            selectedValue={this.state.location}
            onValueChange={(itemValue, itemIndex) => this._onChangeProvince(itemValue)}
            mode='dialog'
            prompt='ជ្រើសរើសទីតាំង'
            itemStyle={{fontFamily: 'Kantumruy', fontSize: 16}}
          >
            <Picker.Item label="គ្រប់ទីកន្លែង" value="" />
            { this.state.provinces.map((province, i) => {
              return (<Picker.Item key={i} label={province} value={province} />)
            })}

          </Picker>
        </View>

        <View style={{width: 200}}>
          <Picker
            selectedValue={this.state.major}
            onValueChange={(itemValue, itemIndex) => this._onChangeMajor(itemValue)}
            mode='dialog'
            prompt='ជ្រើសរើសជំនាញ'
          >
            <Picker.Item label="គ្រប់ជំនាញ" value="" />

            { this.state.majors.map((major, i) => {
              return (<Picker.Item key={i} label={major} value={major} />)
            })}
          </Picker>
        </View>
      </View>
    )
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <ScrollView>
          <View style={{margin: 16, flex: 1}}>
            <View>
              { this._renderFilters()}
            </View>

            { this._renderContent() }

          </View>
        </ScrollView>
      </ThemeProvider>
    )
  }
}
