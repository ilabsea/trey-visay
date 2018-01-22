import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
} from 'react-native-material-ui';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';

// Utils
import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import StatusBar from '../../components/status_bar';
import characteristicList from '../../data/json/characteristic_jobs';
import schoolList from '../../data/json/schools';
import Images from '../../assets/images';

export default class VocationalJobShowScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: '',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>{state.params.title}</Text>,
      headerStyle: headerStyles.headerStyle,
      headerTintColor: '#fff'
    }
  };

  componentWillMount() {
    let currentGroup = characteristicList.find((obj) => obj.id == 4);
    let currentJob = currentGroup.careers.find((obj) => obj.id == this.props.navigation.state.params.id)

    this.state = {
      currentGroup: currentGroup,
      currentJob: currentJob
    };
  }

  _renderDescription() {
    return (
      <Text style={styles.box}>{this.state.currentJob.description || 'Description is not available'}</Text>
    )
  }

  _renderSchoolList() {
    let schools = schoolList.slice(0, 3);

    return (
      <View style={{marginTop: 20}}>
        <Text style={headerStyles.body2}>សាលាខាងក្រោមនេះមានបង្រៀនជំនាញ “{this.state.currentJob.name}”</Text>
        { schools.map((school, i) => {
          { return(this._renderSchool(school, i)) }
        })}
      </View>
    )
  }

  _renderSchool(school, i) {
    let logo = require('../../assets/images/schools/default.png');
    if (school.logoName) {
      logo = Images[school.logoName];
    }

    return (
      <TouchableOpacity
        style={[styles.box, {flexDirection: 'row'}]}
        onPress={() => {this.props.navigation.navigate('InstitutionDetail', {id: school.id})}}
        key={i}>

        <View>
          <Image source={logo} style={{width: 100, height: 100}} />
        </View>

        <View style={{flex: 1, marginLeft: 16}}>
          <Text style={styles.subTitle}>{school.universityName}</Text>

          <View style={{flexDirection: 'row'}}>
            <AwesomeIcon name='building-o' color='#1976d2' size={20} />
            <Text style={{marginLeft: 8}}>{school.category}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <AwesomeIcon name='map-marker' color='#1976d2' size={24} />
            <Text style={{marginLeft: 8}}>{school.address}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <ThemeProvider uiTheme={{}}>
        <View style={{flex: 1}}>
          <StatusBar />
          <ScrollView style={{flex: 1}}>
            <View style={{margin: 16, flex: 1}}>
              { this._renderDescription() }
              { this._renderSchoolList() }
            </View>
          </ScrollView>
        </View>
      </ThemeProvider>
    );
  }
}