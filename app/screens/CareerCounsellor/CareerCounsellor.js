import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Platform
} from 'react-native';
import { Divider } from 'react-native-elements';

import realm from '../../schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';

import Button from '../../components/button';
import StatusBar from '../../components/status_bar';
import myStyles from '../../assets/style_sheets/login_form';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from '../../assets/style_sheets/profile_form';
import {mainStyles} from '../../assets/style_sheets/main/main';
import { FontSetting } from '../../assets/style_sheets/font_setting';

export default class CareerCounsellor extends Component {
  static navigationOptions = {
    drawerLabel: 'វាយតម្លៃមុខរបរនិងអាជីព',
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
      <View style={styles.box}>
        <View style={{flex:1, flexDirection: 'row'}}>
          <View style={styles.logoWrapper}>
            <Image source={require('../../assets/images/list.png')} style={styles.logo} />
          </View>

          <View style={{flex: 1}}>
            <Text style={styles.title}>ការធ្វើតេស្តវាយតម្លៃមុខរបរនិងអាជីព</Text>
          </View>
        </View>

        <View style={{flex: 1, flexDirection: 'column'}}>
          <Text style={[styles.text, {marginTop: 20, marginBottom: 24}]}>
            ធ្វើតេស្តវាយតម្លៃមុខរបរ និងអាជីព ដើម្បីដឹងពីចំណង់ចូលចិត្ត ទេពកោសល្យ និង អាជីពដែលសាកសមសំរាប់អ្នកនៅពេលអនាគត
          </Text>

          <View style={{marginBottom: 30}}>
            <Text style={styles.text}>មាន២ជំហានៈ</Text>
            <Text style={styles.text}>1) ស្វែងយល់អំពីខ្លួនឯង</Text>
            <Text style={styles.text}>2) វាយតម្លៃផែនការមុខរបរ</Text>
          </View>

          <View style={styles.inlineBlock}>
            <Button
              style={styles.button}
              onPress={this._goToPersonalUnderstandingForm.bind(this)}>
              <Text style={styles.btnText}>
                ចាប់ផ្តើមថ្មី
              </Text>
            </Button>

            { this.state.game && !this.state.game.isDone && !!this.state.game.personalUnderstandings.length &&
              <Button
                style={styles.button}
                onPress={this._handleGoingNextStep.bind(this)}
                >
                <Text style={styles.btnText}>បន្តទៅវគ្គមុន</Text>
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
          <Text style={mainStyles.sectionText}>លទ្ធផលធ្វើតេស្ត</Text>
        }

        { this.state.completedGames.map((game, i) => {
          return (
            <View style={{backgroundColor: 'white'}}>
              <TouchableOpacity
                key={i}
                style={mainStyles.btnList}
                onPress={() => this.props.navigation.navigate('GameHistoryScreen', {num: (count - i), gameUuid: game.uuid})}
                >

                <View>
                  <Image source={require('../../assets/images/checklist.png')} style={styles.logo} />
                </View>

                <View style={{flex: 1, marginLeft: 16, marginRight: 16}}>
                  <Text style={mainStyles.title}>
                    តេស្តលើកទី {count - i}
                  </Text>

                  <Text style={mainStyles.subTitle}>
                    ធ្វើនៅ: {this._getFullDate(game.createdAt)}
                  </Text>
                </View>

                <View style={{justifyContent: 'center'}}>
                  <AwesomeIcon name='angle-right' size={24} color='#bbb' />
                </View>
              </TouchableOpacity>
              <Divider style={{maginLeft: 16}} />
            </View>
          )
        })}

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
            { this._renderGameHistory() }
          </View>
        </ScrollView>
      </View>
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
  container: {
    ...Platform.select({
      android: {
        margin: 16
      }
    })
  },
  box: {
    backgroundColor: '#fff',
    padding: 24,
  },
  title: {
    fontSize: FontSetting.big_title,
    color: '#1976d2',
    ...Platform.select({
      android: {
        lineHeight: 48
      }
    })
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
    fontWeight: 'bold'
  },
  inlineBlock: {
    flex: 1,
    margin: 24,
    marginRight: 0,
    marginLeft: 10,
    justifyContent: 'center',
    flexDirection:'row',
    alignItems: 'center',
  },
  button: {
    borderRadius: 3,
    height: 48,
    width: '50%',
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: FontSetting.button_text,
    color: '#fff',
  }
});
