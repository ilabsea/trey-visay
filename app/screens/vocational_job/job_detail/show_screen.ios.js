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

// Utils
import { mainStyles } from '../../../assets/style_sheets/main/main';
import { FontSetting } from "../../../assets/style_sheets/font_setting";
import OneList from '../../../components/list/one_list';
import StatusBar from '../../../components/status_bar';
import characteristicList from '../../../data/json/characteristic_jobs';
import schoolList from '../../../data/json/schools';
import Images from '../../../assets/images';

export default class VocationalJobShowScreen extends Component {
  componentWillMount() {
    let currentGroup = characteristicList.find((obj) => obj.id == 4);
    let currentJob = currentGroup.careers.find((obj) => obj.id == this.props.navigation.state.params.id)
    let schools = schoolList.filter((school, pos) => { return currentJob.schools.includes(school.id) });

    if(currentJob.unknown_schools)
      schools.push({universityName: currentJob.unknown_schools});

    this.setState({
      currentGroup: currentGroup,
      currentJob: currentJob,
      schools: schools
    });
  }

  _renderPlacesForWork() {
    if (!this.state.currentJob.places_for_work) {
      return (null)
    }

    return (
      <View>
        <OneList onPress={() => {
            this.props.navigation.navigate('Description', {
              title: 'បង្ហាញទីកន្លែងការងារ',
              text:'ទីកន្លែងការងារមាន ៖ ' + this.state.currentJob.places_for_work
            })
          }} text='បង្ហាញទីកន្លែងការងារ'/>
      </View>
    )
  }

  _renderSchoolList() {
    if (!this.state.schools.length && !this.state.currentJob.unknown_schools) {
      return (null)
    }

    return (
      <View>
        <Text style={mainStyles.sectionText}>
          សាលាខាងក្រោមនេះមានបង្រៀនជំនាញ “{this.state.currentJob.name}”
        </Text>

        <View style={mainStyles.box}>
          { this.state.schools.map((school, i) => {
            { return(this._renderSchool(school, i)) }
          })}
        </View>
      </View>
    )
  }

  _renderSchool(school, i) {
    let logo = require('../../../assets/images/schools/default.png');
    if (school.logoName) {
      logo = Images[school.logoName];
    }

    return (
      <View>
        <TouchableOpacity
          style={mainStyles.btnList}
          onPress={() => { this.props.navigation.navigate('InstitutionDetail', {school: school})} }
          key={i}>

          <View>
            <Image source={logo} style={styles.image} />
          </View>

          <View style={{flex: 1, marginLeft: 16}}>
            <Text numberOfLines={1} style={mainStyles.title}>
              {school.universityName}
            </Text>

            <View style={{flexDirection: 'row'}}>
              <AwesomeIcon name='building-o' color='#1976d2' size={16} />
              <Text style={styles.schoolAddress}>{school.category || 'មិនមាន'}</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <AwesomeIcon name='map-marker' color='#1976d2' size={18} />
              <Text numberOfLines={2} style={styles.schoolAddress}>{school.address || 'មិនមាន'}</Text>
            </View>
          </View>

          <View style={{justifyContent: 'center'}}>
            <AwesomeIcon name='angle-right' size={24} color='#bbb' />
          </View>
        </TouchableOpacity>
        <Divider style={{marginLeft: 100}}/>
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar />
        <ScrollView style={{flex: 1}}>
          <OneList onPress={() => {
              this.props.navigation.navigate('Description', {
                title: 'អំពី' + this.props.navigation.state.params.title,
                text: this.state.currentJob.description || 'Description is not available'
              })
            }} text='អំពី'/>
          { this._renderPlacesForWork() }
          { this._renderSchoolList() }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70
  },
  schoolAddress: {
    marginLeft: 8,
    fontSize: FontSetting.sub_title
  }
})
