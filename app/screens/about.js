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
