import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
} from 'react-native-material-ui';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import headerStyles from '../assets/style_sheets/header';
import shareStyles from '../assets/style_sheets/profile_form';
import InstitutionTab from './institution_tab';
import schoolList from '../data/json/schools';

const uiTheme = {
  palette: {
    primaryColor: '#1976d2',
  }
};

export default class Institution extends Component {
  static navigationOptions = {
    header: null,
    drawerLabel: 'គ្រឹះស្ថានសិក្សា',
    drawerIcon: ({ tintColor }) => (
      <AwesomeIcon name='graduation-cap' size={18} color={tintColor} />
    ),
  };

  componentWillMount() {
    this.state = {
      schools: schoolList
    }
  }

  _renderSchool(school, i) {
    let logo = require('../assets/images/schools/default.png');
    if (school.logo) {
      logo = { uri: school.logo };
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

            <View style={{flexDirection: 'row'}}>
              <AwesomeIcon name='phone' color='#1976d2' size={24} />
              <Text style={{marginLeft: 8}}>{school.phoneNumbers.join('; ')}</Text>
            </View>

            { school.websiteOrFacebook.length && <View style={{flexDirection: 'row'}}>
              <AwesomeIcon name='globe' color='#1976d2' size={24} />
              <Text style={{marginLeft: 8}}>{school.websiteOrFacebook.join('; ')}</Text>
            </View> }
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _renderContent() {
    // return (
    //   <View>
    //     { this.state.schools.map((school, i) => {
    //       { return (this._renderSchool(school, i)) }
    //     })}
    //   </View>
    // )

    return ( <InstitutionTab></InstitutionTab> );
  }

  _onChangeText(val) {
    let list = schoolList;

    if (!!val) {
      list = schoolList.filter((school) => {
        return school.universityName.indexOf(val) > -1
      })
    }

    this.setState({schools: list})
  }

  _onSearchClosed() {
    this.setState({schools: schoolList});
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <Toolbar
            leftElement="menu"
            centerElement={<Text style={[headerStyles.headerTitleStyle, {marginLeft: 0}]}>គ្រឹះស្ថានសិក្សា</Text>}
            onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
            searchable={{
              autoFocus: true,
              placeholder: 'Search',
              onChangeText: this._onChangeText.bind(this),
              onSearchClosed: this._onSearchClosed.bind(this)
            }}
          />

          <View style={{flex: 1}}>
            { this._renderContent() }
          </View>
        </View>
      </ThemeProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
