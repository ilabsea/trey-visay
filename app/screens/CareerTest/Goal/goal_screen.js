import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Platform,
  BackHandler,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import Toast, { DURATION } from 'react-native-easy-toast';
// import { NavigationActions } from 'react-navigation';
import { CommonActions } from '@react-navigation/native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import BackConfirmDialog from '../../../components/shared/back_confirm_dialog';
import FooterBar from '../../../components/footer/FooterBar';
import mainStyles from '../../../assets/style_sheets/main/main';
import { Colors } from '../../../assets/style_sheets/main/colors';

import realm from '../../../db/schema';
import User from '../../../utils/user';

import Audio from './audio';
import ScrollableHeader from '../../../components/scrollable_header';
import CloseButton from '../../../components/shared/close_button';
import { Container, Content } from 'native-base';
import { FontSetting } from '../../../assets/style_sheets/font_setting';

export default class GoalScreen extends Component {
  constructor(props) {
    super(props);

    this._initState();
    this._backHandler();
  }

  _initState() {
    let user = User.getCurrent();
    let game = user.games[user.games.length - 1];

    this.state = {
      user: user,
      game: game,
      reasonText: game.reason,
      voiceRecord: game.voiceRecord,
      visibleTourtip: true
    };

    this.props.navigation.setParams({
      _handleBack: this._handleBack.bind(this),
      goNext: this._goNext.bind(this)
    });
  }

  _handleBack() {
    this.setState({confirmDialogVisible: true});
  }

  _backHandler() {
    BackHandler.addEventListener('hardwareBackPress', this._onClickBackHandler);
  }

  _onClickBackHandler = () => {
    this.setState({confirmDialogVisible: true});

    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);
    return true
  }

  _onYes() {
    realm.write(() => {
      realm.create('Game', this._buildData('GoalScreen'), true);
      this._closeDialog();
    });
  }

  _closeDialog() {
    this.setState({confirmDialogVisible: false});
    this.props.navigation.reset([CommonActions.navigate({ routeName: 'CareerCounsellorScreen' })])
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.game);
      this._closeDialog();
    });
  }

  _goNext() {
    if (!this.state.reasonText && !this.state.voiceRecord) {
      return this.refs.toast.show('សូូមបំពេញគោលដៅរបស់អ្នកជាអក្សរ ឬក៏ថតជាសំលេង!', DURATION.SHORT);
    }

    this._handleSubmit();
  }

  _buildData(step) {
    let obj = {
      uuid: this.state.game.uuid,
      reason: this.state.reasonText,
      voiceRecord: this.state.voiceRecord,
      step: step || 'ContactScreen',
    };

    return obj;
  }

  _handleSubmit() {
    realm.write(() => {
      realm.create('Game', this._buildData(), true);
      this.props.navigation.navigate('ContactScreen');
    });
  }

  _renderTourtip() {
    return (
      <View style={mainStyles.overlay}>
        <StatusBar barStyle='light-content' backgroundColor={'rgba(25, 118, 210, 0.9)'}/>

        <ScrollView style={{flex: 1}}>
          <View style={{margin: 16}}>
            <Text style={{marginTop: 50, paddingTop: 4, fontSize: FontSetting.big_title, color: '#fff'}}>ការណែនាំ</Text>
            <Text style={{color: '#fff'}}>
              អ្នកអាចដាក់គោលដៅ និងមូលហេតុដោយការសរសេរ ឬក៏ថតជាសំលេង! បន្ទាប់ពីប្អូនជ្រើសរើសមុខរបរមួយរួចហើយ។ ចូរប្អូនរៀបរាប់បន្ថែមពីមូលហេតុដែលប្អូនបានជ្រើសរើសមុខរបរនោះ ដោយគិតអំពី៖ ចំនុចខ្លាំងដែលប្អូនបានជ្រើសរើសចេញពីបុគ្គលិកលក្ខណៈ ដើម្បីឆ្លុះបញ្ចាំងពីគោលបំណងមួយដែលមានន័យពេញលេញ។ វាកាន់តែប្រសើរ ប្រសិនបើប្អូនសរសេរពីសារៈប្រយោជន៍នៃគោលបំណងនោះ ដែលបង្ហាញពី ការជួយ ផ្តល់ឱ្យ ចែករំលែក ឬស្ម័គ្រចិត្ត ដែលបំរើឱ្យ ប្រយោជន៍រួម (សហគមន៍/សង្គម យុវជន កុមារ ឬគ្រួសារជាដើម) ជាជាងប្រយោជន៍បុគ្គល ។
            </Text>
          </View>
        </ScrollView>

        <View style={{flexDirection: 'row', justifyContent: 'center', padding: 20}}>
          <TouchableOpacity
            onPress={() => this.setState({visibleTourtip: false})}
            style={{borderRadius: 8, flex: 1, paddingHorizontal: 24, paddingVertical: 5, backgroundColor: 'rgb(255,255,255)'}}>
            <Text style={{textAlign: 'center', color: Colors.blue}}>ចាប់ផ្ដើមបំពេញ</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  _renderRecordSound() {
    // Todo:
    return (null)
    // return (
    //   <Audio
    //     callback={(path) => this.setState({voiceRecord: path})}
    //     audioPath={ this.state.voiceRecord }/>
    // )
  }

  _renderContent = () => {
    return(
      <Content style={{padding: 20, backgroundColor: '#fff'}}>
        <Text style={[mainStyles.text]}>
          អ្នកអាចដាក់គោលដៅ និងមូលហេតុដោយការសរសេរ
        </Text>

        <Text style={{textAlign: 'right', color: 'rgb(155, 155, 155)', fontSize: FontSetting.hint}}>
          { (!!this.state.reasonText && this.state.reasonText.length) || 0} / 150តួអក្សរ
        </Text>

        <TextInput
          style={[{textAlignVertical: 'top', height: 170, backgroundColor: 'rgb(239, 239, 239)', borderRadius: 8, padding: 16}]}
          onChangeText={(text) => this.setState({reasonText: text})}
          value={this.state.reasonText}
          placeholder='សរសេរចំលើយរបស់អ្នក'
          placeholderTextColor='rgb(155, 155, 155)'
          multiline={true}
          numberOfLines={7}
          maxLength={150}
        />

        { this._renderRecordSound() }
      </Content>
    )
  }

  render() {
    let title = 'ដាក់គោលដៅមួយ និងមូលហេតុ';
    let buttonColor = Platform.OS == 'ios' ? Colors.blue : '#000';

    return (
      <View style={{flex: 1}}>
        <ScrollableHeader
          style={{backgroundColor: '#fff'}}
          renderContent={ this._renderContent }
          renderNavigation={ () => <CloseButton buttonColor={buttonColor} navigation={this.props.navigation}/> }
          title={title}
          largeTitle={title}
        />

        { !this.state.visibleTourtip && <FooterBar icon='keyboard-arrow-right' text='បន្តទៀត' onPress={this._goNext.bind(this)} /> }
        { this.state.visibleTourtip && this._renderTourtip() }

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
        <Toast ref='toast' positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
      </View>
    )
  };
}
