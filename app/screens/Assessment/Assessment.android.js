import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Platform
} from 'react-native';

import Button from '../../components/shared/button';
import StatusBar from '../../components/shared/status_bar';
import myStyles from '../../assets/style_sheets/login_form';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { FontSetting } from '../../assets/style_sheets/font_setting';

export default class Assessment extends Component {
  static navigationOptions = {
    drawerLabel: 'វាយតម្លៃមុខរបរនិងអាជីព',
    drawerIcon: ({ tintColor }) => (
      <AwesomeIcon name="briefcase" size={16} color={tintColor} />
    ),
  };

  _renderInstruction() {
    return (
      <View style={[styles.box]}>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={styles.logoWrapper}>
            <Image source={require('../../assets/images/list.png')} style={styles.logo} />
          </View>
          <Text style={[styles.title, {flex: 1}]}>ការធ្វើតេស្ដឆ្លុះបញ្ចាំងពីខ្លួនឯង</Text>
        </View>

        <View>
          <Button
            style={{paddingHorizontal: 20, marginRight: 20, marginBottom: 10 }}
            onPress={()=> this.props.navigation.navigate('CareerCounsellorScreen')}
            >
            <Text style={styles.btnText}>
              ការធ្វើតេស្តវាយតម្លៃ មុខរបរនិងអាជីព
            </Text>
          </Button>

          <Button
            style={{ paddingHorizontal: 20, marginRight: 20, marginBottom: 10 }}
            onPress={()=> this.props.navigation.navigate('PersonalityAssessmentScreen')}
            >
            <Text style={styles.btnText}>
              ការធ្វើតេស្តស្វែងយល់អំពីបុគ្គលិកលក្ខណៈ
            </Text>
          </Button>

        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar />
        <ScrollView>
          <View style={styles.container}>
            { this._renderInstruction() }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      android: {
        margin: 16
      },
      ios: {
        margin: 8
      }
    })
  },
  box: {
    backgroundColor: '#fff',
    padding: 24,
  },
  title: {
    fontSize: 24,
    color: '#1976d2',
    ...Platform.select({
      android: {
        lineHeight: 48
      }
    })
  },
  logoWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 20,
  },
  logo: {
    width: 60,
    height: 60
  },
  text: {
    fontWeight: 'bold'
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: FontSetting.button_text,
    color: '#fff',
  }
});
