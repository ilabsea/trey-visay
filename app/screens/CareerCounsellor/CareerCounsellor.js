import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

import {
  Toolbar,
  ThemeContext,
  getTheme
} from 'react-native-material-ui';

import realm from '../../schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';

import Button from '../../components/button';
import StatusBar from '../../components/status_bar';
import myStyles from '../../assets/style_sheets/login_form';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from '../../assets/style_sheets/profile_form';

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
    this.refreshState();
  }

  refreshState() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    let game = user.games[user.games.length - 1];
    let canContinueToTest2 = !!game && !game.isDone &&
                                    (!!game.personalUnderstandings.length &&
                                    game.personalUnderstandings[0].score > 11
                                    || game.personalUnderstandings.length > 1);

    this.setState({
      user: user,
      game: game,
      completedGames: user.games.filtered('isDone = true').sorted('createdAt', true),
      canContinueToTest2: canContinueToTest2
    });
  }

  _renderInstruction() {
    return (
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

          <View style={shareStyles.inlineBlock}>
            <Button
              style={[myStyles.btnSubmit, {paddingHorizontal: 20, marginRight: 20, marginBottom: 10}]}
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
    )
  }

  _getFullDate(createdAt) {
    let days = ['អាទិត្យ', 'ច័ន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'];
    let months = ['មករា', 'កុម្ភៈ', 'មិនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្តដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];
    let time = new Date(createdAt);
    return "ថ្ងៃ" + days[time.getDay()] + ' ទី' + time.getDate() + ' ខែ' + months[time.getMonth()] + ' ឆ្នាំ' + time.getFullYear();
  }

  _renderGameHistory() {
    let count = this.state.completedGames.length;

    return (
      <View >
        { !!this.state.completedGames.length &&
          <Text style={{fontFamily: 'Kantumruy', fontWeight: 'bold', marginTop: 20, marginBottom: 16, marginHorizontal: 16}}>លទ្ធផលធ្វើតេស្ត</Text>
        }

        { this.state.completedGames.map((game, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={[styles.box, {marginTop: 0, marginBottom: 8, flexDirection: 'row', alignItems: 'center'}]}
              onPress={() => this.props.navigation.navigate('GameHistoryScreen', {num: (count - i), gameUuid: game.uuid})}
              >
              <View style={{flexDirection: 'row', flex: 1}}>
                <Image source={require('../../assets/images/checklist.png')} style={{width: 60, height: 60, marginRight: 16}} />
                <View style={{flex: 1}}>
                  <Text style={shareStyles.subTitle}>តេស្តលើកទី {count - i}</Text>
                  <Text style={styles.text}>ធ្វើនៅ: {this._getFullDate(game.createdAt)}</Text>
                </View>
              </View>

              <AwesomeIcon name='angle-right' size={24}/>

            </TouchableOpacity>
          )
        })}

      </View>
    )
  }

  render() {
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <View style={{flex: 1}}>
          <StatusBar />
          <Toolbar
            leftElement="menu"
            centerElement={<Text style={[headerStyles.headerTitleStyle, {marginLeft: 0}]}>វាយតម្លៃមុខរបរ និង អាជីព</Text>}
            onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
          />

          <ScrollView style={{flex: 1}}>
            <View style={{margin: 16}}>
              { this._renderInstruction() }
              { this._renderGameHistory() }
            </View>
          </ScrollView>
        </View>
      </ThemeContext.Provider>
    );
  }

  _handleGoingNextStep() {
    if (!this.state.canContinueToTest2) {
      this.props.navigation.navigate('PersonalUnderstandingFormScreen', { refresh: this.refreshState.bind(this) });
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
      uuid: uuidv4(),
      user: this.state.user,
      createdAt: new Date()
    };

    return obj;
  }

  _goToPersonalUnderstandingForm() {
    let uncompletedGames = this.state.user.games.filtered('isDone = false');

    realm.write(() => {
      realm.delete(uncompletedGames);

      this.state.user.games.push(this._buildData());
      this.setState({game: this.state.user.games[this.state.user.games.length-1]});
      this.props.navigation.navigate('PersonalUnderstandingFormScreen', { refresh: this.refreshState.bind(this) });
    });
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    padding: 24
  },
  title: {
    // fontFamily: 'KhmerOureang',
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
    fontFamily: 'Kantumruy',
    fontWeight: 'bold',
    fontSize: 14
  }
});
