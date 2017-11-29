import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  ThemeProvider,
  Icon,
} from 'react-native-material-ui';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';

export default class ContactScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'ពត៍មានសាលា លេខទំនាក់ទំនង',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>ពត៍មានសាលា លេខទំនាក់ទំនង</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => goBack()} style={{marginHorizontal: 16}}>
                      <Icon name='close' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>,
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
    this._handleSubmit();
  }

  _handleSubmit() {
    // this.props.navigation.goBack('PersonalUnderstandingFormScreen');
    this.props.navigation.goBack();
  }

  _renderContent() {
    let schools = [
      { name: 'សកលវិទ្យាល័យ បញ្ញាសាស្រ្តកម្ពុជា', logo: require('../../assets/images/schools/1.png'), address: 'ផ្លូវលេខ ១៨៤, មហាវិថី ព្រះនរត្តម ក្រុងភ្នំពេញ', phoneNumber: '087 777 970', website: 'www.puc.edu.kh' },
      { name: 'សកលវិទ្យាល័យកម្ពុជា', logo: require('../../assets/images/schools/2.png'), address: 'វិថីណ័រប្រីត (១០១៩) សង្កាត់ទឹកថ្លា ខ័ណ្ឌសែនសុខ រាជធានីភ្នំពេញ', phoneNumber: '023 993 276 / 060 3333 46 / 093 777 576 / 069 521 111', website: 'www.uc.edu.kh' },
      { name: 'សកលវិទ្យាល័យវិទ្យាសាស្រ្តសុខាភិបាល', logo: require('../../assets/images/schools/3.png'), address: 'ផ្លូវលេខ ១៨៤, មហាវិថី ព្រះនរត្តម ក្រុងភ្នំពេញ', phoneNumber: '093 278 899', website: 'www.uhs.edu.kh' },
      { name: 'សាកលវិទ្យាល័យចំរើនពហុបច្ចេកវិទ្យា', logo: require('../../assets/images/schools/4.png'), address: 'អគា១៥៤, ផ្លូវ១៣២, សង្កាត់ ទឹកល្អក់១ ខ័ណ្ឌទួលគោក រាជធានីភ្នំពេញ', phoneNumber: '061 800 023', website: 'www.cup.edu.kh' },
      { name: 'សាកលវិទ្យាល័យសេដ្ឋកិច្ចនិងហិរញ្ញវត្ថុ', logo: require('../../assets/images/schools/5.png'), address: 'អគា៦៨, ផ្លូវ ៥២៨,២៩១, សង្កាត់ បឹងកក់១, ខ័ណ្ឌទួលគោក, ភ្នំពេញ', phoneNumber: '010 516 887', website: 'www.uef.edu.kh' },
    ]

    return (
      <View>
      { schools.map((school, i) => {
        return (
          <View style={[styles.box, {flexDirection: 'row'}]} key={i}>
            <View>
              <Image source={school.logo} style={{width: 100, height: 100}} />
            </View>

            <View style={{flex: 1, marginLeft: 16}}>
              <Text style={styles.subTitle}>{school.name}</Text>

              <View style={{flexDirection: 'row'}}>
                <AwesomeIcon name='map-marker' color='#1976d2' size={24} />
                <Text style={{marginLeft: 8}}>{school.address}</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <AwesomeIcon name='phone' color='#1976d2' size={24} />
                <Text style={{marginLeft: 8}}>{school.phoneNumber}</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <AwesomeIcon name='globe' color='#1976d2' size={24} />
                <Text style={{marginLeft: 8}}>{school.website}</Text>
              </View>
            </View>
          </View>
        )
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
