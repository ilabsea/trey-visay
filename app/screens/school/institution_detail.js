import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import mainStyles from '../../assets/style_sheets/main/main';
import { Colors } from '../../assets/style_sheets/main/colors';
import Images from '../../assets/images';
import ListItem from '../../components/schools/list_item';
import BackButton from '../../components/shared/back_button';
import ScrollableHeader from '../../components/scrollable_header';
import scrollHeaderStyles from '../../assets/style_sheets/scroll_header';
import { FontSetting } from '../../assets/style_sheets/font_setting';

const PROFILE_SIZE = 120;

export default class InstitutionDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      school: props.navigation.getParam('school')
    }
  }

  renderContact() {
    let school = this.state.school;
    if(!school.id){
      school = {
        address: 'មិនមាន',
        phoneNumbers: 'មិនមាន',
        faxes: 'មិនមាន',
        emails: 'មិនមាន',
        websiteOrFacebook: []
      }
    }

    return (
      <View style={{ paddingLeft: 8 }}>
        <ListItem contact={{data: school.address, icon: 'map-marker'}} />
        <ListItem contact={{data: school.phoneNumbers, icon: 'phone'}} />
        <ListItem contact={{data: school.faxes, icon: 'fax'}}/>
        <ListItem contact={{data: school.emails, icon: 'envelope', isLink: true, isEmail: true}} />
        <ListItem contact={{data: school.websiteOrFacebook, icon: 'globe', isLink: true}} />
      </View>
    )
  }

  renderItem(item, i){
    return(
      <View
        style={styles.btn}
        key={i}>
        <View style={styles.iconWrapper}>
          <Image
            source={require("../../assets/icons/school/major.png")}
            resizeMode='contain'
            style={styles.icon}
          />
        </View>
        <Text numberOfLines={2} style={{ flex: 1 , paddingRight: 16}}>{item}</Text>
      </View>
    )
  }

  renderMajor(department, index){
    let majors = [...new Set(department.majors)];
    return(
      <View key={index} style={mainStyles.box}>
        { !!department.name &&
          <Text style={mainStyles.sectionText}> {department.name} </Text>
        }
        <View style={[mainStyles.grid, { justifyContent: 'flex-start', margin: 0 }]}>
          { majors.map((major, i) => {
              { return (this.renderItem(major, i))}
            })
          }
        </View>
      </View>
    )
  }

  renderDepartments() {
    let departments = this.state.school.departments;
    if (!departments || !departments.length) {
      return (null);
    }
    return (
      <View style={{backgroundColor: 'rgb(239, 240, 244)'}}>
        <Text style={[mainStyles.sectionText, {marginLeft: 16, padding: 8}]}> ជំនាញ </Text>
        { departments.map((department, i) => {
          { return (this.renderMajor(department, i))}
        })}
      </View>
    )
  }

  _renderProfile() {
    return (
      <View>
        <View style={styles.bottomLogo}>
          { this._buildAvata() }
        </View>

        <View style={{marginTop: 67}}>
          <Text style={[styles.largeTitle]}>{this.state.school.universityName}</Text>
          <Text style={styles.subTitle}>{this.state.school.category}</Text>
        </View>
      </View>
    )
  }

  _renderLogo() {
    return (
      <View style={styles.topLogo}>
        { this._buildAvata() }
      </View>
    )
  }

  _buildAvata() {
    let schoolLogo = this.state.school.logoName;

    return (
      <View style={[mainStyles.boxShadow, styles.logoWrapper]}>
        <Image source={schoolLogo} style={{width: 106, height: 106}} />
      </View>
    )
  }

  renderContent = () => {
    return(
      <View style={[{backgroundColor: 'white', marginBottom: 12}]}>
        { this._renderProfile() }
        { this.renderContact() }
        { this.renderDepartments() }
      </View>
    )
  }

  render() {
    return (
      <ScrollableHeader
        backgroundColor={Colors.blue}
        textColor={'#fff'}
        statusBarColor={Colors.blueStatusBar}
        barStyle={'light-content'}
        headerStyle={{borderBottomWidth: 0}}
        renderContent={ this.renderContent }
        renderNavigation={ () => <BackButton buttonColor='#fff' navigation={this.props.navigation}/> }
        title={this.state.school.universityName}
        renderLogo={ () => this._renderLogo() }
      />
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    width: wp('49.8%'),
    height: hp('10%'),
    backgroundColor: 'white',
    borderBottomColor: 'rgb(200, 199, 204)',
    borderLeftColor: 'rgb(200, 199, 204)',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
  },
  iconWrapper:{
    width: 32,
    height: 32,
    borderRadius: 12,
    marginRight: 16,
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:  Colors.blue
  },
  icon:{
    width: 18,
    height: 18
  },
  logoWrapper: {
    width: PROFILE_SIZE,
    height: PROFILE_SIZE,
    padding: 7,
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  bottomLogo: {
    position: 'absolute',
    top: -PROFILE_SIZE/2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  topLogo: {
    height: PROFILE_SIZE/2,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  largeTitle: {
    textAlign: 'center',
    paddingTop: 20,
    paddingHorizontal: 16,
    fontSize: FontSetting.big_title
  },
  subTitle: {
    textAlign: 'center',
    color: 'rgb(155, 155, 155)'
  }
});
