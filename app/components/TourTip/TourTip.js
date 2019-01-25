import React , { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native';

class TourTip extends Component {
  render(){
    return (
      <View style={styles.overlay}>
        <ScrollView style={{flex: 1}}>
          <View style={{margin: 16}}>
            <Text style={[styles.paragraph, {fontSize: 24, textAlign: 'center'}]}>ស្វាគមន៍មកកាន់ “ត្រីវិស័យ”</Text>

            <Text style={styles.paragraph}>
              ត្រីវិស័យ គឺជាកម្មវិធីប្រឹក្សាតាមប្រព័ន្ធអេឡិចត្រូនិចដែលតម្រង់ទិសសិស្សានុសិស្ស
              ជ្រើសរើសជំនាញដោយផ្អែកលើ មុខវិជ្ជាដែលខ្លួនពូកែ និងបុគ្គលិកលក្ខណៈរបស់ខ្លួន។
              សិស្សានុសិស្សអាចមើលពត៌មានអំពីសាលា និងលេខទំនាក់ទំនងរបស់សាលា
              នីមួយៗបានយ៉ាងងាយស្រួល។
            </Text>

            <Text style={[styles.paragraph, {fontSize: 20, textAlign: 'center'}]}>
              ហេតុអ្វីបានជាយើងត្រូវការប្រឹក្សាយោបល់តាមប្រព័ន្ធអេឡិចត្រូនិច?
            </Text>

            <Text style={styles.paragraph}>
              ការគិតពីអាជីពនៅវ័យក្មេង ជួយសិស្សានុសិស្សទទួលបានជំនាញ និងបទពិសោធន៍ចាំបាច់ ដើម្បីបំពេញតម្រូវការ និងមានអាជីពមួយដ៏ពេញចិត្ត ជាជាងគ្រាន់តែស្វែងរកមុខរបរមួយ ដោយមានការ លើកទឹកចិត្តតិចតួច និងឱកាសឡើងតំណែងតិចតួច។
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
                <Text style={{color: '#fff', fontWeight: 'bold'}}>យល់ព្រម</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 8
  },
  btnBox: {
    flex: 1,
    minHeight: 315,
    alignItems: 'center',
    margin: 8,
    backgroundColor: '#fff',
    paddingRight: 16,
  },
  btnLabel: {
    fontSize: 24,
    color: '#1976d2',
    textAlign: 'center',
  },
  btnDescription: {
    padding: 8,
    textAlign: 'center',
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
  }
});

export default TourTip;
