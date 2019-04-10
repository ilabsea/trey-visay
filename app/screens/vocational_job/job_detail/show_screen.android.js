import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';
import RF from "react-native-responsive-fontsize"

// Utils
import styles from '../../../assets/style_sheets/profile_form';
import headerStyles from '../../../assets/style_sheets/header';
import StatusBar from '../../../components/shared/status_bar';
import LongText from '../../../components/vocational_job/long_text';
import characteristicList from '../../../data/json/characteristic_jobs';
import schoolList from '../../../data/json/schools';
import Images from '../../../assets/images';

export default class VocationalJobShowScreen extends Component {
  componentWillMount() {
    let currentGroup = characteristicList.find((obj) => obj.id == 4);
    let currentJob = currentGroup.careers.find((obj) => obj.id == this.props.navigation.state.params.id)
    let schools = schoolList.filter((school, pos) => { return currentJob.schools.includes(school.id) });

    this.setState({
      currentGroup: currentGroup,
      currentJob: currentJob,
      schools: schools
    });
  }

  _renderDescription() {
    return (
      <LongText text={this.state.currentJob.description || 'Description is not available'} />
    )
  }

  _renderPlacesForWork() {
    if (!this.state.currentJob.places_for_work) {
      return (null)
    }

    return (
      <View style={{marginTop: 20}}>
        <Text style={headerStyles.body2}>ទីកន្លែងការងារមានដូចជា៖</Text>
        <Text style={styles.box}>{this.state.currentJob.places_for_work}</Text>
      </View>
    )
  }

  _renderSchoolList() {
    if (!this.state.schools.length && !this.state.currentJob.unknown_schools) {
      return (null)
    }

    return (
      <View style={{marginTop: 20}}>
        <Text style={headerStyles.body2}>សាលាខាងក្រោមនេះមានបង្រៀនជំនាញ “{this.state.currentJob.name}”</Text>

        { !!this.state.currentJob.unknown_schools &&
          <View style={styles.box}>
            <Text style={styles.subTitle}>{this.state.currentJob.unknown_schools}</Text>
          </View>
        }

        { this.state.schools.map((school, i) => {
          { return(this._renderSchool(school, i)) }
        })}
      </View>
    )
  }

  _renderSchool(school, i) {
    let logo = require('../../../assets/images/schools/default.png');
    if (school.logoName) {
      logo = Images[school.logoName];
    }

    return (
      <TouchableOpacity
        style={[styles.box, {flexDirection: 'row'}]}
        onPress={() => {this.props.navigation.navigate('InstitutionDetail', {school: school})}}
        key={i}>

        <View>
          <Image source={logo} style={myStyles.image} />
        </View>

        <View style={{flex: 1, marginLeft: 16}}>
          <Text numberOfLines={1} style={myStyles.schoolName}>{school.universityName}</Text>

          <View style={{flexDirection: 'row'}}>
            <AwesomeIcon name='building-o' color='#1976d2' size={16} />
            <Text style={myStyles.schoolAddress}>{school.category}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <AwesomeIcon name='map-marker' color='#1976d2' size={18} />
            <Text numberOfLines={2} style={myStyles.schoolAddress}>{school.address}</Text>
          </View>
        </View>

        <View style={{justifyContent: 'center'}}>
          <AwesomeIcon name='angle-right' size={24} color='#bbb' />
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar />
        <ScrollView style={{flex: 1}}>
          <View style={myStyles.container}>
            { this._renderDescription() }
            { this._renderPlacesForWork() }
            { this._renderSchoolList() }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const myStyles = StyleSheet.create({
  container: {
    margin: 16
  },
  image: {
    width: 100,
    height: 100
  },
  schoolName: {
    fontSize: RF(2.4)
  },
  schoolAddress: {
    marginLeft: 8
  }
})
