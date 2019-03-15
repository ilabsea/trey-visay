import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from 'react-native-splash-screen';

import StatusBar from '../components/status_bar';
import { FontSetting } from '../assets/style_sheets/font_setting';
import User from '../utils/user';

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

  _renderButton(options) {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(options.url)}
        style={styles.btnBox}>
        <View style={[styles.btnFab, {backgroundColor: options.icon_bg_color}]}>
          { !(options.icon_type == 'material') &&
            <AwesomeIcon style={styles.icon} name={options.icon_name} size={50} color='#fff' />
          }

          { options.icon_type == 'material' &&
            <MaterialIcon style={styles.icon} name={options.icon_name} size={56} color='#fff' />
          }
        </View>
        <Text style={styles.btnLabel}>{options.title}</Text>
        <Text style={styles.btnDescription}>{options.description}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar />
        <View style={styles.scrollContainer}>
          <View style={{flexDirection: 'row'}}>
            { this._renderButton({
                title: 'វាយតម្លៃមុខរបរ',
                url: this.getRoute(),
                icon_bg_color: '#3f51b5',
                icon_name: 'briefcase',
                description: 'ធ្វើតេស្តមុខរបរ ឬអាជីព ដោយផ្អែកលើបុគ្គលិកលក្ខណៈដើម្បីជ្រើសរើសមុខរបរសាកសមនឹងអ្នក។'
              })
            }
            { this._renderButton({
                title: 'គ្រឹះស្ថានសិក្សា',
                url: 'InstitutionStack',
                icon_bg_color: '#009688',
                icon_name: 'business',
                icon_type: 'material',
                description: 'អ្នកអាចមើលពត៌មានសាលា លេខទំនាក់ទំនង និង មុខវិជ្ជាដែលអ្នកចង់បន្តការសិក្សាបន្ទាប់ពីបញ្ចប់ថ្នាក់ទី១២។'
              })
            }
          </View>

          <View style={{flexDirection: 'row'}}>
            { this._renderButton({
                title: 'ជំនាញវិជ្ជាជីវៈ',
                url: 'VocationalJobStack',
                icon_bg_color: '#1aaf5d',
                icon_name: 'photo-filter',
                icon_type: 'material',
                description: 'សំរាប់អ្នកគ្មានលទ្ធភាពបន្តការសិក្សាបរិញ្ញាប័ត្រ អ្នកអាចរៀនជំនាញវិជ្ជាជីវះរយៈពេលខ្លី។'
              })
            }
            { this._renderButton({
                title: 'វីដេអូមុខរបរ',
                url: 'VideoScreen',
                icon_bg_color: '#f44336',
                icon_name: 'video-camera',
                description: 'យល់ដឹងអំពីមុខរបរ និងអាជីព តាមរយះវីដេអូ។'
              })
            }
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    ...Platform.select({
      android: {
        padding: 8
      },
      ios: {
        padding: 0
      }
    })
  },
  btnBox: {
    flex: 1,
    minHeight: 315,
    alignItems: 'center',
    ...Platform.select({
      android: {
        margin : 10,
      },
      ios: {
        margin: 0,
        borderWidth: 1,
        borderColor: '#d3d3d3',
      }
    }),
    backgroundColor: '#fff',
  },
  btnLabel: {
    fontSize: FontSetting.nav_title,
    color: '#1976d2',
    width: '100%',
    textAlign: 'center',
    ...Platform.select({
      android: {
        lineHeight: 48,
      }
    })
  },
  btnDescription: {
    padding: 8,
    textAlign: 'center',
    fontSize: FontSetting.dashboard_subtitle,
  },
  btnFab: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 24
  },
  icon: {
    ...Platform.select({
      android: {
        padding:  20,
        marginTop: 20
      },
      ios: {
        padding:  0,
        marginTop: 0
      }
    })
  }
});
