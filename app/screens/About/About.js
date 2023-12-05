import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity
} from 'react-native';

import DeviceInfo from 'react-native-device-info';

import { FontSetting } from "../../assets/style_sheets/font_setting";
import ScrollableHeader from '../../components/scrollable_header';
import Text from '../../components/Text';

export default class About extends Component {
  _openLink(url) {
    if (!url) return;

    Linking.openURL(url);
  }

  _renderStakeholderV1() {
    return (
      <>
        <Text style={styles.stakeholderTitle}>កំណែទី១ (ឆ្នាំ២០១៨) សហការផលិតដោយ / Version 1 (2018) Co-produced by</Text>

        <View style={styles.imgWrapper}>
          { this._renderImageButton(
            {btn: [styles.imgButton, {width: 70}], img: [styles.img, {maxHeight: 70}]},
            'http://www.moeys.gov.kh',
            require('../../assets/images/about/moeys.png'))
          }

          { this._renderImageButton(
            {btn:[styles.imgButton, {width: 70}], img: [styles.img, {maxHeight: 60}]},
            'http://www.kapekh.org',
            require('../../assets/images/about/kape.png'))
          }
        </View>

        <Text style={styles.paragraph}>អភិវឌ្ឍន៍ដោយ / Developed by</Text>

        <View style={styles.imgWrapper}>
          { this._renderImageButton(
            {btn: styles.imgButton, img: styles.img},
            'http://ilabsoutheastasia.org',
            require('../../assets/images/about/ilab.png'))
          }
        </View>

        <Text style={styles.paragraph}>គាំទ្រថវិកាពី / Funding from</Text>

        <View style={styles.imgWrapper}>
          { this._renderImageButton(
            { btn: styles.imgButton, img: styles.img },
            'https://www.usaid.gov/cambodia',
            require('../../assets/images/about/usaid.png'))
          }

          { this._renderImageButton(
            { btn: styles.imgButton, img: styles.img },
            'https://www.development-innovations.org/',
            require('../../assets/images/about/di.png'))
          }
        </View>

        <View style={styles.imgWrapper}>
          { this._renderImageButton(
            { btn: styles.imgButton, img: styles.img },
            'https://spidercenter.org/',
            require('../../assets/images/about/spider.png'))
          }
        </View>
      </>
    )
  }

  _renderStakeholderV2() {
    return (
      <>
        <Text style={styles.stakeholderTitle}>កំណែទី២ (ឆ្នាំ២០២៣) កែលម្អមាតិកានិងផលិតដោយ / Version 2 (2023) Content Improvement and Produced by</Text>

        <View style={styles.imgWrapper}>
          { this._renderImageButton(
            {btn: [styles.imgButton, {width: 70}], img: [styles.img, {maxHeight: 70}]},
            'http://www.moeys.gov.kh',
            require('../../assets/images/about/moeys.png'))
          }
        </View>

        <Text style={styles.paragraph}>អភិវឌ្ឍន៍ដោយ / Developed by</Text>

        <View style={styles.imgWrapper}>
          { this._renderImageButton(
            {btn: styles.imgButton, img: styles.img},
            'https://www.kawsang.com/',
            require('../../assets/images/about/kawsang_logo.png'))
          }
        </View>

        <Text style={styles.paragraph}>គាំទ្រថវិកាពី / Funding from</Text>

        <View style={styles.imgWrapper}>
          { this._renderImageButton(
            { btn: [styles.imgButton, {width: 120}], img: [styles.img, {maxHeight: 70}] },
            '',
            require('../../assets/images/about/adb_project.jpg'))
          }

          { this._renderImageButton(
            { btn: [styles.imgButton, {width: 120}], img: [styles.img, {maxHeight: 50}] },
            'https://www.adb.org/',
            require('../../assets/images/about/adb.jpg'))
          }
        </View>
      </>
    )
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

  _renderCareerPath() {
    contents = [
      {
        title: '«ត្រីវិស័យ» ផ្ដល់ជូននូវម៌ាគាឆ្ពោះទៅការជ្រើសរើសអាជីពស័ក្ដិសមនឹងអ្នកតាមរយៈកញ្ចប់ព័ត៌មានក្នុងមុខងារសំខាន់ៗ៖',
        list: ['វាយតម្លៃមុខរបរនិងអាជីព', 'តេស្ដភាពឆ្លាតវៃ', 'ព័ត៌មានអំពីគ្រឹះស្ថានសិក្សា', 'ព័ត៌មានអំពីប្រភេទការងារ', 'វីដេអូមុខរបរ', 'មជ្ឈមណ្ឌលការងារ']
      },
      {
        title: '«Trey Visay» provides the path to choosing the right career for you through a package of key functions:',
        list: ['Career assessment/Holland Test', 'Multiple Intelligence test', 'Institution Information', 'Career Information', 'Video of careers', 'Career center']
      }
    ]

    return (
      <>
        { contents.map((content, index) =>
          <View key={index}>
            <Text style={styles.paragraph}>
             { content.title }
            </Text>

            <View style={{alignSelf: 'flex-start', paddingHorizontal: 20}}>
              { content.list.map((item, index) => <Text key={index}>- {item}</Text>) }
            </View>
          </View>
        )}
      </>
    )
  }

  _renderAppVersion() {
    return (
      <View style={styles.footer}>
        <Text style={{textAlign: 'right'}}>
          ជំនាន់ / Version: { DeviceInfo.getVersion() }
        </Text>
      </View>
    )
  }

  _renderContent = () => {
    return (
      <View style={styles.container}>
        <Text style={[styles.paragraph, {marginTop: 0}]}>
          «ត្រីវិស័យ» ជាកម្មវិធីទូរសព្ទដៃឆ្លាតវៃថ្មីមួយ (Offline App) ត្រូវបានបង្កើតឡើងក្នុងគោលបំណងគាំទ្រដល់សិស្សានុសិស្សកម្រិតថ្នាក់ទី៩ ដល់ទី ១២ ក្នុងការតម្រង់ទិសវិជ្ជាជីវៈតាមរយៈការធ្វើស្វ័យវាយតម្លៃអំពីជម្រើសមុខរបរ អាជីពនិងការសិក្សា ដែលជាទុនបម្រុងមួយជួយពួកគេឱ្យមានមូលដ្ឋានក្នុងការរៀបចំផែនការសិក្សានិងអាជីពនាពេលអនាគតបានសមរម្យ។
        </Text>

        <Text style={styles.paragraph}>
          «Trey Visay» is a new smart phone app (Offline App) designed to support students in grades 9 to 12 in a vocational orientation through self-assessment of career and major study choice. As a reserve, help them to have a proper foundation for future study and career planning.
        </Text>

        { this._renderCareerPath() }
        { this._renderStakeholderV1() }
        { this._renderStakeholderV2() }
        { this._renderAppVersion() }
      </View>
    )
  }

  render() {
    let title = 'អំពីកម្មវិធី';
    return (
      <ScrollableHeader
        style={{backgroundColor: '#fff'}}
        renderContent={ this._renderContent }
        title={title}
        largeTitle={title}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16
  },
  paragraph: {
    marginTop: 10,
    fontSize: FontSetting.text
  },
  stakeholderTitle: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: FontSetting.text
  },
  footer: {
    marginTop: 20,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end'
  },
  imgWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
  },
  img: {
    flex: 1,
    maxHeight: 40,
  },
  imgButton: {
    flexDirection: 'row',
    width: 150
  }
});
