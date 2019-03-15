import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';

import Button from '../../components/button';
import StatusBar from '../../components/status_bar';
import formStyles from '../../assets/style_sheets/login_form';
import styles from '../../assets/style_sheets/assessment';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class Assessment extends Component {
  _renderInstruction() {
    return (
      <View style={[styles.box]}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.logoWrapper}>
            <Image source={require('../../assets/images/list.png')} style={styles.logo} />
          </View>

          <Text style={styles.title}>ការធ្វើតេស្តស្វែងយល់អំពី បុគ្គលិកលក្ខណៈ</Text>
        </View>

        <View style={{flex: 1}}>
          <Text>តាមការសិក្សាស្រាវជ្រាវរបស់អ្នកឯកទេសខាងចិត្តសាស្ត្របង្ហាញថា បុគ្គលិកលក្ខណៈរបស់មនុស្ស ត្រូវបានចែកចេញជា ៦ ប្រភេទ៖</Text>

          <View style={{paddingLeft: 20}}>
            <Text>1. ប្រាកដនិយម (Realistic)</Text>
            <Text>2. ពូកែអង្កេត (Investigative)</Text>
            <Text>3. សិល្បៈនិយម (Artistic)</Text>
            <Text>4. សង្គម (Social)</Text>
            <Text>5. ត្រិះរិះពិចារណា (Enterprising)</Text>
            <Text>6. សណ្ដាប់ធ្នាប់ (Conventional)</Text>
          </View>

          <Text>ចង់ដឹងថា អ្នកមានបុគ្គលិកលក្ខណៈបែបណានោះ សូមចាប់ផ្ដើមធ្វើតេស្ដខាងក្រោមនេះ!</Text>
          <View>
            <Button
              style={[formStyles.btnSubmit, { paddingHorizontal: 20, marginRight: 20, marginBottom: 10 }]}
              onPress={()=> this.props.navigation.navigate('RealisticScreen')}
              >
              <Text style={[formStyles.submitText, { color: '#fff', fontSize: 20 }]}>
                ចាប់ផ្ដើមធ្វើតេស្ត
              </Text>
            </Button>

          </View>
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
