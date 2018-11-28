import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Platform
} from 'react-native';

import headerStyles from '../assets/style_sheets/header';
import shareStyles from '../assets/style_sheets/profile_form';
import StatusBar from '../components/status_bar';
import DeviceInfo from 'react-native-device-info';

export default class About extends Component {
  static navigationOptions = {
    drawerLabel: 'អំពីកម្មវិធី',
    drawerIcon: ({ tintColor }) => (
        <Icon name="list" color={tintColor} />
    ),
  };

  _openLink(url) {
    Linking.openURL(url);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <ScrollView>
          <View style={styles.scrollContainer}>
            <View style={shareStyles.box}>
              <Text style={styles.paragraph}>
                <Text style={styles.textBold}>កម្មវិធីត្រីវិស័យ </Text>
                គឺជាកម្មវិធីទូរស័ព្ទមួយដែលអនុញ្ញាតឱ្យសិស្សថ្នាក់ទី 9 ដល់ ទី12 អាចធ្វើការស្វែងយល់អំពីខ្លួនឯង បង្កើនជំនាញទន់ និងជំនាញរឹង ហើយគេអាចប្រើប្រាស់វាដើម្បី កំណត់ទិសដៅអាជីពរបស់ពួកគេ។
              </Text>

              <Text style={styles.paragraph}>
                កម្មវិធី ត្រីវិស័យ ត្រូវបានបង្កើតឡើងដោយអង្គការ KAPE សហការជាមួយនឹងអង្គការ InSTEDD iLab Southeast Asia ដោយទទួលបានមូលនិធិគាំទ្រពី SPIDER។
              </Text>

              <View style={[styles.paragraph]}>
                <Text>
                  <Text style={styles.textBold}>អំពី អង្គការសកម្មភាពសម្រាប់បឋមសិក្សានៅកម្ពុជា </Text>

                  (ហៅកាត់ថា ខេប)
                  គឺជាអង្គការក្រៅរដ្ឋាភិបាលក្នុងស្រុកដែលមានទីតាំងក្នុងខេត្តកំពង់ចាម កំពុងអនុវត្តកម្មវិធីក្នុងខេត្តចំនួន
                  ១២។ ស្ថាប័ន មានជំនាញ និងធ្វើការចម្បងក្នុងការអភិវឌ្ឍន៍វិស័យអប់រំក្នុងប្រព័ន្ធ កម្រិតបឋមសិក្សា
                  និងអនុវិទ្យាល័យ។
                </Text>
              </View>

              <View style={[styles.paragraph]}>
                <Text>
                  បច្ចុប្បន្ននេះ ស្ថាប័នផ្តល់ការគាំទ្រ ដល់សាលាបឋមសិក្សា និងអនុវិទ្យាល័យ
                  ប្រហែលជាង ២០០សាលា ដើម្បីពង្រឹងគុណភាពអប់រំ និងផ្តល់ភាពងាយស្រួលចូលសាលារៀន។
                  គម្រោងជាច្រើនរបស់ស្ថាប័ន រួមមាន៖ អំនានថ្នាក់ដំបូង
                  ការគាំទ្រកម្មវិធីសាលារៀនកុមារមេត្រី កម្មវិធីអាហារូបករណ៍ បច្ចេកវិទ្យាក្នុងវិស័យអប់រំ
                  កម្មវិធីសម្រាប់អប់រំកុមារជនជាតិ និង សមភាពយេនឌ័រជាដើម។
                </Text>

                <View style={{flexDirection: 'row'}}>
                  <Text>សម្រាប់ព័ត៌មានលម្អិត៖ </Text>
                  <TouchableOpacity onPress={() => this._openLink('http://www.kapekh.org/')}>
                    <Text style={styles.link}>ចូលទៅកាន់គេហទំព័រ។</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[styles.paragraph]}>
                <Text>
                  <Text style={styles.textBold}>អំពី អង្គការ InSTEDD iLab Southeast Asia </Text>

                  គឺជាអង្គការក្រៅរដ្ឋាភិបាលអន្តរជាតិ ដែលមានទីតាំងនៅរាជធានីភ្នំពេញ ផ្តោតសំខាន់លើសុខមាលភាពរបស់ប្រជាពលរដ្ឋ
                  និង ការអភិវឌ្ឍន៍បែបនិរន្តរភាព តាមរយៈការប្រើប្រាស់បច្ចេកវិទ្យាទំនើប។ អង្គការនេះត្រូវបានបង្កើតឡើងក្នុងឆ្នាំ២០០៨
                  ដោយមានទីតាំងនៅ សហរដ្ឋអាមេរិក ប្រទេសអាសង់ទីន និង ប្រទេសកម្ពុជា។ កន្លងមកអង្គការបានធ្វើការសហការជាមួយក្រសួងសុខាភិបាល
                  ក្រសួងអប់រំ និង អង្គការក្រៅរដ្ឋាភិបាលមួយចំនួនក្នុងការបញ្ជ្រាបបច្ចេកវិទ្យាទំនើបចូលទៅក្នុងគម្រោងដែលពួកគេកំពុងតែធ្វើកិច្ចប្រតិបត្តិការណ៍។
                </Text>

                <View style={{flexDirection: 'row'}}>
                  <Text>សម្រាប់ព័ត៌មានលម្អិត៖ </Text>
                  <TouchableOpacity onPress={() => this._openLink('http://ilabsoutheastasia.org/')}>
                    <Text style={styles.link}>ចូលទៅកាន់គេហទំព័រ។</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text>ជំនាន់: </Text>
                <Text>{DeviceInfo.getVersion()}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
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
    fontWeight: 'bold'
  },
  link: {
    color: '#1976d2',
  }
});
