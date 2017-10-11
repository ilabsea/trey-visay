import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet
} from 'react-native';

import {
  ThemeProvider,
  Divider,
} from 'react-native-material-ui';

class Motivation extends Component {
  render() {
    return (
      <ThemeProvider uiTheme={{}}>
        <ScrollView style={styles.container}>
          <View>
            <Text style={styles.title}>
              សេចក្តីណែនាំ៖
            </Text>
          </View>

          <View style={styles.paragraph}>
            <Text>
              ការជ្រើសរើសជំនាញនិង អាជីពមួយនាពេលអនាគត គឺមានសារៈសំខាន់ណាស់សម្រាប់បុគ្គល
              ម្នាក់ៗ ដើម្បីទទួលបានចំណេះដឹង និងវិជ្ជាជីវៈគ្រប់គ្រាន់ និងឈានទៅប្រកួតប្រជែងទីផ្សារការងារនាពេលបច្ចុប្បន្ន។​
              ដូច្នេះការកំណត់ផែនការអាជីព និងការសម្រេចចិត្តជ្រើសរើសយក​ជំនាញ
              ជាកត្តាជំរុញឆ្ពោះទៅរកជំនាញជាក់លាក់ដែលអាចធ្វើឲ្យមនុស្សមានជំនឿជាក់លើខ្លួនឯង
              និងក្លាហានក្នុងស្វែងរកមុខរបរ ដើម្បីកសាងអនាគតរបស់ខ្លួន។
            </Text>
          </View>

          <View style={styles.paragraph}>
            <Text>
              យើងសង្ឈឹមថា ប្អូនៗបំពេញកម្រងសំណួរនេះឡើងវិញដោយពិចារណាយ៉ាងល្អិតល្អន់
              និងអាចកំណត់ជ្រើសរើសមុខរបរមួយដែលខ្លួនពេញចិត្ត។​
              ក្នុងនាមយើងជាយុវជនម្នាក់ត្រូវមានភាពក្លាហានក្នុងការបង្កើតក្ដីសុបិន្តឲ្យបានធំទូលាយនិងវែងឆ្ងាយ ប្រសើរជាងបុគ្គលដែលរស់នៅដែលគ្មានគោលដៅច្បាស់លាស់។​(សូមសែ្វងយល់សុភាសិតអប់រំខាងក្រោម៖)
            </Text>
          </View>

          <View style={styles.paragraph}>
            <Text>
              ១ មនុស្សម្នាក់ៗមិនអាចជ្រើសរើស កំណើតក្នុងគ្រួសារអ្នកមានឬអ្នកក្របានទេ
              ប៉ុន្ដែបុគ្គលនោះអាចកំណត់ជីវភាពរស់នៅបានប្រសើរ តាមរយៈការមានអាជីពមួយដ៏ល្អ។
            </Text>
            <Text>
              ២ តាំងចិត្តឲ្យបានខ្ពស់ រស់នៅជាមួយក្ដីសង្ឈឹម ទើបជីវិតមានតម្លៃពិតៗ
            </Text>
          </View>
        </ScrollView>
      </ThemeProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 24
  },
  title: {
    fontSize: 20
  },
  paragraph: {
    flex: 1,
    marginVertical: 10
  }
});

export default Motivation;
