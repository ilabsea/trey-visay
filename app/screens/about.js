import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity
} from 'react-native';

import DeviceInfo from 'react-native-device-info';
import RF from "react-native-responsive-fontsize"

export default class About extends Component {
  constructor(props) {
    super(props);
  }

  _openLink(url) {
    Linking.openURL(url);
  }

  _renderImageButton(styles, link_url, source){
    return(
      <TouchableOpacity style={styles.btn}
        onPress={()=> this._openLink(link_url)}>
        <Image
          style={styles.img}
          resizeMode="contain"
          source={source}/>
      </TouchableOpacity>
    )
  }

  _renderContent() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>ត្រីវិស័យ</Text>
        <Text style={styles.paragraph}>
          កម្មវិធី​ត្រីវិស័យ គឺ​ជា​កម្មវិធី​ទូរសព្ទ​មួយ​ដែល​អនុញ្ញាត​ឱ្យ​សិស្ស​ថ្នាក់​ទី៩ ដល់​ថ្នាក់​ទី១២
          អាច​ធ្វើ​ការ​ស្វែងយល់​អំពី​ខ្លួន​ឯង ដោយ​ធ្វើ​ការ​តេស្ត​ជា​មួយ​នឹង​កម្មវិធី ដើម្បី​អាច​អោយ​គាត់​ស្គាល់​ពី​ជំនាញ​ទន់
          និង​ជំនាញ​រឹង​ និង​កំណត់​គោលដៅ​របស់​ខ្លួន សម្រាប់​ការ​ជ្រើសរើស​ជំនាញ​វិជ្ជាជីវៈ​នា​ពេល​អនាគត។
        </Text>

        <Text style={styles.paragraph}>
          បន្ថែម​ពី​នេះ​ទៀត​កម្មវិធី​ត្រីវិស័យ បាន​បញ្ចូល​នៅ​ព័ត៌មាន​ទាក់ទង​ជា​មួយ​នឹង​គ្រឹះស្ថាន​សិក្សា​នៅ​ក្នុង​ស្រុក​
          ពត័មាន​ជំនាញ​ដែល​យើង​ត្រូវ​សិក្សា​នៅ​សាកលវិទ្យាល័យ ក៏​ដូច​ជាព័ត៌មាន​អំពី​ជំនាញ​វិជ្ជាជីវៈ
          ដោយ​ភ្ជាប់​ជា​មួយ​សាលា​ដែល​យើងអាច​សិក្សា​បាន។
        </Text>

        <Text style={styles.paragraph}>សហការផលិតដោយ</Text>

        <View style={styles.imgWrapper}>
          { this._renderImageButton(
            {btn: styles.imgButton, img: styles.img},
            'http://www.moeys.gov.kh',
            require('../assets/images/about/moeys.png'))
          }

          { this._renderImageButton(
            {btn: styles.imgButton, img: [styles.img, {maxHeight: 110}]},
            'http://www.kapekh.org',
            require('../assets/images/about/kape.png'))
          }
        </View>

        <Text style={styles.paragraph}>អភិវឌ្ឍន៍ដោយ</Text>

        <View style={styles.imgWrapper}>
          { this._renderImageButton(
            {btn: styles.imgButton, img: [styles.img, {maxHeight: 56}]},
            'http://ilabsoutheastasia.org',
            require('../assets/images/about/ilab.png'))
          }
        </View>

        <Text style={styles.paragraph}>គ្រាំទ្រថវិកាពី</Text>

        <View style={[styles.imgWrapper, { marginTop: -20 }]}>
          { this._renderImageButton(
            { btn: styles.imgButton, img: styles.img },
            'https://www.usaid.gov/cambodia',
            require('../assets/images/about/usaid.png'))
          }

          { this._renderImageButton(
            { btn: styles.imgButton, img: styles.img },
            'https://www.development-innovations.org/',
            require('../assets/images/about/di.png'))
          }
        </View>

        <View style={[styles.imgWrapper, { marginTop: 0 }]}>
          { this._renderImageButton(
            { btn: styles.imgButton, img: [styles.img, {maxHeight: 60}] },
            'https://spidercenter.org/',
            require('../assets/images/about/spider.png'))
          }
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={{flex: 1}}>
          { this._renderContent() }

          <View style={styles.footer}>
            <Text style={{textAlign: 'right'}}>
              ជំនាន់: { DeviceInfo.getVersion() }
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  container: {
    margin: 24,
    alignItems: 'center'
  },
  title: {
    lineHeight: 48,
    fontSize: RF(2.8),
    textAlign: 'center'
  },
  paragraph: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: RF(1.8)
  },
  footer: {
    marginTop: 20,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  imgWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24
  },
  img: {
    flex: 1,
    maxHeight: 130,
  },
  imgButton: {
    flex: 1,
    flexDirection: 'row'
  }
});
