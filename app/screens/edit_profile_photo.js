import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  ThemeProvider,
  Icon,
  Avatar,
} from 'react-native-material-ui';

// Utils
import realm from '../schema';
import User from '../utils/user';
import styles from '../assets/style_sheets/profile_form';

export default class EditProfilePhoto extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack } = navigation;

    return {
      title: 'កែសម្រួល',
      headerStyle: { backgroundColor: '#1976d2' },
      headerTitleStyle : {color: '#fff'},
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => goBack()} style={{marginLeft: 16}}>
                      <Icon name='close' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>,
      headerRight: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => navigation.state.params.handleSubmit()}>
                      <Icon name="done" color='#fff' size={24} />
                      <Text style={styles.saveText}>រក្សាទុក</Text>
                    </TouchableOpacity>
                   </ThemeProvider>,
    }
  };

  render() {
    return (
      <ThemeProvider uiTheme={{}}>
        <View style={{position: 'relative', flex: 1}}>
          <TouchableOpacity style={{position: 'relative', backgroundColor:'pink'}}>
            <Image
              source={require('../assets/images/header_bg.jpg')}
              style={{width: null, height: 300}}
            />

            <Avatar icon='camera-alt' size={54} style={{container: {opacity: 0.7, position: 'absolute', top: -60, right: 10, zIndex: 10}}} />

          </TouchableOpacity>

          <TouchableOpacity style={{position: 'absolute', top: 220, left: 24}}>
            <Image
              source={require('../assets/images/default_profile.png')}
              style={{borderRadius: 60, width: 120, height: 120 }}
            />
            <Avatar icon='camera-alt' size={54} style={{container: {opacity: 0.7, position: 'absolute', top: -87, right: 30, zIndex: 10}}} />
          </TouchableOpacity>
        </View>
      </ThemeProvider>
    )
  }
}
