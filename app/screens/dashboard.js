import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from 'react-native-splash-screen';

import StatusBar from '../components/shared/status_bar';
import DashboardView from '../components/dashboard/dashboard_view';

import styles from '../assets/style_sheets/dashboard/dashboard';

import User from '../utils/user';
import API from '../api/schools';

export default class Dashboard extends Component {
  static navigationOptions = {
    drawerLabel: 'ទំព័រដើម',
    drawerIcon: ({ tintColor }) => (
      <MaterialIcon name="home" color={tintColor} />
    )
  };

  constructor(props){
    super(props);
    this.state = {
      user: null
    }
  }

  componentWillMount() {
    SplashScreen.hide();
    User.isLoggedin(() => {
      let user = User.getCurrent();
      this.setState({ user: user});
    });
  }

  getRoute(){
    return this.state.user ? 'CareerCounsellorStack' : 'AccountStack';
  }

  _clearSelectedValues(){
    API.setSelectedProvince('');
  }

  _renderButton(options) {
    this._clearSelectedValues();
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(options.url)}
        style={styles.btnBox}>
        <View style={[styles.btnFab, {backgroundColor: options.icon_bg_color}]}>
          { !(options.icon_type == 'material') &&
            <AwesomeIcon style={styles.icon} name={options.icon_name} size={40} color='#fff' />
          }

          { options.icon_type == 'material' &&
            <MaterialIcon style={styles.icon} name={options.icon_name} size={44} color='#fff' />
          }
        </View>
        <Text style={styles.btnLabel}>{options.title}</Text>
        <Text style={styles.btnDescription}>{options.description}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.scrollContainer}>
        <StatusBar />

        <DashboardView>
          <View style={{flexDirection: 'row'}}>
            { this._renderButton({
                title: 'វាយតម្លៃមុខរបរ',
                url: this.getRoute(),
                icon_bg_color: '#3f51b5',
                icon_name: 'briefcase',
                description: 'ធ្វើតេស្តមុខរបរ ឬអាជីព ដោយផ្អែកលើបុគ្គលិកលក្ខណៈដើម្បីជ្រើសរើសមុខរបរសាកសមនឹងអ្នក'
              })
            }
            { this._renderButton({
                title: 'គ្រឹះស្ថានសិក្សា',
                url: 'SchoolStack',
                icon_bg_color: '#009688',
                icon_name: 'business',
                icon_type: 'material',
                description: 'អ្នកអាចមើលពត៌មានសាលា លេខទំនាក់ទំនង និង មុខវិជ្ជា ដែលអ្នកចង់បន្តការសិក្សាបន្ទាប់ពីបញ្ចប់ថ្នាក់ទី១២'
              })
            }
          </View>

          <View style={{flexDirection: 'row'}}>
            { this._renderButton({
                title: 'ជំនាញវិជ្ជាជីវៈ',
                url: 'VocationalStack',
                icon_bg_color: '#1aaf5d',
                icon_name: 'photo-filter',
                icon_type: 'material',
                description: 'សំរាប់អ្នកគ្មានលទ្ធភាពបន្តការសិក្សាបរិញ្ញាប័ត្រ អ្នកអាច រៀនជំនាញវិជ្ជាជីវៈរយៈពេលខ្លី'
              })
            }
            { this._renderButton({
                title: 'វីដេអូមុខរបរ',
                url: 'VideoScreen',
                icon_bg_color: '#f44336',
                icon_name: 'video-camera',
                description: 'យល់ដឹងអំពីមុខរបរ និងអាជីព តាមរយះវីដេអូ'
              })
            }
          </View>
        </DashboardView>
      </View>
    );
  }
}
