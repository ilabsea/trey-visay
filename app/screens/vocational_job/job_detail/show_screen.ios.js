import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';


// Utils
import mainStyles from '../../../assets/style_sheets/main/main';
import { FontSetting } from "../../../assets/style_sheets/font_setting";
import OneList from '../../../components/list/one_list';
import StatusBar from '../../../components/status_bar';
import SchoolListView from '../../../components/schools/school_list';
import characteristicList from '../../../data/json/characteristic_jobs';
import schoolList from '../../../data/json/schools';

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
              content:'ទីកន្លែងការងារមាន ៖ ' + this.state.currentJob.places_for_work
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

        <SchoolListView navigation={this.props.navigation} data={this.state.schools}/>
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar />
        <ScrollView style={{flex: 1}}>
          { this._renderPlacesForWork() }
          { this._renderSchoolList() }
        </ScrollView>
      </View>
    );
  }
}
