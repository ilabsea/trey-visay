import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

import ScrollableHeader from '../../components/scrollable_header';
import { Colors } from '../../assets/style_sheets/main/colors';
import BackButton from '../../components/shared/back_button';

import { FontSetting } from "../../assets/style_sheets/font_setting";
import mainStyles from "../../assets/style_sheets/main/main";
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-paper';

// import firebase from 'react-native-firebase';
import keyword from '../../data/analytics/keyword';

export default class CareerCenterScreen extends Component {
  _goTo = (career) => {
    // firebase.analytics().logEvent(career.firebase_event_name);
    this.props.navigation.navigate(career.screen, {url: career.url});
  }

  _renderContent = () => {
    let career_centers = [
      {
        name: 'ទីភ្នាក់ងារជាតិមុខរបរ និងការងារ',
        description: 'ការងារ កម្លាំងពលកម្ម និងព័ត៌មានទីផ្សារការងារ',
        url: 'http://nea.gov.kh/index.do',
        logo: require('../../assets/images/career_center/nea_logo.png'),
        screen: 'NeaCareerScreen',
        firebase_event_name: keyword.NEA_PLATFORM
      },
      {
        name: 'បងស្រី',
        description: 'ទីប្រឹក្សាការងារ',
        url: 'https://bongsrey.com/',
        logo: require('../../assets/images/career_center/bongsrey_logo.png'),
        screen: 'BongSreyCareerScreen',
        firebase_event_name: keyword.BONG_SREY
      },
    ]

    let { width } = Dimensions.get('window');
    let imageWidth = width/2-120;

    doms = career_centers.map((career, index) => {
      return(
        <View key={index}>
          <TouchableOpacity style={styles.row} onPress={() => this._goTo(career)}>
            <View style={{width: imageWidth}}>
              <Image source={career.logo} style={{width: imageWidth, height: imageWidth}}/>
            </View>

            <View style={styles.textContainer}>
              <Text style={mainStyles.title}>{ career.name }</Text>
              <Text style={styles.description}>{ career.description }</Text>
            </View>

            <View style={{alignSelf: 'center'}}>
              <AwesomeIcon name='angle-right' size={24} color='#bbb'/>
            </View>
          </TouchableOpacity>
          <Divider />
        </View>
      )
    })

    return (
      <View style={{marginTop: 10}}>
        {doms}
      </View>
    );
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <ScrollableHeader
          renderContent={ this._renderContent }
          renderNavigation={ () => <BackButton navigation={this.props.navigation}/> }
          title={'មជ្ឈមណ្ឌលការងារ'}
          largeTitle={'មជ្ឈមណ្ឌលការងារ'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 16
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
    marginRight: 16
  },
  title: {
    fontSize: FontSetting.title,
  },
  description: {
    fontSize: FontSetting.sub_title,
    color: '#3A3A3A',
    lineHeight: 25
  },
});
