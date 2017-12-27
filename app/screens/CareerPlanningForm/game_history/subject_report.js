import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
  Icon,
} from 'react-native-material-ui';

import headerStyles from '../../../assets/style_sheets/header';
import shareStyles from '../../../assets/style_sheets/profile_form';
import StatusBar from '../../../components/status_bar';

export default class SubjectReport extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'បំពេញមុខវិជ្ជា',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>បំពេញមុខវិជ្ជា</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => goBack()} style={{marginHorizontal: 16}}>
                      <Icon name='close' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>,
    }
  };

  render() {
    return (
      null
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
