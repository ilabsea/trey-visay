import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
// import firebase from 'react-native-firebase';

import realm from '../../db/schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';

import Button from '../../components/shared/button';
import mainStyles from '../../assets/style_sheets/main/main';
import { Colors } from '../../assets/style_sheets/main/colors';
import { FontSetting } from '../../assets/style_sheets/font_setting';

import ScrollableHeader from '../../components/scrollable_header';
import BackButton from '../../components/shared/back_button';
import scrollHeaderStyles from '../../assets/style_sheets/scroll_header';
import { Content, Body, Right, Icon, CardItem } from 'native-base';
import ButtonList from '../../components/list/button_list';
import TestListItem from '../../components/GameHistory/TestListItem';
import keyword from '../../data/analytics/keyword';
import Text from '../../components/Text';

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
          title='អំពីការធ្វើតេសវាយតម្លៃមុខរបរ និងអាជីព' />
      </View>
    )
  }

  _renderInstruction() {
    return (
      <Content>
        { this._renderAboutCareerCounsellor() }

        <CardItem>
          <Body>
            <Text>សួស្តីសាជាថ្មី</Text>
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
      <View padder style={{marginHorizontal: 16}}>
        { !!this.state.completedGames.length &&
          <Text style={[mainStyles.sectionText, {marginLeft: 0}]}>លទ្ធផលធ្វើតេស្ត</Text>
        }

        { this.state.completedGames.map((game, i) => {
          return (
            <TestListItem
              key={i}
              number={count - i}
              createdAt={game.createdAt}
              onPress={() => this.props.navigation.navigate('GameHistoryScreen', {num: (count - i), gameUuid: game.uuid})}
            />
          )
        })}
      </View>
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
    // firebase.analytics().logEvent(keyword.CAREER_ASSESSMENT_BEGAN);

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

  render() {
    let title = 'វាយតម្លៃមុខរបរនិងអាជីព';

    return(
      <ScrollableHeader
        renderContent={ this._renderContent }
        renderNavigation={ () => <BackButton navigation={this.props.navigation}/> }
        title={title}
        largeTitle={title}
      />
    )
  }
}

const styles = StyleSheet.create({
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
    fontWeight: 'bold'
  }
});
