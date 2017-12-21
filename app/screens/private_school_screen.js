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

// import schoolList from '../data/json/skill_schools';
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
      tabBarLabel: 'សាលាឯកជន',
    }
  };

  componentWillMount() {
    this.state = {
      schools: schoolList.filter(school => school.category == 'សាលាឯកជន')
    }
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
        <ScrollView>
          <View style={{margin: 16, flex: 1}}>
            { this._renderContent() }
          </View>
        </ScrollView>
      </ThemeProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
