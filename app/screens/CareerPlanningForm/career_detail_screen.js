import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  ThemeProvider,
  Icon,
} from 'react-native-material-ui';

import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';
import careers from '../../data/json/careers';

let job;
export default class CareerDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'ព័ត៌មានលម្អិតអំពីមុខរបរ',
      headerTitle: !!state.params && state.params.title,
      headerStyle: headerStyles.headerStyle,
      headerTitleStyle: headerStyles.headerTitleStyle,
      headerTintColor: '#fff',
    }
  };

  componentWillMount() {
    let id = this.props.navigation.state.params.careerId || '1';
    job = careers.find((obj) => obj.id == id);
  }

  render() {
    return(
      <ThemeProvider uiTheme={{}}>
        <ScrollView>
          <View style={{margin: 16}}>
            <View style={styles.box}>
              <Text style={styles.subTitle}>ព័ត៌មានលម្អិត</Text>

              <View>
                <Text>
                  {job.long_description}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </ThemeProvider>
    );
  };
}
