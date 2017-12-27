import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';

import {
  ThemeProvider,
  Icon,
} from 'react-native-material-ui';

import { Divider } from 'react-native-elements';

import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';
import Images from '../../assets/images';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import careerList from '../../data/json/careers';

import realm from '../../schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';

export default class CareersScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'យល់ដឹងអំពីមុខរបរ',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>យល់ដឹងអំពីមុខរបរ</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => goBack()} style={{marginHorizontal: 16}}>
                      <Icon name='close' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>
    }
  };

  _renderFooter() {
    return(
      <View style={shareStyles.footerWrapper}>
        <TouchableOpacity onPress={this._goNext.bind(this)} style={shareStyles.btnNext}>
          <Text style={shareStyles.btnText}>បន្តទៀត</Text>
          <Icon name='keyboard-arrow-right' color='#fff' size={24} />
        </TouchableOpacity>
      </View>
    )
  }

  _goNext() {
    this.props.navigation.navigate('SubjectScreen');
  }

  _renderCareer(career, i) {
    return (
      <View key={i}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center', padding: 16}}
          onPress={() => {this.props.navigation.navigate('CareerDetailScreen',{careerId: career.id})}}
        >
          <Image source={Images[career.logoName]} style={{width: 80, height: 80, marginRight: 16}} />
          <Text style={[styles.subTitle, {flex: 1}]}>{career.name}</Text>
          <AwesomeIcon name='angle-right' size={24} color='#bbb' />
        </TouchableOpacity>
        <Divider/>
      </View>
    )
  }

  _renderContent() {
    return (
      <View style={[styles.box, {padding: 0}]}>
        { careerList.map((career, i) => {
          { return (this._renderCareer(career, i))}
        })}
      </View>
    )
  }

  render() {
    return(
      <ThemeProvider uiTheme={{}}>
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <View style={{margin: 16, flex: 1}}>
              { this._renderContent() }
            </View>

          </ScrollView>
          { this._renderFooter() }
        </View>
      </ThemeProvider>
    );
  };
}
