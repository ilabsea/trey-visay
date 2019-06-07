import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import realm from '../../db/schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';

import Button from '../../components/shared/button';
import mainStyles from '../../assets/style_sheets/main/main';
import { Colors } from '../../assets/style_sheets/main/colors';
import { FontSetting } from '../../assets/style_sheets/font_setting';
import { longDateFormat as dateFomart } from '../../utils/date';

import ScrollableHeader from '../../components/scrollable_header';
import BackButton from '../../components/shared/back_button';
import scrollHeaderStyles from '../../assets/style_sheets/scroll_header';
import { Content, Body, Right, Icon, CardItem } from 'native-base';
import ButtonList from '../../components/list/button_list';

export default class CareerCounsellor extends Component {
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

  _renderAboutCareerCounsellor() {
    return (
      <View style={{marginVertical: 12, backgroundColor: 'white'}}>
        <ButtonList
          hasLine={true}
          icon={{color: Colors.blue, src: require('../../assets/icons/others/info.png')}}
          onPress={() => { this.props.navigation.navigate('AboutCareerCounsellorScreen') }}
          title='អំពីការធ្វើតេសវាយតម្លៃមុខរបរ​ និងអាជីព' />
      </View>
    )
  }

  _renderInstruction() {
    return (
      <Content>
        { this._renderAboutCareerCounsellor() }

        <CardItem>
          <Body>
            <Text>សួស្តីសាជាថ្មី </Text>
            <Text>ការធ្វើតេស្តវាយតម្លៃមុខរបរ និងអាជីព </Text>
          </Body>
        </CardItem>

        <CardItem>
          <Body>
            <Button
              style={styles.button}
              onPress={this._goToPersonalUnderstandingForm.bind(this)}>

              <Text style={styles.btnText}>ចាប់ផ្តើមថ្មី</Text>
            </Button>

            { this.state.game && !this.state.game.isDone && !!this.state.game.personalUnderstandings.length &&
              <Button
                style={[styles.button, { backgroundColor: Colors.blue, marginTop: 18}]}
                onPress={this._handleGoingNextStep.bind(this)}>

                <Text style={styles.btnText}>បន្តទៅវគ្គមុន</Text>
              </Button>
            }
          </Body>
        </CardItem>
      </Content >
    )
  }

  _renderGameHistory() {
    let count = this.state.completedGames.length;

    return (
      <Content padder style={{marginHorizontal: 8}}>
        { !!this.state.completedGames.length &&
          <Text style={[mainStyles.sectionText, {marginLeft: 0}]}>លទ្ធផលធ្វើតេស្ត</Text>
        }

        { this.state.completedGames.map((game, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={{flexDirection: 'row', borderRadius: 10, overflow: 'hidden', backgroundColor: '#fff', marginBottom: 10}}
              onPress={() => this.props.navigation.navigate('GameHistoryScreen', {num: (count - i), gameUuid: game.uuid})}>

                <View style={styles.logo}>
                  <Text style={{color: '#fff', fontSize: 24}}>{count - i}</Text>
                </View>

                <View style={{flex: 1, paddingHorizontal: 16, paddingVertical: 10}}>
                  <Text style={mainStyles.title}>តេស្តលើកទី {count - i}</Text>
                  <Text style={mainStyles.subTitle}>ធ្វើនៅ: {dateFomart(game.createdAt)}</Text>
                </View>
            </TouchableOpacity>
          )
        })}
      </Content>
    )
  }

  _handleGoingNextStep() {
    if (!this.state.canContinueToTest2) {
      this.props.navigation.navigate('PersonalUnderstandingFormScreen', { refresh: this.refreshState.bind(this) });
      return
    }

    if (!this.state.game.step) {
      this.props.navigation.navigate('CareerCategoriesScreen');
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

  _renderContent = () => {
    return (
      <View>
        { this._renderInstruction() }
        { this._renderGameHistory() }
      </View>
    )
  }

  _renderForeground = () => {
    return (
      <View style={{marginBottom: -4}}>
        <Text style={scrollHeaderStyles.largeTitle}>វាយតម្លៃមុខរបរនិងអាជីព</Text>
        <Text style={scrollHeaderStyles.subTitle}>ការធ្វើតេស្តវាយតម្លៃមុខរបរ និងអាជីព</Text>
      </View>
    )
  }

  render() {
    return(
      <ScrollableHeader
        renderContent={ this._renderContent }
        renderNavigation={ () => <BackButton navigation={this.props.navigation}/> }
        title={'វាយតម្លៃមុខរបរនិងអាជីព'}
        renderForeground={this._renderForeground}
        headerMaxHeight={150}
      />
    )
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 99,
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '100%'
  },
  btnText: {
    fontSize: FontSetting.button_text,
    color: '#fff',
  }
});
