import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
  Icon,
} from 'react-native-material-ui';

import headerStyles from '../assets/style_sheets/header';
import shareStyles from '../assets/style_sheets/profile_form';
import StatusBar from '../components/status_bar';
import DeviceInfo from 'react-native-device-info';

const uiTheme = {
  palette: {
    primaryColor: '#1976d2',
  }
};

export default class About extends Component {
  static navigationOptions = {
    drawerLabel: 'អំពីកម្មវិធី',
    drawerIcon: ({ tintColor }) => (
      <ThemeProvider uiTheme={{}}>
        <Icon name="list" color={tintColor} />
      </ThemeProvider>
    ),
  };

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <StatusBar />

          <Toolbar
            leftElement="menu"
            centerElement={<Text style={[headerStyles.headerTitleStyle, {marginLeft: 0}]}>អំពីកម្មវិធី</Text>}
            onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
          />

          <ScrollView>
            <View style={styles.scrollContainer}>
              <View style={shareStyles.box}>
                <Text style={styles.paragraph}>
                  កម្មវិធី
                  <Text style={styles.textBold}> ត្រីវិស័យ </Text>
                  គឺជាកម្មវិធីទូរស័ព្ទមួយដែលអនុញ្ញាតឱ្យសិស្សថ្នាក់ទី 9 ដល់ ទី12 អាចធ្វើការស្វែងយល់អំពីខ្លួនឯង បង្កើនជំនាញទន់ និងជំនាញរឹង ហើយអ្នកអាចប្រើប្រាស់វាដើម្បីស្វែងរកទំនាក់ទំនងនៃអាជីព។
                </Text>

                <Text style={styles.paragraph}>
                  កម្មវិធី ត្រីវិស័យ ត្រូវបានងបង្កើតឡើងដោយអង្គការ Kape សហការជាមួយនឹងអង្គការ InSTEDD iLabSEA ដោយទទួលបានមូលនិធិគាំទ្រពី SPIDER។
                </Text>

                <Text style={[styles.paragraph, {textAlign: 'center', fontFamily: 'KantumruyBold'}]}>
                  អង្គការសកម្មភាពសម្រាប់បឋមសិក្សានៅកម្ពុជា (ហៅកាត់ថា ខេប)
                </Text>

                <Text style={styles.paragraph}>
                  គឺជាអង្គការក្រៅរដ្ឋាភិបាលក្នុងស្រុកដែលមានទីតាំងក្នុងខេត្តកំពង់ចាម កំពុងអនុវត្តកម្មវិធីក្នុងខេត្តចំនួន
                  ៨។ ស្ថាប័ន មានជំនាញ និងធ្វើការចម្បងក្នុងការអភិវឌ្ឍន៍វិស័យអប់រំក្នុងប្រព័ន្ធ កម្រិតបឋមសិក្សា
                  និងអនុវិទ្យាល័យ។ បច្ចុប្បន្ននេះ ស្ថាប័ន​ផ្តល់ការគាំទ្រ ដល់សាលាបឋមសិក្សា និងអនុវិទ្យាល័យ
                  ប្រហែលជាង ២០០សាលា​ ដើម្បីពង្រឹងគុណភាពអប់រំ និងផ្តល់ភាពងាយស្រួលចូលសាលារៀន។
                  អង្គការខេប ជាស្ថាប័នអភិវឌ្ឍផ្នែកអប់រំដែលធំជាងគេក្នុងប្រទេសកម្ពុជា
                  ទទួលបានមូលនិធិផ្ទាល់ពីក្រសួងអប់រំយុវជន និងកីឡា ដើម្បីអនុវត្តកម្មវិធីសាលារៀនជំនាន់ថ្មី។
                  ក្នុងឆ្នាំនេះ គម្រោងមានចំនួន១៥ ម្ចាស់ជំនួយចំនួន១៨ និងថវិកាសរុបទទួលបានប្រហែលជា
                  បីលានដុល្លារ សហរដ្ឋអាមេរិក។ គម្រោងជាច្រើនរបស់ស្ថាប័ន រួមមាន៖ អំនានថ្នាក់ដំបូង
                  ការគាំទ្រកម្មវិធីសាលារៀនកុមារមេត្រី កម្មវិធីអាហារូបករណ៍ បច្ចេកវិទ្យាក្នុងវិស័យអប់រំ
                  កម្មវិធីសម្រាប់អប់រំកុមារជនជាតិ និង សមភាពយេនឌ័រជាដើម។​
                  ព័ត៌មានលម្អិត៖ ចូលទៅកាន់គេហទំព័រ។
                </Text>

                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Text>ជំនាន់: </Text>
                  <Text>{DeviceInfo.getVersion()}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </ThemeProvider>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    padding: 16
  },
  paragraph: {
    marginBottom: 16
  },
  textBold: {
    fontFamily: 'KantumruyBold'
  }
});
