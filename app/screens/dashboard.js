import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
  Icon,
} from 'react-native-material-ui';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

// Utils
import realm from '../schema';
import User from '../utils/user';
import headerStyles from '../assets/style_sheets/header';
import StatusBar from '../components/status_bar';

const uiTheme = {
  palette: {
    primaryColor: '#1976d2',
  }
};

export default class Dashboard extends Component {
  static navigationOptions = {
    drawerLabel: 'ទំព័រដើម',
    drawerIcon: ({ tintColor }) => (
      <ThemeProvider uiTheme={{}}>
        <Icon name="home" color={tintColor} />
      </ThemeProvider>
    ),
  };

  componentWillMount() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];

    this.state = {
      showTourTip: !user.isVisited,
      user: user
    };
  }

  _renderButton(options) {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(options.url)}
        style={[styles.btnBox]}>
        <View style={[styles.btnFab, {backgroundColor: options.icon_bg_color}]}>
          <AwesomeIcon name={options.icon_name} size={30} color='#fff' />
        </View>
        <Text style={styles.btnLabel}>{options.title}</Text>
      </TouchableOpacity>
    )
  }

  _renderTourtip(isVisited) {
    if (isVisited) {
      return (null);
    }

    return (
      <View style={styles.overlay}>
        <ScrollView style={{flex: 1}}>
          <View style={{margin: 16}}>
            <Text style={[styles.paragraph, {fontSize: 24, fontFamily: 'KhmerOureang', textAlign: 'center'}]}>ស្វាគមន៍មកកាន់ “ត្រីវិស័យ”</Text>

            <Text style={styles.paragraph}>
              ត្រីវិស័យ គឺជាកម្មវិធីប្រឹក្សាតាមប្រព័ន្ធអេឡិចត្រូនិចដែលតម្រង់ទិសសិស្សានុសិស្ស
              ជ្រើសរើសជំនាញដោយផ្អែកលើ គុណតម្លៃ និងបគ្គលិកលក្ខណៈរបស់ខ្លួន។
              សិស្សានុសិស្សអាចមើលពត៌មានអំពីសាលា និងលេខទំនាក់ទំនងរបស់សាលា
              នីមួយៗបានយ៉ាងងាយស្រួល។
            </Text>

            <Text style={[styles.paragraph, {fontSize: 20, fontFamily: 'KhmerOureang', textAlign: 'center'}]}>
              ហេតុអ្វីបានជាយើងត្រូវការការប្រឹក្សាតាមប្រព័ន្ធអេឡិចត្រូនិច?
            </Text>

            <Text style={styles.paragraph}>
              ការគិតពីរឿងការងារចាប់តាំងពីក្មេងអាចជួយសិស្សានុសិស្សអាចទទួលបានជំនាញនិងបទពិសោធដើម្បីអោយពួកគេ ទទួលបានការងារមួយដែលពួកគេពេញចិត្ត ហើយជាការងារដែលត្រូវនឹងបំនិនប្រសព្វរបស់ពួកគេ ជាជាងអោយពួកគេ ធ្វើការងារមួយដែលពួកគេមិនមានទឹកចិត្តក្នុងការបំពេញការងារនោះ និងមានឱកាសតិចតួចក្នុងការទទួលបានការឡើង តំណែង។
            </Text>

            <Text style={styles.paragraph}>
              យោងតាមទិន្នន័យបានបង្ហាញថា មានសិស្សចំនួនពីរភាគបីមិនទទួលបានការប្រឹក្សាយោបល់ផ្នែកអាជីពទេទន្ទឹមនឹងនោះបុគ្គលិកសាលារៀនក៏មានចំណេះដឹងមានកំរឹតអំពីឱកាសការងារនៅក្នុងសហគមន៍របស់ពួកគេ។ យុវវ័យកំពុងតែបាត់បង់នូវឱកាសនៃការផ្លាស់ប្តូរ និង ការធ្វើសេចក្តីសម្រេចចិត្តសំខាន់ៗក្នុងជីវិតដោយមិនមានការណែនាំឬព័ត៌មានដែលត្រឹមត្រូវ។
            </Text>

            <Text style={styles.paragraph}>
              កម្មវិធីទូរស័ព្ទដែលមិនត្រូវការអ៊ីនធើណែតអំពីការផ្តល់ដំបូន្មានពីការងារគឺជាឧបករណ៍ដ៏មានតម្លៃដែលអាចផ្តល់ជូន ចំណេះដឹងនិងព័ត៌មានចាំបាច់ដើម្បីកំណត់គោលដៅនិងបង្កើតផែនការសម្រាប់អនាគត។ សិស្សម្នាក់ៗអាចបង្កើត
              គណនីផ្ទាល់ខ្លួនដើម្បីចូលទៅក្នុងកម្មវិធីដែលអាច កំណត់ភាពខ្លាំងនិងភាពខ្សោយរបស់ខ្លួន  ស្វែងរកការងារ
              ជាច្រើននៅប្រទេសកម្ពុជា និង មើលវីដេអូ។ ជាចុងក្រោយសិស្សអាចកំណត់អត្តសញ្ញាណនិងជ្រើសរើសយក អាជីពដែលមានសក្តានុពលសំរាប់អនាគតរបស់ពួកគេ។
            </Text>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => this._onClickOk()}
                style={{paddingHorizontal: 24, paddingVertical: 5, backgroundColor: 'rgba(255,255,255,0.28)'}}>
                <Text style={{color: '#fff', fontFamily: 'KantumruyBold'}}>យល់ព្រម</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }

  _onClickOk() {
    realm.write(() => {
      this.state.user.isVisited = true;
      this.setState({showTourTip: false});
    });
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={{flex: 1}}>
          <StatusBar />

          <ScrollView>
            <Toolbar
              leftElement="menu"
              centerElement={<Text style={[headerStyles.headerTitleStyle, {marginLeft: 0}]}>ត្រីវិស័យ</Text>}
              onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
            />

            <View style={styles.scrollContainer}>
              { this._renderButton({ title: 'វាយតម្លៃមុខរបរ និង អាជីព', url: 'CareerCounsellorScreen', icon_bg_color: '#3f51b5', icon_name: 'briefcase' }) }
              { this._renderButton({ title: 'គ្រឹះស្ថានសិក្សា', url: 'InstitutionStack', icon_bg_color: '#009688', icon_name: 'graduation-cap' }) }
              { this._renderButton({ title: 'វីដេអូមុខរបរ', url: 'VideoScreen', icon_bg_color: '#f44336', icon_name: 'video-camera' }) }
              { this._renderButton({ title: 'អំពីយើង', url: 'About', icon_bg_color: '#607d8b', icon_name: 'list' }) }
            </View>
          </ScrollView>

          { this.state.showTourTip && this._renderTourtip() }

        </View>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16
  },
  btnBox: {
    flex: 1,
    height: 108,
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingRight: 16,
  },
  btnLabel: {
    fontFamily: 'KhmerOureang',
    fontSize: 24,
    lineHeight: 40,
    flex: 1,
  },
  btnFab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 24
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(25, 118, 210, 0.9)',
    top: 0,
    bottom: 0,
    left:0,
    right: 0,
  },
  paragraph: {
    color: '#fff',
    marginBottom: 10,
    textAlign: 'justify',
    fontSize: 16,
  }
});
