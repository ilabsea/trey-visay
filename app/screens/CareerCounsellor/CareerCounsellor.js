import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
} from 'react-native-material-ui';

import realm from '../../schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';

import Button from '../../components/button';
import myStyles from '../../assets/style_sheets/login_form';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import headerStyles from '../../assets/style_sheets/header';

const uiTheme = {
  palette: {
    primaryColor: '#1976d2',
  }
};

export default class CareerCounsellor extends Component {
  static navigationOptions = {
    drawerLabel: 'វាយតម្លៃមុខរបរនិងអាជីព',
    header: null,
    drawerIcon: ({ tintColor }) => (
      <AwesomeIcon name="briefcase" size={16} color={tintColor} />
    ),
  };

  componentWillMount() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    let game = user.games[user.games.length - 1];
    let canContinueToTest2 = !!game && !game.isDone &&
                                    (!!game.personalUnderstandings.length &&
                                    game.personalUnderstandings[0].score > 11
                                    || game.personalUnderstandings.length > 1);

    this.state = {
      user: user,
      game: game,
      canContinueToTest2: canContinueToTest2
    }
    // alert(canContinueToTest2);
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.wrapper}>
          <Toolbar
            leftElement="menu"
            centerElement={<Text style={[headerStyles.headerTitleStyle, {marginLeft: 0}]}>វាយតម្លៃមុខរបរ និង អាជីព</Text>}
            onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
          />

          <View style={[styles.box, {flexDirection: 'row'}]}>
            <View style={styles.logoWrapper}>
              <Image source={require('../../assets/images/list.png')} style={styles.logo} />
            </View>

            <View style={{flex: 1}}>

              <Text style={styles.title}>ការធ្វើតេស្តវាយតម្លៃមុខរបរនិងអាជីព</Text>

              <Text style={[styles.text, {marginTop: 20, marginBottom: 24}]}>
                ធ្វើតេស្តវាយតម្លៃមុខរបរ និងអាជីព ដើម្បីដឹងពីចំណង់ចូលចិត្ត ទេពកោសល្យ និង អាជីពដែលសាកសមសំរាប់អ្នកនៅពេលអនាគត
              </Text>

              <View style={{marginBottom: 30}}>
                <Text style={styles.text}>មាន២ជំហានៈ</Text>
                <Text style={styles.text}>1) ស្វែងយល់អំពីខ្លួនឯង</Text>
                <Text style={styles.text}>2) វាយតម្លៃផែនការមុខរបរ</Text>
              </View>

              <View style={{height: 50, flexDirection: 'row'}}>
                <Button
                  style={[myStyles.btnSubmit, {paddingHorizontal: 20, marginRight: 20}]}
                  onPress={this._goToPersonalUnderstandingForm.bind(this)}
                  >
                  <Text style={[myStyles.submitText, {color: '#fff', fontSize: 20}]}>
                    ចាប់ផ្តើមថ្មី
                  </Text>
                </Button>

                { this.state.game && !this.state.game.isDone && !!this.state.game.personalUnderstandings.length &&
                  <Button
                    style={[myStyles.btnSubmit, {paddingHorizontal: 20}]}
                    onPress={this._handleGoingNextStep.bind(this)}
                    >
                    <Text style={[myStyles.submitText, {color: '#fff', fontSize: 20}]}>បន្តទៅវគ្គមុន</Text>
                  </Button>
                }

              </View>

            </View>

          </View>

        </View>
      </ThemeProvider>
    );
  }

  _handleGoingNextStep() {
    if (!this.state.canContinueToTest2) {
      this.props.navigation.navigate('PersonalUnderstandingFormScreen');
      return
    }

    if (!this.state.game.step) {
      this.props.navigation.navigate('CareersScreen');
    } else {
      this.props.navigation.navigate(this.state.game.step);
    }
  }

  _buildData() {
    let obj = {
      // uuid: uuidv4()
      uuid: '123',
      user: this.state.user
    };

    return obj;
  }

  _goToPersonalUnderstandingForm() {
    // if (!!this.state.game && !this.state.game.isDone) {
    //   this.props.navigation.navigate('PersonalUnderstandingFormScreen');
    //   return;
    // }

    realm.write(() => {
      // Todo: handle it again
      let allGame = realm.objects('Game');
      realm.delete(allGame);

      this.state.user.games.push(this._buildData());
      // realm.create('Game', this._buildData(), true);
      // alert(JSON.stringify(realm.objects('Game')[realm.objects('Game').length -1]));
      this.props.navigation.navigate('PersonalUnderstandingFormScreen');
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1
  },
  icon: {
    width: 24,
    height: 24,
  },
  box: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 24
  },
  title: {
    fontFamily: 'KhmerOureang',
    fontSize: 24,
    color: '#1976d2',
  },
  logoWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 20,
  },
  logo: {
    width: 60,
    height: 60
  },
  text: {
    fontFamily: 'KantumruyBold',
    fontSize: 14
  }
});
